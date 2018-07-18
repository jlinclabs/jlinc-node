'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.createSisaEvent', function() {

  before(function() {
    const { sisa, rightsHolder } = this.generateSisa();
    const eventType = 'dataEvent';
    const event = {
      personal_data: {
        firstname: 'Steven',
        lastname: 'Pinker',
      },
    };
    const latestSisaEvent = null;
    Object.assign(this, { eventType, event, sisa, latestSisaEvent, rightsHolder });
  });

  it('should require all options', function(){
    expect(()=>{
      JLINC.createSisaEvent({
      });
    }).to.throw(Error, 'eventType is required');

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
      });
    }).to.throw(Error, 'event is required');

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
        event: 'x',
      });
    }).to.throw(Error, 'sisa is required');

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
        event: 'x',
        sisa: 'x',
      });
    }).to.throw(Error, 'latestSisaEvent is required');

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
        event: 'x',
        sisa: 'x',
        latestSisaEvent: 'x',
      });
    }).to.throw(Error, 'rightsHolder is required');
  });

  context('when given all valid options', function(){
    it('should return a sisaEvent', function(){
      const { sisa, rightsHolder, eventType, event, latestSisaEvent } = this;
      const sisaEvent = JLINC.createSisaEvent({ sisa, rightsHolder, eventType, event, latestSisaEvent });
      expect(sisaEvent).to.be.an('object');

      expect(sisaEvent).to.be.an('object');
      expect(sisaEvent['@context']).to.equal(JLINC.contextUrl);
      expect(sisaEvent.eventJwt).to.be.aJWTSignedWith(rightsHolder.secret);
      expect(sisaEvent.eventJwt).to.be.aJWTEncodingOf(event);
      expect(sisaEvent.audit).to.be.an('object');
      expect(sisaEvent.audit.eventType).to.equal('dataEvent');
      expect(sisaEvent.audit.sisaId).to.equal(sisa.sisaId);
      expect(sisaEvent.audit.previousId).to.be.null;
      expect(sisaEvent.audit.rightsHolderSigType).to.equal('sha256:ed25519');
      expect(sisaEvent.audit.rightsHolderId).to.equal(rightsHolder.publicKey);
      expect(sisaEvent.audit.rightsHolderSig).to.be.a('string');

      expect(
        JLINC.verifySignature({
          itemSigned: sisaEvent.eventJwt,
          signature: sisaEvent.audit.rightsHolderSig,
          publicKey: rightsHolder.publicKey,
        })
      ).to.be.true;
    });
  });

  context('when given an invalid eventType', function(){
    it('should throw an InvalidSisaError', function(){
      const { eventType, event, sisa, latestSisaEvent, rightsHolder } = this;
      expect(()=>{
        JLINC.createSisaEvent({
          eventType: 'donkey',
          event,
          sisa,
          latestSisaEvent,
          rightsHolder,
        });
      }).to.throw(Error, 'invalid sisa eventType "donkey"');
    });
  });

  context('when given an invalid event', function(){
    it('should throw an InvalidSisaError', function(){
      const { eventType, event, sisa, latestSisaEvent, rightsHolder } = this;
      expect(()=>{
        JLINC.createSisaEvent({
          eventType,
          event: 'boosh',
          sisa,
          latestSisaEvent,
          rightsHolder,
        });
      }).to.throw(Error, 'event must be a plain object');
      expect(()=>{
        JLINC.createSisaEvent({
          eventType,
          event: [1,2,3],
          sisa,
          latestSisaEvent,
          rightsHolder,
        });
      }).to.throw(Error, 'event must be a plain object');
    });
  });

  context('when given an invalid sisa', function(){
    it('should throw an InvalidSisaError', function(){
      const { eventType, event, sisa, latestSisaEvent, rightsHolder } = this;
      expect(()=>{
        JLINC.createSisaEvent({
          eventType,
          event,
          sisa: {},
          latestSisaEvent,
          rightsHolder,
        });
      }).to.throw(JLINC.InvalidSisaError);
    });
  });

  context('when given an invalid latestSisaEvent', function() {
    it('should throw InvalidSisaEventError', function(){
      const { eventType, event, sisa, rightsHolder } = this;
      expect(()=>{
        JLINC.createSisaEvent({
          eventType,
          event,
          sisa,
          latestSisaEvent: {},
          rightsHolder,
        });
      }).to.throw(JLINC.InvalidSisaEventError);
      expect(()=>{
        JLINC.createSisaEvent({
          eventType,
          event,
          sisa,
          latestSisaEvent: undefined,
          rightsHolder,
        });
      }).to.throw(Error, 'latestSisaEvent is required');
    });
  });

  context('when given an invalid rightsHolder', function() {
    it('should throw InvalidRightsHolderError', function(){
      const { eventType, event, sisa, latestSisaEvent } = this;
      expect(()=>{
        JLINC.createSisaEvent({
          eventType,
          event,
          sisa,
          latestSisaEvent,
          rightsHolder: {},
        });
      }).to.throw(JLINC.InvalidRightsHolderError);
    });
  });

  context('when given a rightsHolder that does not match the given sisa', function() {
    it('should throw InvalidSisaError "sisa.acceptedSisa.rightsHolderId does not match given rightsHolder"', function(){
      const { eventType, event, sisa, latestSisaEvent } = this;
      expect(()=>{
        JLINC.createSisaEvent({
          eventType,
          event,
          sisa,
          latestSisaEvent,
          rightsHolder: JLINC.createEntity(),
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa.acceptedSisaJwt is not signed by the given rightsHolder');
    });
  });

});
