'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.createHash', function() {

  it('should generate a verifyable hash of the given itemToHash', function(){
    const randomString = JLINC.createNonce();

    expect(
      JLINC.createHash({ itemToHash: randomString })
    ).to.be.a('string');

    expect(
      JLINC.createHash({ itemToHash: randomString })
    ).to.equal(
      JLINC.createHash({ itemToHash: randomString })
    );

    expect(
      JLINC.createHash({ itemToHash: 'i love to eat veggies!' })
    ).to.equal('xS3uHK3RTsSMa_0V11toUxVvtM7MA5qyCi2Byr5g-dA');
  });

});
