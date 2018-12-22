'use strict';

const isISODateString = require('../../jlinc/isISODateString');

describe('isISODateString', function() {
  context('when given a valid ISODateString', function(){
    it('should return true', function(){
      expect(isISODateString(new Date().toISOString())).to.be.true;
    });
  });
  context('when given an invalid ISODateString', function(){
    it('should return false', function(){
      expect(isISODateString()).to.be.false;
      expect(isISODateString('xxx')).to.be.false;
      expect(isISODateString(new Date)).to.be.false;
      expect(isISODateString(null)).to.be.false;
    });
  });
});
