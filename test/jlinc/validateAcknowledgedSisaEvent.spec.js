'use strict';

const JLINC = require('../../jlinc');
const { generateAcknowledgedSisaEvent } = require('../helpers');

describe('JLINC.validateAcknowledgedSisaEvent', function() {

  before(function() {
    const { dataCustodian, rightsHolder, sisa, sisaEvent, acknowledgedSisaEvent } = generateAcknowledgedSisaEvent();
    Object.assign(this, { dataCustodian, rightsHolder, sisa, sisaEvent, acknowledgedSisaEvent });
  });

  it('should validate arguments', function(){
    expect(()=>{
      JLINC.validateAcknowledgedSisaEvent({

      });
    }).to.throw('sisaEvent is required');

    expect(()=>{
      JLINC.validateAcknowledgedSisaEvent({
        sisaEvent: {},
      });
    }).to.throw('acknowledgedSisaEvent is required');
  });

  context('when given an missmatching acknowledgedSisaEvent', function() {
    it('should throw the error "acknowledgedSisaEvent.eventJwt does not match sisaEvent.eventJwt"', function(){
      const { sisaEvent } = this;
      const { acknowledgedSisaEvent } = generateAcknowledgedSisaEvent();
      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent,
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'acknowledgedSisaEvent.audit.eventId does not match sisaEvent.audit.eventId',
      );
    });
  });

  context('when the sisaEvent and the acknowledgedSisaEvent do not match', function() {
    it('should throw an error', function(){
      const { sisaEvent, acknowledgedSisaEvent } = this;
      const { acknowledgedSisaEvent: otherAcknowledgedSisaEvent } = generateAcknowledgedSisaEvent();

      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: {
            ...acknowledgedSisaEvent,
            audit: {
              ...acknowledgedSisaEvent.audit,
              eventType: 'statusEvent',
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'acknowledgedSisaEvent.audit.eventType does not match sisaEvent.audit.eventType',
      );

      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: {
            ...acknowledgedSisaEvent,
            audit: {
              ...acknowledgedSisaEvent.audit,
              timestamp: otherAcknowledgedSisaEvent.audit.timestamp+1,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'acknowledgedSisaEvent.audit.timestamp does not match sisaEvent.audit.timestamp',
      );

      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: {
            ...acknowledgedSisaEvent,
            audit: {
              ...acknowledgedSisaEvent.audit,
              dataCustodianId: undefined,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'acknowledgedSisaEvent.audit.dataCustodianId is missing',
      );

      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: {
            ...acknowledgedSisaEvent,
            audit: {
              ...acknowledgedSisaEvent.audit,
              dataCustodianSigType: undefined,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'acknowledgedSisaEvent.audit.dataCustodianSigType is missing',
      );

      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: {
            ...acknowledgedSisaEvent,
            audit: {
              ...acknowledgedSisaEvent.audit,
              dataCustodianSig: undefined,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'acknowledgedSisaEvent.audit.dataCustodianSig is missing',
      );

      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: {
            ...acknowledgedSisaEvent,
            audit: {
              ...acknowledgedSisaEvent.audit,
              dataCustodianId: otherAcknowledgedSisaEvent.audit.dataCustodianId,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'sisaEvent.audit.dataCustodianSig is invalid',
      );
    });
  });

  context('when given a acknowledgedSisaEvent that was not acknowledged', function() {
    it('should throw the error "acknowledgedSisaEvent.audit.dataCustodianId is missing"', function(){
      const { sisaEvent } = this;
      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: sisaEvent,
        });
      }).to.throw('acknowledgedSisaEvent.audit.dataCustodianId is missing');
    });
  });

  context('when given all valid arguments', function() {
    it('should return true', function(){
      const { sisaEvent, acknowledgedSisaEvent } = this;
      expect(
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent,
        })
      ).to.be.true;
    });
  });

  context('when given a valid v5 acknowledgedSisaEvent', function() {
    it('should return true', function(){
      const sisaEvent = {
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        audit: {
          sisaId: "P49VOAaQ37UDoiC0CV_0ayCAudbEmUHWJS_yVW8Hpi0",
          eventId: "Q8eROYrCNr6cBoSAz30aH3_cxkZt1lPimwVGzI14234",
          createdAt: "2018-07-26T19:07:35.844Z",
          eventType: "dataEvent",
          previousId: null,
          rightsHolderId: "66cTWrceMHrdeyvfJHsUVXYxEU186K6OxM7FiO8zjjw",
          rightsHolderSig: "qOBSdnOnx_3V-Lu_i-Z1YcLksetY4q-KwKiSr6mFqrksNwi68xdNPKOSTQTJYGk4UXp27UxM05ioFuYH2DZsBNS20Kz5KCYPdD0xHrZAr785WluRGOq3lY5evHrwIFF7",
          rightsHolderSigType: "sha256:ed25519",
        },
        eventJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hbF9kYXRhIjp7ImZpcnN0bmFtZSI6IkphcmVkIiwiaG9tZXBob25lIjoiNDE1LjMwNy40MzYwIiwibGFzdG5hbWUiOiJBdHJvbiJ9fQ.rxMLaAmrWp9T66Qb3r1n7ocZZNjFpgRZUKG0QJ6ZhyA',
      };
      const acknowledgedSisaEvent = {
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        audit: {
          sisaId: "P49VOAaQ37UDoiC0CV_0ayCAudbEmUHWJS_yVW8Hpi0",
          eventId: "Q8eROYrCNr6cBoSAz30aH3_cxkZt1lPimwVGzI14234",
          createdAt: "2018-07-26T19:07:35.844Z",
          eventType: "dataEvent",
          previousId: null,
          rightsHolderId: "66cTWrceMHrdeyvfJHsUVXYxEU186K6OxM7FiO8zjjw",
          rightsHolderSig: "qOBSdnOnx_3V-Lu_i-Z1YcLksetY4q-KwKiSr6mFqrksNwi68xdNPKOSTQTJYGk4UXp27UxM05ioFuYH2DZsBNS20Kz5KCYPdD0xHrZAr785WluRGOq3lY5evHrwIFF7",
          rightsHolderSigType: "sha256:ed25519",
          dataCustodianId: "A0skZV9j-HmvOawNSH0YvvOgwbRkkm1xkTDoEr9vY3I",
          dataCustodianSig: "48DgI7nQi8REEKg7-f_NagQNHrcOZtN8aQVltAJw2crLf_RaC6hu1o_yjc2NRFCldcnO70Fx7uD6cAwsFEC6DgZEzwuEAEnemm-Jo6_QyfyQRHPilMAvR8h0xCmBRrcM",
          dataCustodianSigType: "sha256:ed25519",
        },
        eventJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hbF9kYXRhIjp7ImZpcnN0bmFtZSI6IkphcmVkIiwiaG9tZXBob25lIjoiNDE1LjMwNy40MzYwIiwibGFzdG5hbWUiOiJBdHJvbiJ9fQ.rxMLaAmrWp9T66Qb3r1n7ocZZNjFpgRZUKG0QJ6ZhyA',
      };
      expect(
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent,
        })
      ).to.be.true;
    });
  });
});
