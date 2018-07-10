'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = function createEntity(){
  const { publicKey, secretKey } = sodium.crypto_sign_keypair();
  const secret = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
  sodium.randombytes(secret);
  return {
    publicKey: b64.encode(publicKey),
    privateKey: b64.encode(secretKey),
    secret: b64.encode(secret),
  };
};
