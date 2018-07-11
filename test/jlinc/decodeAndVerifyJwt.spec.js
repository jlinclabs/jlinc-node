'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.decodeAndVerifyJwt', function() {

  it('should decode and verify the given jwt', function(){
    const jwt = JLINC.createSignedJwt({
      itemToSign: { size: 'uuge', iat: 55 },
      secret: '12345',
    });

    expect(
      JLINC.decodeAndVerifyJwt({ jwt, secret: '12345' })
    ).to.deep.equal({ size: 'uuge', iat: 55 });

    expect(() => {
      JLINC.decodeAndVerifyJwt({ jwt, secret: '9875' });
    }).to.throw(JLINC.JWTVerificationError, 'unable to verify jsonwebtoken');
  });

});
