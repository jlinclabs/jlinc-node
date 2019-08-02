'use strict';

const jsonwebtoken = require('jsonwebtoken');

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');
const withSinon = require('../helpers/withSinon');

describe('JLINC.expandBisa', function() {
  withDidServer();
  withSinon();

  context('when given no arguments', function() {
    it('should throw the error "bisa is required"', function() {
      expect(() => {
        JLINC.expandBisa({});
      }).to.throw('bisa is required');
    });
  });

  context('when given a valid bisa', function() {
    beforeEach(async function() {
      const {
        offeror, target, offeredBisa, agreement, bisa, acceptedBisa,
      } = await this.generateBisa();
      Object.assign(this, {
        offeror, target, offeredBisa, agreement, bisa, acceptedBisa,
      });
    });

    it('should expand the given bisa', function() {
      const {
        offeror, target, offeredBisa, agreement, bisa, acceptedBisa,
      } = this;
      expect( JLINC.expandBisa({ bisa }) ).to.deep.equal({
        '@context': bisa['@context'],
        bisaId: bisa.bisaId,
        acceptedBisa: {
          '@context': acceptedBisa['@context'],
          acceptorSigType: acceptedBisa.acceptorSigType,
          acceptorDid: target.did,
          acceptorPublicKey: target.signingPublicKey,
          acceptorSig: acceptedBisa.acceptorSig,
          createdAt: acceptedBisa.createdAt,
          offeredBisa: {
            '@context': offeredBisa['@context'],
            offerorSigType: offeredBisa.offerorSigType,
            offerorDid: offeror.did,
            offerorPublicKey: offeror.signingPublicKey,
            offerorSig: offeredBisa.offerorSig,
            createdAt: offeredBisa.createdAt,
            agreement: {
              '@context': agreement['@context'],
              jlincId: agreement.jlincId,
              agreementURI: agreement.agreementURI,
              targetAcceptorDid: target.did,
            }
          }
        }
      });
    });

    context('when the bisa.acceptedBisa fails to decode', function() {
      beforeEach(async function() {
        this.sinon.stub(JLINC, 'decodeJwt').callsFake(({ jwt }) => {
          if (jwt === this.bisa.acceptedBisaJwt) return null;
          return jsonwebtoken.decode(jwt);
        });
      });
      it('should throw an error', function() {
        const { bisa } = this;
        expect(() => {
          JLINC.expandBisa({ bisa });
        }).to.throw('failed to expand bisa: could not decode bisa.acceptedBisaJwt');
      });
    });

    context('when the bisa.acceptedBisa.offeredBisaJwt fails to decode', function() {
      beforeEach(async function() {
        this.sinon.stub(JLINC, 'decodeJwt').callsFake(({ jwt }) => {
          if (jwt === this.acceptedBisa.offeredBisaJwt) return null;
          return jsonwebtoken.decode(jwt);
        });
      });
      it('should throw an error', function() {
        const { bisa } = this;
        expect(() => {
          JLINC.expandBisa({ bisa });
        }).to.throw('failed to expand bisa: could not decode bisa.acceptedBisa.offeredBisaJwt');
      });
    });

    context('when the agreementJwt fails to decode', function() {
      beforeEach(async function() {
        this.sinon.stub(JLINC, 'decodeJwt').callsFake(({ jwt }) => {
          if (jwt === this.offeredBisa.agreementJwt) return null;
          return jsonwebtoken.decode(jwt);
        });
      });
      it('should throw an error', function() {
        const { bisa } = this;
        expect(() => {
          JLINC.expandBisa({ bisa });
        }).to.throw('failed to expand bisa: could not decode bisa.acceptedBisa.offeredBisa.agreementJwt');
      });
    });
  });

});
