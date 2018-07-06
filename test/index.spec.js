'use strict';

require('./setup');

describe('JLINC', function() {
  describe('.version', function() {
    it('should be 0.0.1', function(){
      expect(JLINC.version).to.equal('0.0.1');
    });
  });
});
