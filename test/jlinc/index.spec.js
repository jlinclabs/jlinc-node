'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.version', function() {
  it('should be 0.1.0', function(){
    expect(JLINC.version).to.equal('0.1.0');
  });
});

describe('JLINC.contextUrl', function() {
  it('should be in the correct format', function(){
    expect(JLINC.contextUrl).to.match(/^https:\/\/protocol\.jlinc\.org\/context\/jlinc\-v[\d]+\.jsonld$/);
  });
});

describe('JLINC.defaultAgreementURI', function() {
  it('should be in the correct format', function(){
    expect(JLINC.defaultAgreementURI).to.match(/^https:\/\/sisa\.jlinc\.org\/v[\d]+\/[a-f0-9]+$/);
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
