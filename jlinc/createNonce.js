'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = function createNonce(options = {}) {
  const nonce = new Buffer(32);
  sodium.randombytes(nonce);
  return nonce.toString('hex');
};
