'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.createBisaOffering', function() {
  withDidServer();

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(() => {
        JLINC.createBisaOffering({
          agreementURI: null,
        });
      }).to.throw('agreementURI is required');

      expect(() => {
        JLINC.createBisaOffering({

        });
      }).to.throw('dataCustodian is required');

      expect(() => {
        JLINC.createBisaOffering({
          dataCustodian: {},
        });
      }).to.throw('targetAcceptorDid is required');

      expect(() => {
        JLINC.createBisaOffering({
          dataCustodian: {},
          targetAcceptorDid: 'xxx',
        });
      }).to.throw('targetAcceptorDid must be a DID');
    });
  });

  it('should create a valid bisa offering', async function() {
    const dataCustodianA = await JLINC.createDataCustodian();
    const dataCustodianB = await JLINC.createDataCustodian();
    const bisaOffering = JLINC.createBisaOffering({
      dataCustodian: dataCustodianA,
      targetAcceptorDid: dataCustodianB.did,
    });

    expect(bisaOffering).to.be.an('object');
    expect(bisaOffering).to.be.serializable();
    expect(bisaOffering).to.matchPattern({
      '@context': JLINC.contextUrl,
      id: _.isAJlincId,
      offeredBisa: {
        '@context': JLINC.contextUrl,
        agreementJwt: _.isJwtSignedWith(dataCustodianA.secret),
        offerorSigType: _.isString,
        offerorDid: dataCustodianA.did,
        offerorPublicKey: dataCustodianA.signingPublicKey,
        offerorSig: _.isString,
        createdAt: _.isRecentDatetimeInISOFormat,
      },
    });

    const agreement = JLINC.decodeAndVerifyJwt({
      jwt: bisaOffering.offeredBisa.agreementJwt,
      secret: dataCustodianA.secret,
    });

    expect(agreement).to.matchPattern({
      '@context': JLINC.contextUrl,
      jlincId: _.isAJlincId,
      agreementURI: JLINC.defaultAgreementURI,
      targetAcceptorDid: dataCustodianB.did,
    });

    expect(
      JLINC.verifySignature({
        itemSigned: bisaOffering.offeredBisa.agreementJwt,
        signature: bisaOffering.offeredBisa.offerorSig,
        publicKey: dataCustodianA.signingPublicKey,
        contextUrl: JLINC.contextUrl,
      })
    ).to.be.true;
  });
});
