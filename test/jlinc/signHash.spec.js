'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

const JLINC = require('../../jlinc');

describe('JLINC.signHash', function() {

  it('should sign the given hash with the given privateKey', function(){
    const rightsHolder = JLINC.createRightsHolder();
    const hashToSign = b64.encode(sodium.crypto_hash_sha256(Buffer.from("What's the good of Mercator's North Poles and Equators")));

    const signature = JLINC.signHash({ hashToSign, privateKey: rightsHolder.privateKey });
    expect(signature).to.aBase64EncodedString();

    expect ( sodium.crypto_sign_verify_detached(
      b64.decode(signature),
      b64.decode(hashToSign),
      b64.decode(rightsHolder.publicKey)
    ) ).to.be.true;
  });

});
