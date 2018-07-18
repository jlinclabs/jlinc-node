'use strict';

const JLINC = require('../../jlinc');
const { generateSisaEvent } = require('../helpers');

describe('JLINC.validateSisaEvent', function() {

  before(function() {
    const { sisaEvent } = generateSisaEvent();
    this.sisaEvent = sisaEvent;
  });

  context('when given an invalid sisaEvent', function() {
    it('should return true', function(){
      const { sisaEvent } = this;
      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {},
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent must have key "@context"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent must have key "eventJwt"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent must have key "audit"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {},
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "eventType"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "sisaId"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "eventId"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "timestamp"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              timestamp: sisaEvent.audit.timestamp,
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "previousId"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              timestamp: sisaEvent.audit.timestamp,
              previousId: sisaEvent.audit.previousId,
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "rightsHolderSigType"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              timestamp: sisaEvent.audit.timestamp,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "rightsHolderId"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              timestamp: sisaEvent.audit.timestamp,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
              rightsHolderId: sisaEvent.audit.rightsHolderId,
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "rightsHolderSig"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              timestamp: sisaEvent.audit.timestamp,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
              rightsHolderId: sisaEvent.audit.rightsHolderId,
              rightsHolderSig: sisaEvent.audit.rightsHolderSig,
            },
          },
        });
      }).to.not.throw();


      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: 'asdsadsad',
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              timestamp: sisaEvent.audit.timestamp,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
              rightsHolderId: sisaEvent.audit.rightsHolderId,
              rightsHolderSig: sisaEvent.audit.rightsHolderSig,
            },
          },
        });
      }).to.throw(JLINC.InvalidSisaEventError, 'sisaEvent.eventJwt is invalid');


      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              timestamp: sisaEvent.audit.timestamp,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
              rightsHolderId: sisaEvent.audit.rightsHolderId,
              rightsHolderSig: 'asdsdsadsa',
            },
          },
        });
      }).to.throw(JLINC.InvalidSisaEventError, 'sisaEvent.audit.rightsHolderSig is invalid');


      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: 'asdsakjdsakldjsakldjsaklajlk',
              timestamp: sisaEvent.audit.timestamp,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
              rightsHolderId: sisaEvent.audit.rightsHolderId,
              rightsHolderSig: sisaEvent.audit.rightsHolderSig,
            },
          },
        });
      }).to.throw(JLINC.InvalidSisaEventError, 'sisaEvent.audit.eventId is invalid');
    });
  });

  context('when given a valid sisaEvent', function() {
    it('should return true', function(){
      const { sisaEvent } = this;
      expect(
        JLINC.validateSisaEvent({
          sisaEvent,
        })
      ).to.be.true;
    });
  });

});
