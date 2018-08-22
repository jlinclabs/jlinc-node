'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.getContextVersion', function() {

  context('when given no arguments', function() {
    it('should throw the error "@context must be of type string"', function() {
      expect(() => {
        JLINC.getContextVersion();
      }).to.throw('@context must be of type string');
    });
  });

  context('when given an invalid context', function() {
    it('should throw the error "invalid @context"', function() {
      expect(() => {
        JLINC.getContextVersion('xxxx');
      }).to.throw('invalid @context');
    });
  });

  context('when given a valid context', function() {
    context('that is version 5', function() {
      it('should return 5', function() {
        expect(
          JLINC.getContextVersion('https://protocol.jlinc.org/context/jlinc-v5.jsonld')
        ).to.equal(5);
      });
    });
    context('that is version 3', function() {
      it('should return 6', function() {
        expect(
          JLINC.getContextVersion('https://protocol.jlinc.org/context/jlinc-v6.jsonld')
        ).to.equal(6);
      });
    });
    context('that is version 3', function() {
      it('should return 3', function() {
        expect(()=>{
          JLINC.getContextVersion('https://protocol.jlinc.org/context/jlinc-v3.jsonld');
        }).to.throw('invalid @context version number: 3');
      });
    });
  });

});
