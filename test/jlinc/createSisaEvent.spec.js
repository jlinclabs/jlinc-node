'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.createSisaEvent', function() {
  withDidServer();

  before(async function() {
    const { sisa, rightsHolder } = await this.generateSisa();
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

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
        event: 'x',
        sisa: 'x',
        latestSisaEvent: 'x',
        rightsHolder: {},
      });
    }).to.throw(Error, 'rightsHolder.did is required');

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
        event: 'x',
        sisa: 'x',
        latestSisaEvent: 'x',
        rightsHolder: {
          did: 'x',
        },
      });
    }).to.throw(Error, 'rightsHolder.secret is required');

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
        event: 'x',
        sisa: 'x',
        latestSisaEvent: 'x',
        rightsHolder: {
          did: 'x',
          secret: 'x',
        },
      });
    }).to.throw(Error, 'rightsHolder.signingPrivateKey is required');

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
        event: 'x',
        sisa: 'x',
        latestSisaEvent: 'x',
        rightsHolder: {
          did: 'x',
          secret: 'x',
          signingPrivateKey: 'x',
        },
      });
    }).to.throw(Error, 'rightsHolder.signingPublicKey is required');

    expect(()=>{
      JLINC.createSisaEvent({
        eventType: 'x',
        event: 'x',
        sisa: 'x',
        latestSisaEvent: 'x',
        rightsHolder: {
          did: 'x',
          secret: 'x',
          signingPrivateKey: 'x',
          signingPublicKey: 'x',
        },
      });
    }).to.throw(Error, 'sisa must be of type object');
  });

  context('when given all valid options', function(){
    it('should return a sisaEvent', function(){
      const { sisa, rightsHolder, eventType, event, latestSisaEvent } = this;
      const sisaEvent = JLINC.createSisaEvent({ sisa, rightsHolder, eventType, event, latestSisaEvent });

      expect(sisaEvent).to.matchPattern({
        '@context': JLINC.contextUrl,
        audit: {
          eventType: 'dataEvent',
          sisaId: sisa.sisaId,
          eventId: _.isString,
          createdAt: _.isRecentDatetimeInISOFormat,
          previousId: null,
          rightsHolderDid: rightsHolder.did,
          rightsHolderPublicKey: rightsHolder.signingPublicKey,
          rightsHolderSigType: JLINC.signatureType,
          rightsHolderSig: _.isString,
        },
        eventJwt: _.isString
      });
      expect(sisaEvent.eventJwt).to.be.aJwtSignedWith(rightsHolder.secret);
      expect(sisaEvent.eventJwt).to.be.aJwtEncodingOf(event);

      expect(
        JLINC.verifySisaEventWasSignedByRightsHolder({
          sisaEvent,
          rightsHolderPublicKey: rightsHolder.signingPublicKey,
        })
      ).to.be.true;

      expect(
        JLINC.expandSisaEvent({ sisaEvent })
      ).to.deep.equal({
        '@context': JLINC.contextUrl,
        audit: {
          eventType: 'dataEvent',
          sisaId: sisa.sisaId,
          eventId: sisaEvent.audit.eventId,
          createdAt: sisaEvent.audit.createdAt,
          previousId: null,
          rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
          rightsHolderDid: rightsHolder.did,
          rightsHolderPublicKey: rightsHolder.signingPublicKey,
          rightsHolderSig: sisaEvent.audit.rightsHolderSig,
        },
        event: {
          personal_data: {
            firstname: 'Steven',
            lastname: 'Pinker',
          }
        }
      });
    });
  });

  context('when given an invalid eventType', function(){
    it('should throw an InvalidSisaError', function(){
      const { event, sisa, latestSisaEvent, rightsHolder } = this;
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
      const { eventType, sisa, latestSisaEvent, rightsHolder } = this;
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

  // commented this out because it used to call JLINC.validateSisa before this branch
  // made validataSisa async and talk to the did server
  // context('when given an invalid sisa', function(){
  //   it('should throw an InvalidSisaError', function(){
  //     const { eventType, event, latestSisaEvent, rightsHolder } = this;
  //     expect(()=>{
  //       JLINC.createSisaEvent({
  //         eventType,
  //         event,
  //         sisa: {},
  //         latestSisaEvent,
  //         rightsHolder,
  //       });
  //     }).to.throw(JLINC.InvalidSisaError);
  //   });
  // });

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
    beforeEach(async function(){
      this.otherRightsHolder = await JLINC.createRightsHolder();
    });
    it('should throw InvalidSisaError "sisa.acceptedSisa.rightsHolderId does not match given rightsHolder"', function(){
      const { eventType, event, sisa, latestSisaEvent, otherRightsHolder } = this;
      expect(()=>{
        JLINC.createSisaEvent({
          eventType,
          event,
          sisa,
          latestSisaEvent,
          rightsHolder: otherRightsHolder,
        });
      }).to.throw('rightsholder.did does not match sisa');
    });
  });

  it('should create a unique sisaEventId', function(){
    const { eventType, event, sisa, latestSisaEvent, rightsHolder } = this;

    const sisaEvent1 = JLINC.createSisaEvent({
      eventType,
      event,
      sisa,
      latestSisaEvent,
      rightsHolder,
    });

    const sisaEvent2 = JLINC.createSisaEvent({
      eventType,
      event,
      sisa,
      latestSisaEvent: sisaEvent1,
      rightsHolder,
    });

    expect(sisaEvent1.audit.eventId).to.not.equal(sisaEvent2.audit.eventId);

  });

});
