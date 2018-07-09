'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

require('../setup');

describe('JLINC.signItem', function() {

  it('should sign the given item with the given secretKey', function(){
    const entity = JLINC.createEntity();
    const itemToSign = 'people be swimming!';

    const signature = JLINC.signItem({ itemToSign, secretKey: entity.secretKey });
    expect(signature).to.aBase64EncodedString();

    const decrypted = sodium.crypto_sign_open(b64.decode(signature), b64.decode(entity.id));
    expect(decrypted).to.exist;

    const hashedItemToSign = sodium.crypto_hash_sha256(Buffer.from(itemToSign));
    expect(decrypted).to.have.lengthOf(hashedItemToSign.length);
    expect( sodium.memcmp(hashedItemToSign, decrypted, hashedItemToSign.length) ).to.equal(0);
  });

});
