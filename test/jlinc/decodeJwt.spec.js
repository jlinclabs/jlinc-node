'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.decodeJwt', function() {

  it('should decode and verify the given jwt', function(){
    const jwt = JLINC.createSignedJwt({
      itemToSign: { size: 'uuge' },
      secret: '12345',
    });

    expect( JLINC.decodeJwt({ jwt }) ).to.deep.equal({ size: 'uuge' });
  });

});
