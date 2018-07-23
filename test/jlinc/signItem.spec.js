'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

const JLINC = require('../../jlinc');

describe('JLINC.signItem', function() {

  it('should sign the given item with the given privateKey', function(){
    const rightsHolder = JLINC.createRightsHolder();
    const itemToSign = 'people be swimming!';

    const signature = JLINC.signItem({ itemToSign, privateKey: rightsHolder.privateKey });
    expect(signature).to.aBase64EncodedString();

    const decrypted = sodium.crypto_sign_open(b64.decode(signature), b64.decode(rightsHolder.publicKey));
    expect(decrypted).to.exist;

    const hashedItemToSign = sodium.crypto_hash_sha256(Buffer.from(itemToSign));
    expect(decrypted).to.have.lengthOf(hashedItemToSign.length);
    expect( sodium.memcmp(hashedItemToSign, decrypted, hashedItemToSign.length) ).to.equal(0);
  });

});
