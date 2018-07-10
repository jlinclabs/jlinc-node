'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.createSignedJwt', function() {

  it('should create a signed jwt', function(){
    const jwt = JLINC.createSignedJwt({
      itemToSign: { size: 'uuge', iat: 55 },
      secret: '12345',
    });
    expect(jwt).to.be.aJWT();
    expect(jwt).to.be.aJWTSignedWith('12345');
    expect(jwt).to.be.aJWTEncodingOf({ size: 'uuge', iat: 55 });
  });

});
