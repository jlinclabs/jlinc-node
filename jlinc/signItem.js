'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function signItem({ itemToSign, privateKey }){
  return b64.encode(
    sodium.crypto_sign(
      sodium.crypto_hash_sha256(Buffer.from(itemToSign)),
      b64.decode(privateKey)
    )
  );
};
