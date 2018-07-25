'use strict';

const JLINC = require('../../jlinc');
const { generateSisaEvent, generateAcknowledgedSisaEvent } = require('../helpers');

describe('JLINC.expandSisaEvent', function() {

  context('when given no arguments', function() {
    it('should throw the error "sisa is required"', function() {
      expect(() => {
        JLINC.expandSisaEvent({});
      }).to.throw('sisaEvent is required');
    });
  });

  context('when given a valid sisaEvent', function() {
    it('should expand the given sisaEvent', function() {
      const { sisaEvent, event } = generateSisaEvent();
      expect( JLINC.expandSisaEvent({ sisaEvent }) ).to.deep.equal({
        '@context': sisaEvent['@context'],
        audit: sisaEvent.audit,
        event,
      });
    });
  });

  context('when given a valid acknowledgedSisaEvent', function() {
    it('should expand the given sisa', function() {

      const { event, acknowledgedSisaEvent } = generateAcknowledgedSisaEvent();

      expect( JLINC.expandSisaEvent({ sisaEvent: acknowledgedSisaEvent }) ).to.deep.equal({
        '@context': acknowledgedSisaEvent['@context'],
        audit: acknowledgedSisaEvent.audit,
        event,
      });
    });
  });

});
