'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = function createEntity(){
  const { publicKey, secretKey } = sodium.crypto_sign_keypair();
  const nonce = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
  sodium.randombytes(nonce);
  return {
    id: b64.encode(publicKey),
    secretKey: b64.encode(secretKey),
    nonce: b64.encode(nonce),
  };
};
