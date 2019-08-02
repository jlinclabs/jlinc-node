'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.expandBisaEvent', function() {
  withDidServer();

  context('when given no arguments', function() {
    it('should throw the error "bisa is required"', function() {
      expect(() => {
        JLINC.expandBisaEvent({});
      }).to.throw('bisaEvent is required');
    });
  });

  context('when given an invalid bisaEvent', function() {
    it('should throw JLINC.InvalidBisaEventError("bisaEvent.eventJwt is invalid")', function() {
      expect(() => {
        JLINC.expandBisaEvent({
          bisaEvent: {},
        });
      }).to.throw(
        JLINC.InvalidBisaEventError,
        'failed to expand bisa event: could not decode bisaEvent.eventJwt',
      );
    });
  });

  context('when given a valid bisaEvent', function() {
    beforeEach(async function(){
      const { bisaEvent, event } = await this.generateBisaEvent();
      Object.assign(this, { bisaEvent, event });
    });
    it('should expand the given bisaEvent', function() {
      const { bisaEvent, event } = this;
      expect( JLINC.expandBisaEvent({ bisaEvent }) ).to.deep.equal({
        '@context': bisaEvent['@context'],
        audit: bisaEvent.audit,
        event,
      });
    });
  });

  context('when given a valid acknowledgedBisaEvent', function() {
    beforeEach(async function(){
      const { event, acknowledgedBisaEvent } = await this.generateAcknowledgedBisaEvent();
      Object.assign(this, { event, acknowledgedBisaEvent });
    });
    it('should expand the given bisa', function() {
      const { event, acknowledgedBisaEvent } = this;
      expect( JLINC.expandBisaEvent({ bisaEvent: acknowledgedBisaEvent }) ).to.deep.equal({
        '@context': acknowledgedBisaEvent['@context'],
        audit: acknowledgedBisaEvent.audit,
        event,
      });
    });
  });

});
