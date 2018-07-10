'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = function createHash({ itemToHash }){
  return b64.encode(
    sodium.crypto_hash_sha256(
      Buffer.from(itemToHash)
    )
  );
};
