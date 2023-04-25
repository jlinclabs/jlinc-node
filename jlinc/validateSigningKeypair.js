'use strict';

const verifySigningKeypair = require('jlinc-did-client/jlinc-did/verifySigningKeypair');

module.exports = function validateSigningKeypair({ publicKey, privateKey }) {
  const { InvalidKeyError } = this;

  try{
    verifySigningKeypair({
      signingPublicKey: publicKey,
      signingPrivateKey: privateKey,
    });
    return true;

  }catch(error){
    throw new InvalidKeyError(`invalid signing keypair: ${error.message}`);
  }
};
