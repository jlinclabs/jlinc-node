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
  it('should be "https://sisa.jlinc.org/v1/3b39160c2b9ae7b2ef81c3311c7924f1c4d4fa9ca47cfe7c840c9852b50d68d5"', function(){
    expect(JLINC.defaultAgreementURI).to.equal('https://sisa.jlinc.org/v1/3b39160c2b9ae7b2ef81c3311c7924f1c4d4fa9ca47cfe7c840c9852b50d68d5');
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
