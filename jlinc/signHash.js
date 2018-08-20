'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function signHash({ hashToSign, privateKey }){
  return b64.encode(
    sodium.crypto_sign_detached(b64.decode(hashToSign), b64.decode(privateKey))
  );
};
