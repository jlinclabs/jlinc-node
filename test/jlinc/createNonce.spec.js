'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.createNonce', function() {

  it('should create a 64 character, hex encoded nonce', function(){
    const nonce = JLINC.createNonce();
    expect(nonce).to.be.a('string');
    expect(nonce).to.have.lengthOf(64);
    expect(nonce).to.match(/^[0-9a-f]{64}$/);
  });

  it('should create a collision resistant nonce', function(){
    const uniqueNonces = new Set();
    Array(1000).fill().forEach(() => { uniqueNonces.add(JLINC.createNonce()); });
    expect(uniqueNonces.size).to.equal(1000);
  });

});
