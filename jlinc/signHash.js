'use strict';

const sodium = require('sodium-native');
const b64 = require('urlsafe-base64');

module.exports = function signHash({ hashToSign, privateKey }){
  const signature = Buffer.alloc(sodium.crypto_sign_BYTES);
  sodium.crypto_sign_detached(
    signature,
    b64.decode(hashToSign),
    b64.decode(privateKey),
  );
  return b64.encode(signature);
};
