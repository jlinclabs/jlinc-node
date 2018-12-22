'use strict';

const isJwt = require('../../jlinc/isJwt');
const jsonwebtoken = require('jsonwebtoken');

describe('isJwt', function() {
  context('when given a valid json web token', function(){
    it('should return true', function(){
      const jwt = jsonwebtoken.sign({love:true}, 'cats', {
        algorithm: 'HS256',
        noTimestamp: true,
      });
      expect(isJwt(jwt)).to.be.true;
    });
  });
  context('when given an invalid json web token', function(){
    it('should return false', function(){
      expect(isJwt()).to.be.false;
      expect(isJwt('xxx.xxx')).to.be.false;
      expect(isJwt(new Date)).to.be.false;
      expect(isJwt(null)).to.be.false;
    });
  });
});
