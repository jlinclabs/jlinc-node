'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.createEntity', function() {
  it('should create a unique publicKey, privateKey and secret', function() {
    expect( JLINC.createEntity() ).to.be.aJlincEntity();
    const a = JLINC.createEntity();
    const b = JLINC.createEntity();
    expect(a.publicKey).to.not.equal(b.publicKey);
    expect(a.privateKey).to.not.equal(b.privateKey);
    expect(a.secret).to.not.equal(b.secret);
  });
});
