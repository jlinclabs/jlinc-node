'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function validateSigningKeypair({ publicKey, privateKey }) {
  const { InvalidKeyError } = this;

  try{
    const itemToSign = `${Math.random()}`;
    const signature = sodium.crypto_sign(
      Buffer.from(itemToSign, 'utf8'),
      b64.decode(privateKey),
    );
    const itemSigned = sodium.crypto_sign_open(
      signature,
      b64.decode(publicKey)
    );
    if (itemSigned && itemSigned.toString() === itemToSign) return true;
    throw new Error;
  }catch(error){
    throw new InvalidKeyError(`invalid signing keypair: ${error.message}`);
  }
};
