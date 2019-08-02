'use strict';

const isDid = require('../../jlinc/isDid');

describe('isDid', function() {
  context('when given a valid did', function(){
    it('should return true', function(){
      expect(isDid(`did:sdhjfjkdshfdsjkfhdsjkfhdksjfhkjds`)).to.be.true;
    });
  });
  context('when given an invalid did', function(){
    it('should return false', function(){
      expect(isDid()).to.be.false;
      expect(isDid('')).to.be.false;
      expect(isDid('did:')).to.be.false;
      expect(isDid(new Date)).to.be.false;
      expect(isDid(null)).to.be.false;
    });
  });
});
