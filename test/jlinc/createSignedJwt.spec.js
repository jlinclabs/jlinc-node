'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.createSignedJwt', function() {

  it('should create a signed jwt', function(){
    const jwt = JLINC.createSignedJwt({
      itemToSign: { size: 'uuge' },
      secret: '12345',
    });
    expect(jwt).to.be.aJwt();
    expect(jwt).to.be.aJwtSignedWith('12345');
    expect(jwt).to.be.aJwtEncodingOf({ size: 'uuge' });
    expect(JLINC.decodeJwt({ jwt })).to.deep.equal({ size: 'uuge' });
  });

});
