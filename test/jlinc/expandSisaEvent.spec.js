'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.expandSisaEvent', function() {
  withDidServer();

  context('when given no arguments', function() {
    it('should throw the error "sisa is required"', function() {
      expect(() => {
        JLINC.expandSisaEvent({});
      }).to.throw('sisaEvent is required');
    });
  });

  context('when given an invalid sisaEvent', function() {
    it('should throw JLINC.InvalidSisaEventError("sisaEvent.eventJwt is invalid")', function() {
      expect(() => {
        JLINC.expandSisaEvent({
          sisaEvent: {},
        });
      }).to.throw(JLINC.InvalidSisaEventError, 'sisaEvent.eventJwt is invalid');
    });
  });

  context('when given a valid sisaEvent', function() {
    beforeEach(async function(){
      const { sisaEvent, event } = await this.generateSisaEvent();
      Object.assign(this, { sisaEvent, event });
    });
    it('should expand the given sisaEvent', function() {
      const { sisaEvent, event } = this;
      expect( JLINC.expandSisaEvent({ sisaEvent }) ).to.deep.equal({
        '@context': sisaEvent['@context'],
        audit: sisaEvent.audit,
        event,
      });
    });
  });

  context('when given a valid acknowledgedSisaEvent', function() {
    beforeEach(async function(){
      const { event, acknowledgedSisaEvent } = await this.generateAcknowledgedSisaEvent();
      Object.assign(this, { event, acknowledgedSisaEvent });
    });
    it('should expand the given sisa', function() {
      const { event, acknowledgedSisaEvent } = this;
      expect( JLINC.expandSisaEvent({ sisaEvent: acknowledgedSisaEvent }) ).to.deep.equal({
        '@context': acknowledgedSisaEvent['@context'],
        audit: acknowledgedSisaEvent.audit,
        event,
      });
    });
  });

});
