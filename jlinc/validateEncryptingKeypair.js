'use strict';

const verifyEncryptingKeypair = require('jlinc-did-client/jlinc-did/verifyEncryptingKeypair');

module.exports = function validateEncryptingKeypair({ publicKey, privateKey }) {
  const { InvalidKeyError } = this;
  try{
    verifyEncryptingKeypair({
      encryptingPublicKey: publicKey,
      encryptingPrivateKey: privateKey,
    });
    return true;
  }catch(error){
    throw new InvalidKeyError(`invalid encrypting keypair: ${error.message}`);
  }
};
