'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function verifySignature({ itemSigned, signature, publicKey }){
  const { InvalidSignatureError } = this;
  const invalidSignatureError = new InvalidSignatureError('invalid signature');

  const decrypted = sodium.crypto_sign_open(b64.decode(signature), b64.decode(publicKey));
  if (!decrypted) throw invalidSignatureError;

  const hash = sodium.crypto_hash_sha256(Buffer.from(itemSigned));
  if (hash.length !== decrypted.length) throw invalidSignatureError;

  if (sodium.memcmp(hash, decrypted, hash.length) !== 0) throw invalidSignatureError;

  return true;
};
