'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium-native');

module.exports = function createHash({ itemToHash }){
  const hash = Buffer.alloc(sodium.crypto_hash_sha256_BYTES);
  sodium.crypto_hash_sha256(hash, Buffer.from(itemToHash));
  return b64.encode(hash);
};
