'use strict';

const sodium = require('sodium-native');
const b64 = require('urlsafe-base64');

module.exports = function verifySignature({ itemSigned, signature, publicKey }){
  if (!itemSigned) throw new Error('itemSigned is required');
  if (!signature) throw new Error('signature is required');
  if (!publicKey) throw new Error('publicKey is required');
  const { InvalidSignatureError, InvalidKeyError } = this;

  const sig = b64.decode(signature);
  if (sig.length !== sodium.crypto_sign_BYTES) {
    throw new InvalidSignatureError('invalid signature');
  }
  const pk = b64.decode(publicKey);
  if (pk.length !== sodium.crypto_sign_PUBLICKEYBYTES) {
    throw new InvalidKeyError('invalid public key');;
  }

  const hash = Buffer.alloc(sodium.crypto_hash_sha256_BYTES);
  sodium.crypto_hash_sha256(hash, Buffer.from(itemSigned));
  const success = sodium.crypto_sign_verify_detached(
    b64.decode(signature),
    hash,
    b64.decode(publicKey)
  );

  if (!success) throw new InvalidSignatureError('invalid signature');
  return true;
};
