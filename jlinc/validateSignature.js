'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function validateSignature({ itemSigned, signature, publicKey }){
  const decrypted = sodium.crypto_sign_open(b64.decode(signature), b64.decode(publicKey));
  if (!decrypted) return false;

  const hash = sodium.crypto_hash_sha256(Buffer.from(itemSigned));
  if (hash.length !== decrypted.length) return false;

  if (sodium.memcmp(hash, decrypted, hash.length) !== 0) return false;

  return true;
};
