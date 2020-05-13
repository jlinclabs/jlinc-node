'use strict';

const isFutureDate = require('../../jlinc/isFutureDate');

describe('isFutureDate', function() {

  const makeDate = delta =>
    (new Date(Date.now() + delta)).toISOString()
  ;

  context('when given a date in the past', function(){
    it('should return false', function(){
      expect(isFutureDate(makeDate(-10))).to.be.false;
      expect(isFutureDate(makeDate(-100))).to.be.false;
      expect(isFutureDate(makeDate(-1000))).to.be.false;
      expect(isFutureDate(makeDate(-10000))).to.be.false;
    });
  });
  context('when given a date in the future', function(){
    context('more than the tolerance', function(){
      it('should return true', function(){
        expect(isFutureDate(makeDate(1001))).to.be.true;
        expect(isFutureDate(makeDate(2000))).to.be.true;
        expect(isFutureDate(makeDate(20000))).to.be.true;
      });
    });
    context('less than the tolerance', function(){
      it('should return false', function(){
        expect(isFutureDate(makeDate(10))).to.be.false;
        expect(isFutureDate(makeDate(500))).to.be.false;
        expect(isFutureDate(makeDate(999))).to.be.false;
      });
    });
  });
});
