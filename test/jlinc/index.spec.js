'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC', function() {

  describe('.version', function() {
    it('should be 0.0.1', function(){
      expect(JLINC.version).to.equal('0.0.1');
    });
  });

  describe('.contextUrl', function() {
    it('should be "https://context.jlinc.org/v05/jlinc.jsonld"', function(){
      expect(JLINC.contextUrl).to.equal('https://context.jlinc.org/v05/jlinc.jsonld');
    });
  });

});
