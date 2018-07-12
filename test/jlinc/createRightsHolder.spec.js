'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.createRightsHolder', function() {
  it('should create a unique publicKey, privateKey and secret', function() {
    expect( JLINC.createRightsHolder() ).to.be.aJlincEntity();
    const a = JLINC.createRightsHolder();
    const b = JLINC.createRightsHolder();
    expect(a.publicKey).to.not.equal(b.publicKey);
    expect(a.privateKey).to.not.equal(b.privateKey);
    expect(a.secret).to.not.equal(b.secret);
  });
});
