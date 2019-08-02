'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.validateBisaEvent', function() {
  withDidServer();

  let bisa, bisaEvent, offeror;

  before(async function() {
    ({ bisa, bisaEvent, offeror } = await this.generateBisaEvent());
  });


  context('when given a valid bisaEvent', function() {
    it('should return true', function(){
      expect(
        JLINC.validateBisaEvent({ bisa, bisaEvent })
      ).to.be.true;
    });
  });

  context('when given an invalid bisaEvent', function() {
    it('should throw an error', function(){

      expect(() => {
        JLINC.validateBisaEvent({
        });
      }).to.throw(JLINC.InbisaEventError, 'bisa is required');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent is required');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: 45,
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent must be of type object');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {},
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent must have key "@context"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': 99,
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent["@context"] is invalid');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent must have key "eventJwt"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent must have key "audit"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: 'boosh',
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must be of type object');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {},
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "eventType"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: 'shoes',
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit.eventType is invalid');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "bisaId"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "createdAt"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              createdAt: new Date,
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit.createdAt must be of type string');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              createdAt: 'Sunday the fourth',
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit.createdAt must be an ISO Date String');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              createdAt: new Date(9999999999999).toISOString(),
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit.createdAt cannot be in the future');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              createdAt: bisaEvent.audit.createdAt,
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "previousId"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "eventId"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "initiatorSigType"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: 'xxxx',
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit.initiatorSigType is invalid');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "initiatorDid"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorDid: {},
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit.initiatorDid must be of type string');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorDid: bisaEvent.audit.initiatorDid
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "initiatorPublicKey"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorDid: bisaEvent.audit.initiatorDid,
              initiatorPublicKey: {},
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit.initiatorPublicKey must be of type string');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorDid: bisaEvent.audit.initiatorDid,
              initiatorPublicKey: 'fake key here',
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit.initiatorPublicKey must be of length 43');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorDid: bisaEvent.audit.initiatorDid,
              initiatorPublicKey: bisaEvent.audit.initiatorPublicKey,
            },
          },
        });
      }).to.throw(JLINC.InbisaEventError, 'bisaEvent.audit must have key "initiatorSig"');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorDid: bisaEvent.audit.initiatorDid,
              initiatorPublicKey: bisaEvent.audit.initiatorPublicKey,
              initiatorSig: bisaEvent.audit.initiatorSig,
            },
          },
        });
      }).to.not.throw();

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: 'asdsadsad',
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorDid: bisaEvent.audit.initiatorDid,
              initiatorPublicKey: bisaEvent.audit.initiatorPublicKey,
              initiatorSig: bisaEvent.audit.initiatorSig,
            },
          },
        });
      }).to.throw(JLINC.InvalidBisaEventError, 'bisaEvent.eventJwt is invalid');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: bisaEvent.audit.eventId,
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorDid: bisaEvent.audit.initiatorDid,
              initiatorPublicKey: bisaEvent.audit.initiatorPublicKey,
              initiatorSig: 'asdsdsadsa',
            },
          },
        });
      }).to.throw(JLINC.InvalidBisaEventError, 'bisaEvent.audit.initiatorSig is invalid');

      expect(() => {
        JLINC.validateBisaEvent({
          bisa,
          bisaEvent: {
            '@context': bisaEvent['@context'],
            eventJwt: bisaEvent.eventJwt,
            audit: {
              eventType: bisaEvent.audit.eventType,
              bisaId: bisaEvent.audit.bisaId,
              eventId: 'asdsakjdsakldjsakldjsaklajlk',
              createdAt: bisaEvent.audit.createdAt,
              previousId: bisaEvent.audit.previousId,
              initiatorSigType: bisaEvent.audit.initiatorSigType,
              initiatorId: bisaEvent.audit.initiatorId,
              initiatorSig: bisaEvent.audit.initiatorSig,
            },
          },
        });
      }).to.throw(JLINC.InvalidBisaEventError, 'bisaEvent.audit.eventId is invalid');

      expect(() => {
        const eventJwt = 'x.x.x';

        const eventId = JLINC.createHash({
          itemToHash: `${bisaEvent.audit.bisaId}.${eventJwt}.${bisaEvent.audit.previousId}.${bisaEvent.audit.createdAt}`
        });

        const initiatorSig = JLINC.signHash({
          hashToSign: eventId,
          privateKey: offeror.signingPrivateKey,
        });

        const badBisaEvent = {
          '@context': bisaEvent['@context'],
          eventJwt,
          audit: {
            eventType: bisaEvent.audit.eventType,
            bisaId: bisaEvent.audit.bisaId,
            eventId,
            createdAt: bisaEvent.audit.createdAt,
            previousId: bisaEvent.audit.previousId,
            initiatorSigType: bisaEvent.audit.initiatorSigType,
            initiatorDid: bisaEvent.audit.initiatorDid,
            initiatorPublicKey: bisaEvent.audit.initiatorPublicKey,
            initiatorSig,
          },
        };

        JLINC.validateBisaEvent({ bisa, bisaEvent: badBisaEvent });
      }).to.throw(JLINC.InvalidBisaEventError, 'bisaEvent.eventJwt is invalid');

    });
  });

});
