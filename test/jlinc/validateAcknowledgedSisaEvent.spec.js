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
});
