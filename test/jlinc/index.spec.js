'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.version', function() {
  it('should be 0.0.1', function(){
    expect(JLINC.version).to.equal('0.0.1');
  });
});

describe('JLINC.contextUrl', function() {
  it('should be "https://context.jlinc.org/v05/jlinc.jsonld"', function(){
    expect(JLINC.contextUrl).to.equal('https://protocol.jlinc.org/context/jlinc-v5.jsonld');
  });
});

describe('JLINC.defaultAgreementURI', function() {
  it('should be "https://sisa.jlinc.org/v1/34020c5fb59ebc6507ebca4eb38090aec1097c6aec8d2ae2250ddfed4b4aa63c"', function(){
    expect(JLINC.defaultAgreementURI).to.equal('https://sisa.jlinc.org/v1/34020c5fb59ebc6507ebca4eb38090aec1097c6aec8d2ae2250ddfed4b4aa63c');
  });
});

describe('JLINC.sisaEventTypes', function() {
  it('should be a frozen array', function(){
    expect(JLINC.sisaEventTypes).to.deep.equal([
      'dataEvent',
      'permissionEvent',
      'statusEvent',
    ]);
    expect(Object.isFrozen(JLINC.sisaEventTypes)).to.be.true;

    expect(() => {
      JLINC.sisaEventTypes.push('dog');
    }).to.throw('object is not extensible');
  });
});
