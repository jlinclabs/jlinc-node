'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.acceptBisa', function() {
  withDidServer();

  beforeEach(async function() {
    const {
      offeror,
      target,
      bisaOffering,
    } = await this.generateBisaOffering();
    Object.assign(this, {
      offeror,
      target,
      bisaOffering,
    });
  });

  context('when given invalid arguments', function(){
    it('should throw an error', function() {
      expect(() => {
        JLINC.acceptBisa({});
      }).to.throw('bisaOffering is reqiured');

      expect(() => {
        JLINC.acceptBisa({
          bisaOffering: {},
        });
      }).to.throw('dataCustodian is reqiured');

      expect(() => {
        JLINC.acceptBisa({
          bisaOffering: {},
          dataCustodian: {},
        });
      }).to.throw('dataCustodian.did is reqiured');
    });
  });

  context('when given valid arguments', function(){
    context('when the given dataCustodian is the target', function(){
      it('should sign the bisaOffering', function() {
        const {
          offeror,
          target,
          bisaOffering,
        } = this;

        const bisa = JLINC.acceptBisa({
          bisaOffering,
          dataCustodian: target,
        });

        expect(bisa).to.be.an('object');
        expect(bisa).to.be.serializable();
        expect(bisa).to.matchPattern({
          '@context': JLINC.contextUrl,
          acceptedBisaJwt: _.isJwtSignedWith(target.secret),
          bisaId: _.isString,
        });

        const acceptedBisa = JLINC.decodeAndVerifyJwt({
          jwt: bisa.acceptedBisaJwt,
          secret: target.secret,
        });
        expect(acceptedBisa).to.matchPattern({
          '@context': JLINC.contextUrl,
          offeredBisaJwt: _.isAJwtMatchingPattern({
            '@context': JLINC.contextUrl,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeror.did,
            offerorPublicKey: offeror.signingPublicKey,
            offerorSig: _.isString,
            createdAt: _.isRecentDatetimeInISOFormat,
            agreementJwt: _.isAJwtMatchingPattern({
              '@context': JLINC.contextUrl,
              jlincId: _.isString,
              agreementURI: JLINC.defaultAgreementURI,
              targetAcceptorDid: target.did,
            }),
          }),
          acceptorDid: target.did,
          acceptorPublicKey: target.signingPublicKey,
          acceptorSigType: JLINC.signatureType,
          acceptorSig: _.isString,
          createdAt: _.isRecentDatetimeInISOFormat,
        });
        expect(acceptedBisa.offeredBisaJwt).to.be.aJwtSignedWith(target.secret);
        expect(acceptedBisa.offeredBisaJwt).to.be.aJwtEncodingOf(bisaOffering.offeredBisa);

        expect(
          JLINC.verifySignature({
            itemSigned: acceptedBisa.offeredBisaJwt,
            signature: acceptedBisa.acceptorSig,
            publicKey: target.signingPublicKey,
            contextUrl: JLINC.contextUrl
          })
        ).to.be.true;
      });
    });
    context('when the given dataCustodian is NOT the target', function(){
      it('should throw an error', async function() {
        const { bisaOffering } = this;
        const badTarget = await JLINC.createDataCustodian();

        expect(() => {
          JLINC.acceptBisa({
            bisaOffering,
            dataCustodian: badTarget,
          });
        }).to.throw('bisaOffering.offeredBisa.agreement.targetAcceptorDid does not match given dataCustodian.did');
      });
    });
  });

});
