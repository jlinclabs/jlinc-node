'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.validateAcknowledgedSisaEvent', function() {
  withDidServer();

  before(async function() {
    const { dataCustodian, rightsHolder, sisa, sisaEvent, acknowledgedSisaEvent } = await this.generateAcknowledgedSisaEvent();
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

  context('when the given acknowledgedSisaEvent is invalid', function() {
    it('should a acknowledgedSisaEvent is invalid error', function(){
      const { sisaEvent } = this;
      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: {},
        });
      }).to.throw(
        JLINC.InvalidSisaEventError,
        'acknowledgedSisaEvent must have key "@context"',
      );
    });
  });

  context('when the sisaEvent and the acknowledgedSisaEvent do not match', function() {
    before(async function() {
      const { acknowledgedSisaEvent } = await this.generateAcknowledgedSisaEvent();
      this.otherAcknowledgedSisaEvent = acknowledgedSisaEvent;
    });

    context('when given an missmatching acknowledgedSisaEvent', function() {
      it('should throw the error "acknowledgedSisaEvent.eventJwt does not match sisaEvent.eventJwt"', function(){
        const { sisaEvent, otherAcknowledgedSisaEvent } = this;
        expect(() => {
          JLINC.validateAcknowledgedSisaEvent({
            sisaEvent,
            acknowledgedSisaEvent: otherAcknowledgedSisaEvent,
          });
        }).to.throw(
          JLINC.InvalidAcknowledgedSisaEventError,
          'acknowledgedSisaEvent.audit.eventId does not match sisaEvent.audit.eventId',
        );
      });
    });

    it('should throw an error', function(){
      const { sisaEvent, acknowledgedSisaEvent, otherAcknowledgedSisaEvent } = this;

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
              dataCustodianDid: undefined,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'acknowledgedSisaEvent.audit.dataCustodianDid is missing',
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
              // dataCustodianDid: otherAcknowledgedSisaEvent.audit.dataCustodianDid,
              dataCustodianPublicKey: otherAcknowledgedSisaEvent.audit.dataCustodianPublicKey,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedSisaEventError,
        'sisaEvent.audit.dataCustodianSig is invalid',
      );
    });
  });


  context('when given a sisaEvent that was not acknowledged', function() {
    it('should throw the error "acknowledgedSisaEvent.audit.dataCustodianDid is missing"', function(){
      const { sisaEvent } = this;
      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: sisaEvent,
        });
      }).to.throw('acknowledgedSisaEvent.audit.dataCustodianDid is missing');
    });
  });

  context('when given an acknowledgedSisaEvent that was not signed properly', function() {
    it('should throw the error "acknowledgedSisaEvent has an invalid signature"', function(){
      const { sisaEvent } = this;
      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: sisaEvent,
        });
      }).to.throw('acknowledgedSisaEvent.audit.dataCustodianDid is missing');
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


