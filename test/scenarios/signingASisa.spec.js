'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('signing a SISA', function(){
  withDidServer();
  it('should work', async function() {
    /******************
     * On the B Server
     ******************/
    const dataCustodian = await JLINC.createDataCustodian();
    expect(dataCustodian).to.matchPattern({
      did: _.isJlincDid,
      signingPublicKey: _.isSigningPublicKey,
      signingPrivateKey: _.isSigningPrivateKey,
      encryptingPublicKey: _.isEncryptingPublicKey,
      encryptingPrivateKey: _.isEncryptingPrivateKey,
      registrationSecret: _.isString,
      secret: _.isString,
    });

    // Alice requests a SisaOffering
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
    expect(sisaOffering).to.matchPattern({
      '@context': JLINC.contextUrl,
      offeredSisa: {
        '@context': JLINC.contextUrl,
        agreementJwt: _.isJwt,
        dataCustodianSigType: JLINC.signatureType,
        dataCustodianDid: dataCustodian.did,
        dataCustodianPublicKey: dataCustodian.signingPublicKey,
        dataCustodianSig: _.isString,
        createdAt: _.isDateString,
      },
    });

    // simulate sending sisa offering across an HTTP request
    const copyOfSisaOffering = JSON.parse(JSON.stringify(sisaOffering));

    /******************
     * On the A Server
     ******************/

    // validate the sisa offering

    JLINC.validateSisaOffering({
      sisaOffering: copyOfSisaOffering,
    });

    await JLINC.verifySisaOfferingDataCustodianDid({
      sisaOffering: copyOfSisaOffering,
      dataCustodianDid: dataCustodian.did,
    });

    const rightsHolder = await JLINC.createRightsHolder();

    // accept the sisa with our new rights holder
    const sisa = JLINC.acceptSisa({
      sisaOffering: copyOfSisaOffering,
      rightsHolder,
    });
    expect(sisa).to.matchPattern({
      '@context': JLINC.contextUrl,
      sisaId: _.isString,
      acceptedSisaJwt: _.isJwt,
    });
    expect(sisa.acceptedSisaJwt)
      .to.be.aJwtSignedWith(rightsHolder.secret);

    const expandedSisa = JLINC.expandSisa({ sisa });
    expect(expandedSisa).to.matchPattern({
      '@context': JLINC.contextUrl,
      sisaId: _.isString,
      acceptedSisa: {
        '@context': JLINC.contextUrl,
        rightsHolderSigType: JLINC.signatureType,
        rightsHolderDid: rightsHolder.did,
        rightsHolderPublicKey: rightsHolder.signingPublicKey,
        rightsHolderSig: _.isString,
        createdAt: _.isRecentDatetimeInISOFormat,
        offeredSisa: {
          '@context': JLINC.contextUrl,
          dataCustodianSigType: JLINC.signatureType,
          dataCustodianDid: dataCustodian.did,
          dataCustodianPublicKey: dataCustodian.signingPublicKey,
          dataCustodianSig: _.isString,
          createdAt: _.isRecentDatetimeInISOFormat,
          agreement: {
            '@context': JLINC.contextUrl,
            jlincId: _.isString,
            agreementURI: JLINC.defaultAgreementURI,
          },
        },
      },
    });

    // simulate sending sisa across an HTTP request
    const copyOfSisa = JSON.parse(JSON.stringify(sisa));

    /******************
     * On the B Server
     ******************/

    JLINC.validateSisa({ sisa: copyOfSisa });
    JLINC.verifySisaWasOfferedByDataCustodian({
      sisa: copyOfSisa,
      dataCustodian,
    });
    await JLINC.verifySisaRightsHolderDid({
      sisa: copyOfSisa,
    });


    // …save SISA in the database

    /******************
     * On the A Server
     ******************/

    // …save SISA in the database
  });
});
