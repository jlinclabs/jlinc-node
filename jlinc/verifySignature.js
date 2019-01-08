'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function verifySignature({ itemSigned, signature, publicKey }){
  if (!itemSigned) throw new Error('itemSigned is required');
  if (!signature) throw new Error('signature is required');
  if (!publicKey) throw new Error('publicKey is required');
  const { InvalidSignatureError, InvalidPublicKeyError } = this;

  const hash = sodium.crypto_hash_sha256(Buffer.from(itemSigned));

  const sig = b64.decode(signature);
  if (sig.length !== sodium.crypto_sign_BYTES) {
    throw new InvalidSignatureError('invalid signature');
  }
  const pk = b64.decode(publicKey);
  if (pk.length !== sodium.crypto_sign_PUBLICKEYBYTES) {
    throw new InvalidPublicKeyError('invalid public key');;
  }

  if (!sodium.crypto_sign_verify_detached(sig, hash, pk)) {
    throw new InvalidSignatureError('invalid signature');
  }
  return true;
};
