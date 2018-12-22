'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.createSisaOffering', function() {
  withDidServer();

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(() => {
        JLINC.createSisaOffering({

        });
      }).to.throw('dataCustodian is required');
    });
  });

  it('should create a valid sisa offering', async function() {
    const dataCustodian = await JLINC.createDataCustodian();
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });

    expect(sisaOffering).to.be.an('object');
    expect(sisaOffering).to.be.serializable();
    expect(sisaOffering).to.matchPattern({
      '@context': JLINC.contextUrl,
      offeredSisa: {
        '@context': JLINC.contextUrl,
        agreementJwt: _.isJwtSignedWith(dataCustodian.secret),
        dataCustodianSigType: _.isString,
        dataCustodianDid: dataCustodian.did,
        dataCustodianPublicKey: dataCustodian.signingPublicKey,
        dataCustodianSig: _.isString,
        createdAt: _.isRecentDatetimeInISOFormat,
      },
    });

    const agreement = JLINC.decodeAndVerifyJwt({
      jwt: sisaOffering.offeredSisa.agreementJwt,
      secret: dataCustodian.secret,
    });

    expect(agreement).to.matchPattern({
      '@context': JLINC.contextUrl,
      jlincId: _.isNonce,
      agreementURI: JLINC.defaultAgreementURI,
    });

    expect(
      JLINC.verifySignature({
        itemSigned: sisaOffering.offeredSisa.agreementJwt,
        signature: sisaOffering.offeredSisa.dataCustodianSig,
        publicKey: dataCustodian.signingPublicKey,
        contextUrl: JLINC.contextUrl,
      })
    ).to.be.true;
  });
});
