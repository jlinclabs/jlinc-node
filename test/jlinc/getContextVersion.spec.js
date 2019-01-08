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
    it('should return a number', function() {
      expect(()=>{
        JLINC.getContextVersion('https://protocol.jlinc.org/context/jlinc-v3.jsonld');
      }).to.throw('invalid @context version number: 3');

      expect(()=>{
        JLINC.getContextVersion('https://protocol.jlinc.org/context/jlinc-v4.jsonld');
      }).to.throw('invalid @context version number: 4');

      expect(()=>{
        JLINC.getContextVersion('https://protocol.jlinc.org/context/jlinc-v5.jsonld');
      }).to.throw('invalid @context version number: 5');

      expect(()=>{
        JLINC.getContextVersion('https://protocol.jlinc.org/context/jlinc-v6.jsonld');
      }).to.throw('invalid @context version number: 6');

      expect(
        JLINC.getContextVersion('https://protocol.jlinc.org/context/jlinc-v7.jsonld')
      ).to.equal(7);
    });
  });

});
