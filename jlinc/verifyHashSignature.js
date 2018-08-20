'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function verifyHashSignature({ signed, signature, publicKey }){

  const { InvalidSignatureError, InvalidPublicKeyError } = this;
  const invalidSignatureError = new InvalidSignatureError('invalid signature');
  const invalidPublicKeyError = new InvalidPublicKeyError('invalid public key');

  const signedHash = b64.decode(signed);

  let sig = b64.decode(signature);
  if (sig.length !== sodium.crypto_sign_BYTES) {
    throw invalidSignatureError;
  }
  let pk = b64.decode(publicKey);
  if (pk.length !== sodium.crypto_sign_PUBLICKEYBYTES) {
    throw invalidPublicKeyError;
  }

  if (!sodium.crypto_sign_verify_detached(sig, signedHash, pk)) {
    throw invalidSignatureError;
  }
  return true;
};
