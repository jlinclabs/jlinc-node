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

    const hashedItemToSign = sodium.crypto_hash_sha256(Buffer.from(itemToSign));
    expect ( sodium.crypto_sign_verify_detached(b64.decode(signature), hashedItemToSign, b64.decode(rightsHolder.publicKey)) ).to.be.true;
  });

});
