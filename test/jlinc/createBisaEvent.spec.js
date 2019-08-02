'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.createBisaEvent', function() {
  withDidServer();

  before(async function() {
    const { bisa, offeror, target } = await this.generateBisa();
    const eventType = 'permissionEvent';
    const event = {
      canShowRelationshipPublicly: true,
    };
    const latestBisaEvent = null;
    Object.assign(this, {
      bisa,
      offeror,
      target,
      eventType,
      event,
      latestBisaEvent,
    });
  });

  it('should require all options', function(){
    expect(()=>{
      JLINC.createBisaEvent({
      });
    }).to.throw(Error, 'eventType is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
      });
    }).to.throw(Error, 'event is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
        event: 'x',
      });
    }).to.throw(Error, 'bisa is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
        event: 'x',
        bisa: 'x',
      });
    }).to.throw(Error, 'latestBisaEvent is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
        event: 'x',
        bisa: 'x',
        latestBisaEvent: 'x',
      });
    }).to.throw(Error, 'dataCustodian is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
        event: 'x',
        bisa: 'x',
        latestBisaEvent: 'x',
        dataCustodian: {},
      });
    }).to.throw(Error, 'dataCustodian.did is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
        event: 'x',
        bisa: 'x',
        latestBisaEvent: 'x',
        dataCustodian: {
          did: 'x',
        },
      });
    }).to.throw(Error, 'dataCustodian.secret is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
        event: 'x',
        bisa: 'x',
        latestBisaEvent: 'x',
        dataCustodian: {
          did: 'x',
          secret: 'x',
        },
      });
    }).to.throw(Error, 'dataCustodian.signingPrivateKey is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
        event: 'x',
        bisa: 'x',
        latestBisaEvent: 'x',
        dataCustodian: {
          did: 'x',
          secret: 'x',
          signingPrivateKey: 'x',
        },
      });
    }).to.throw(Error, 'dataCustodian.signingPublicKey is required');

    expect(()=>{
      JLINC.createBisaEvent({
        eventType: 'x',
        event: 'x',
        bisa: 'x',
        latestBisaEvent: 'x',
        dataCustodian: {
          did: 'x',
          secret: 'x',
          signingPrivateKey: 'x',
          signingPublicKey: 'x',
        },
      });
    }).to.throw(Error, 'bisa must be of type object');
  });

  context('when given all valid options', function(){
    it('should return a bisaEvent', function(){
      const { bisa, offeror, eventType, event, latestBisaEvent } = this;
      const bisaEvent = JLINC.createBisaEvent({
        bisa,
        dataCustodian: offeror,
        eventType,
        event,
        latestBisaEvent,
      });

      expect(bisaEvent).to.matchPattern({
        '@context': JLINC.contextUrl,
        audit: {
          eventType: 'permissionEvent',
          bisaId: bisa.bisaId,
          eventId: _.isString,
          createdAt: _.isRecentDatetimeInISOFormat,
          previousId: null,
          initiatorDid: offeror.did,
          initiatorPublicKey: offeror.signingPublicKey,
          initiatorSigType: JLINC.signatureType,
          initiatorSig: _.isString,
        },
        eventJwt: _.isAJwtMatchingPattern(event),
      });
      expect(bisaEvent.eventJwt).to.be.aJwtSignedWith(offeror.secret);
      expect(bisaEvent.eventJwt).to.be.aJwtEncodingOf(event);
    });
  });

  context('when given an invalid eventType', function(){
    it('should throw an InvalidBisaError', function(){
      const { event, bisa, latestBisaEvent, offeror } = this;
      expect(()=>{
        JLINC.createBisaEvent({
          eventType: 'donkey',
          event,
          bisa,
          latestBisaEvent,
          dataCustodian: offeror,
        });
      }).to.throw(Error, 'invalid bisa eventType "donkey"');
    });
  });

  context('when given an invalid event', function(){
    it('should throw an InvalidBisaError', function(){
      const { eventType, bisa, latestBisaEvent, offeror } = this;
      expect(()=>{
        JLINC.createBisaEvent({
          eventType,
          event: 'boosh',
          bisa,
          latestBisaEvent,
          dataCustodian: offeror,
        });
      }).to.throw(Error, 'event must be a plain object');
      expect(()=>{
        JLINC.createBisaEvent({
          eventType,
          event: [1,2,3],
          bisa,
          latestBisaEvent,
          dataCustodian: offeror,
        });
      }).to.throw(Error, 'event must be a plain object');
    });
  });

  context('when given an invalid latestBisaEvent', function() {
    it('should throw InvalidBisaEventError', function(){
      const { eventType, event, bisa, offeror } = this;
      expect(()=>{
        JLINC.createBisaEvent({
          eventType,
          event,
          bisa,
          latestBisaEvent: {},
          dataCustodian: offeror,
        });
      }).to.throw(JLINC.InvalidBisaEventError);
      expect(()=>{
        JLINC.createBisaEvent({
          eventType,
          event,
          bisa,
          latestBisaEvent: undefined,
          dataCustodian: offeror,
        });
      }).to.throw(Error, 'latestBisaEvent is required');
    });
  });

  context('when given an invalid rightsHolder', function() {
    it('should throw InvalidRightsHolderError', function(){
      const { eventType, event, bisa, latestBisaEvent } = this;
      expect(()=>{
        JLINC.createBisaEvent({
          eventType,
          event,
          bisa,
          latestBisaEvent,
          rightsHolder: {},
        });
      }).to.throw(JLINC.InvalidRightsHolderError);
    });
  });

  context('when given a rightsHolder that does not match the given bisa', function() {
    beforeEach(async function(){
      this.other = await JLINC.createDataCustodian();
    });
    it('should throw BisaVerificationError "bisa was not signed by the given dataCustodian"', function(){
      const { eventType, event, bisa, latestBisaEvent, other } = this;
      expect(()=>{
        JLINC.createBisaEvent({
          eventType,
          event,
          bisa,
          latestBisaEvent,
          dataCustodian: other,
        });
      }).to.throw(
        JLINC.BisaVerificationError,
        'bisa was not signed by the given dataCustodian'
      );
    });
  });

  it('should create a unique bisaEventId', function(){
    const { eventType, event, bisa, latestBisaEvent, offeror, target } = this;

    const bisaEvent1 = JLINC.createBisaEvent({
      eventType,
      event,
      bisa,
      latestBisaEvent,
      dataCustodian: offeror,
    });

    const bisaEvent2 = JLINC.createBisaEvent({
      eventType,
      event,
      bisa,
      latestBisaEvent: bisaEvent1,
      dataCustodian: target,
    });

    expect(bisaEvent1.audit.eventId).to.not.equal(bisaEvent2.audit.eventId);

  });

});
