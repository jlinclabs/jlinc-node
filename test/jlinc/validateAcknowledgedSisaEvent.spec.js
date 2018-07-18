'use strict';

const JLINC = require('../../jlinc');
const { generateSisaEvent } = require('../helpers');

describe('JLINC.validateAcknowledgedSisaEvent', function() {

  before(function() {
    const { dataCustodian, rightsHolder, sisa, sisaEvent } = generateSisaEvent();
    const acknowledgedSisaEvent = JLINC.acknowledgeSisaEvent({
      sisa,
      dataCustodian,
      sisaEvent,
    });
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

  context('when given an invalid acknowledgedSisaEvent', function() {
    it('should throw the error ""', function(){
      const { sisaEvent, acknowledgedSisaEvent } = this;
      expect(() => {
        JLINC.validateAcknowledgedSisaEvent({
          sisaEvent,
          acknowledgedSisaEvent: {},
        });
      }).to.throw('acknowledgedSisaEvent.eventJwt does not match sisaEvent.eventJwt');
    });
  });

  context('when given a acknowledgedSisaEvent that was not acknowledged', function() {
    it('should throw the error ""', function(){
      const { sisaEvent, acknowledgedSisaEvent } = this;
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
