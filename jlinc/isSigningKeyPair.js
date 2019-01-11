'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function isSigningKeyPair({signingPublicKey, signingPrivateKey}) {
  if (!signingPublicKey) throw new Error('signingPublicKey required');
  if (!signingPrivateKey) throw new Error('signingPrivateKey required');
  if (typeof signingPublicKey !== 'string') throw new Error('signingPublicKey must be a string');
  if (typeof signingPrivateKey !== 'string') throw new Error('signingPrivateKey must be a string');

  const itemToSign = `${Math.random()} is my favorite number`;

  const signedItem = sodium.crypto_sign(
    Buffer.from(itemToSign, 'utf8'),
    b64.decode(signingPrivateKey),
  );

  if (!signedItem) throw new Error('invalid keypair: failed to sign');

  const decodedItem = sodium.crypto_sign_open(
    signedItem,
    b64.decode(signingPublicKey)
  );

  if (!decodedItem) throw new Error('invalid keypair: failed to decode signed item');

  if (decodedItem.toString() !== itemToSign) {
    throw new Error('decoded item does not match original');
  }

  return true;
};
