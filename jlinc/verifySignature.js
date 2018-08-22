'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function verifySignature({ itemSigned, signature, publicKey, contextUrl }){
  if (!itemSigned) throw new Error('itemSigned is required');
  if (!signature) throw new Error('signature is required');
  if (!publicKey) throw new Error('publicKey is required');
  if (!contextUrl) throw new Error('contextUrl is required');
  const { InvalidSignatureError, InvalidPublicKeyError } = this;
  const invalidSignatureError = new InvalidSignatureError('invalid signature');
  if (this.getContextVersion(contextUrl) < 6) {

    const decrypted = sodium.crypto_sign_open(b64.decode(signature), b64.decode(publicKey));
    if (!decrypted) throw invalidSignatureError;

    const hash = sodium.crypto_hash_sha256(Buffer.from(itemSigned));
    if (hash.length !== decrypted.length) throw invalidSignatureError;

    if (sodium.memcmp(hash, decrypted, hash.length) !== 0) throw invalidSignatureError;
  } else {
    const invalidPublicKeyError = new InvalidPublicKeyError('invalid public key');

    const hash = sodium.crypto_hash_sha256(Buffer.from(itemSigned));

    let sig = b64.decode(signature);
    if (sig.length !== sodium.crypto_sign_BYTES) {
      throw invalidSignatureError;
    }
    let pk = b64.decode(publicKey);
    if (pk.length !== sodium.crypto_sign_PUBLICKEYBYTES) {
      throw invalidPublicKeyError;
    }

    if (!sodium.crypto_sign_verify_detached(sig, hash, pk)) {
      throw invalidSignatureError;
    }
  }
  return true;
};
