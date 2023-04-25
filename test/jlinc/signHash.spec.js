'use strict';

const sodium = require('sodium-native');
const b64 = require('urlsafe-base64');

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.signHash', function() {
  withDidServer();

  it('should sign the given hash with the given privateKey', async function(){
    const rightsHolder = await JLINC.createRightsHolder();
    const hashBuffer = Buffer.alloc(sodium.crypto_hash_sha256_BYTES);
    sodium.crypto_hash_sha256(
      hashBuffer,
      Buffer.from("What's the good of Mercator's North Poles and Equators")
    );
    const hashToSign = b64.encode(hashBuffer);

    const signature = JLINC.signHash({
      hashToSign,
      privateKey: rightsHolder.signingPrivateKey,
    });
    expect(signature).to.aBase64EncodedString();

    expect(
      sodium.crypto_sign_verify_detached(
        b64.decode(signature),
        b64.decode(hashToSign),
        b64.decode(rightsHolder.signingPublicKey)
      )
    ).to.be.true;
  });

});
