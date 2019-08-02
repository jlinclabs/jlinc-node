'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.acknowledgeBisaEvent', function() {
  withDidServer();

  before(async function() {
    const { bisa, offeror, target, bisaEvent } = await this.generateBisaEvent();
    Object.assign(this, { bisa, offeror, target, bisaEvent });
  });

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      const { bisa, target, bisaEvent } = this;

      expect(()=>{
        JLINC.acknowledgeBisaEvent({

        });
      }).to.throw('bisa is required');

      expect(()=>{
        JLINC.acknowledgeBisaEvent({
          bisa,
        });
      }).to.throw('bisaEvent is required');

      expect(()=>{
        JLINC.acknowledgeBisaEvent({
          bisa,
          bisaEvent,
        });
      }).to.throw('dataCustodian is required');

      expect(()=>{
        JLINC.acknowledgeBisaEvent({
          bisa,
          bisaEvent,
          dataCustodian: {},
        });
      }).to.throw('dataCustodian.did is required');

      expect(()=>{
        JLINC.acknowledgeBisaEvent({
          bisa,
          bisaEvent,
          dataCustodian: {
            did: target.did,
          },
        });
      }).to.throw('dataCustodian.signingPublicKey is required');

      expect(()=>{
        JLINC.acknowledgeBisaEvent({
          bisa,
          bisaEvent,
          dataCustodian: {
            did: target.did,
            signingPublicKey: target.signingPublicKey,
          },
        });
      }).to.throw('dataCustodian.signingPrivateKey is required');

      expect(()=>{
        JLINC.acknowledgeBisaEvent({
          bisa,
          bisaEvent,
          dataCustodian: target,
        });
      }).to.not.throw();
    });
  });

  context('when given an invalid dataCustodian', function() {
    it('should throw a InvalidDataCustodianError', function(){
      const { bisa, bisaEvent } = this;
      expect(()=>{
        JLINC.acknowledgeBisaEvent({
          dataCustodian: {},
          bisa,
          bisaEvent,
        });
      }).to.throw(JLINC.InvalidDataCustodianError);
    });
  });

  context('when given the given dataCustodian is the event initiator', function() {
    it('should throw an error', function() {
      const { bisa, offeror, bisaEvent } = this;
      expect(()=>{
        JLINC.acknowledgeBisaEvent({
          bisa,
          bisaEvent,
          dataCustodian: offeror,
        });
      }).to.throw('bisaEvent cannot be acknowledged by the initiator');
    });
  });

  context('when given all valid arguments', function() {
    it('should return a new acknowledgedBisaEvent', function() {
      const { bisa, target, bisaEvent } = this;
      const acknowledgedBisaEvent = JLINC.acknowledgeBisaEvent({
        bisa,
        bisaEvent,
        dataCustodian: target,
      });
      expect(acknowledgedBisaEvent).to.be.an('object');
      expect(acknowledgedBisaEvent).to.not.equal(bisaEvent);
      expect(acknowledgedBisaEvent).to.matchPattern({
        '@context': bisaEvent['@context'],
        eventJwt: bisaEvent.eventJwt,
        audit: {
          ...bisaEvent.audit,
          acceptorSigType: JLINC.signatureType,
          acceptorDid: target.did,
          acceptorPublicKey: target.signingPublicKey,
          acceptorSig: _.isString,
        },
      });

      expect(
        JLINC.verifyHashSignature({
          signed: acknowledgedBisaEvent.audit.eventId,
          signature: acknowledgedBisaEvent.audit.acceptorSig,
          publicKey: target.signingPublicKey,
        })
      ).to.be.true;
    });
  });

  context('when given a mismatching dataCustodian', function() {
    it('should throw an error', async function() {
      const { bisa, bisaEvent } = this;
      const dataCustodian = await JLINC.createDataCustodian();
      expect(() => {
        JLINC.acknowledgeBisaEvent({
          bisa,
          bisaEvent,
          dataCustodian,
        });
      }).to.throw('bisa was not signed by the given dataCustodian');
    });
  });

});
