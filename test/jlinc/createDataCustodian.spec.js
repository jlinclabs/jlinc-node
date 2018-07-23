'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.createDataCustodian', function() {
  it('should create a unique publicKey, privateKey and secret', function() {
    expect( JLINC.createDataCustodian() ).to.be.aJlincParty();
    const a = JLINC.createDataCustodian();
    const b = JLINC.createDataCustodian();
    expect(a.publicKey).to.not.equal(b.publicKey);
    expect(a.privateKey).to.not.equal(b.privateKey);
    expect(a.secret).to.not.equal(b.secret);
  });
});
