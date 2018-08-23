'use strict';

const JLINC = require('../../jlinc');
const { generateSisaEvent } = require('../helpers');

describe('JLINC.validateSisaEvent', function() {

  before(function() {
    const { sisaEvent, rightsHolder } = generateSisaEvent();
    Object.assign(this, { sisaEvent, rightsHolder });
  });

  context('when given an invalid sisaEvent', function() {
    it('should throw an error', function(){
      const { sisaEvent, rightsHolder } = this;

      expect(() => {
        JLINC.validateSisaEvent({
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent is required');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: 45,
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent must be of type object');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {},
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent must have key "@context"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': 99,
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent["@context"] is invalid');


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
            audit: 'boosh',
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must be of type object');

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
              eventType: 'shoes',
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit.eventType is invalid');

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
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit must have key "createdAt"');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              createdAt: new Date,
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit.createdAt must be of type string');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              createdAt: 'Sunday the fourth',
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit.createdAt must be an ISO Date String');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              createdAt: new Date(9999999999999).toISOString(),
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit.createdAt cannot be in the future');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              createdAt: sisaEvent.audit.createdAt,
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
              createdAt: sisaEvent.audit.createdAt,
              previousId: sisaEvent.audit.previousId,
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
              createdAt: sisaEvent.audit.createdAt,
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
              createdAt: sisaEvent.audit.createdAt,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: 'xxxx',
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit.rightsHolderSigType is invalid');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              createdAt: sisaEvent.audit.createdAt,
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
              createdAt: sisaEvent.audit.createdAt,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
              rightsHolderId: 'cows',
            },
          },
        });
      }).to.throw(JLINC.InsisaEventError, 'sisaEvent.audit.rightsHolderId must be of length 43');

      expect(() => {
        JLINC.validateSisaEvent({
          sisaEvent: {
            '@context': sisaEvent['@context'],
            eventJwt: sisaEvent.eventJwt,
            audit: {
              eventType: sisaEvent.audit.eventType,
              sisaId: sisaEvent.audit.sisaId,
              eventId: sisaEvent.audit.eventId,
              createdAt: sisaEvent.audit.createdAt,
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
              createdAt: sisaEvent.audit.createdAt,
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
              createdAt: sisaEvent.audit.createdAt,
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
              createdAt: sisaEvent.audit.createdAt,
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
              createdAt: sisaEvent.audit.createdAt,
              previousId: sisaEvent.audit.previousId,
              rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
              rightsHolderId: sisaEvent.audit.rightsHolderId,
              rightsHolderSig: sisaEvent.audit.rightsHolderSig,
            },
          },
        });
      }).to.throw(JLINC.InvalidSisaEventError, 'sisaEvent.audit.eventId is invalid');

      expect(() => {
        const eventJwt = 'x.x.x';

        const eventId = JLINC.createHash({
          itemToHash: `${sisaEvent.audit.sisaId}.${eventJwt}.${sisaEvent.audit.previousId}.${sisaEvent.audit.createdAt}`
        });

        const rightsHolderSig = JLINC.signItem({
          itemToSign: eventId,
          privateKey: rightsHolder.privateKey,
        });

        const badSisaEvent = {
          '@context': sisaEvent['@context'],
          eventJwt,
          audit: {
            eventType: sisaEvent.audit.eventType,
            sisaId: sisaEvent.audit.sisaId,
            eventId,
            createdAt: sisaEvent.audit.createdAt,
            previousId: sisaEvent.audit.previousId,
            rightsHolderSigType: sisaEvent.audit.rightsHolderSigType,
            rightsHolderId: sisaEvent.audit.rightsHolderId,
            rightsHolderSig,
          },
        };

        JLINC.validateSisaEvent({ sisaEvent: badSisaEvent });
      }).to.throw(JLINC.InvalidSisaEventError, 'sisaEvent.eventJwt is invalid');

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
