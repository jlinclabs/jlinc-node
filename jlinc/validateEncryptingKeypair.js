'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function validateEncryptingKeypair({ publicKey, privateKey }) {
  const { InvalidKeyError } = this;

  try{
    const senderPublicKey = b64.decode(publicKey);
    const senderPrivateKey = b64.decode(privateKey);

    const {
      publicKey: recieverPublicKey,
      secretKey: recieverPrivateKey,
    } = sodium.crypto_box_keypair();

    const secret = Buffer.alloc(sodium.crypto_box_NONCEBYTES);
    sodium.randombytes(secret);

    const itemToEncrypt = Buffer.from(`${Math.random()}`, 'utf-8');

    const encryptedItem = sodium.crypto_box(
      itemToEncrypt,
      secret,
      recieverPublicKey,
      senderPrivateKey,
    );

    if (!encryptedItem) return false;

    const decryptedItem = sodium.crypto_box_open(
      encryptedItem,
      secret,
      senderPublicKey,
      recieverPrivateKey,
    );

    if (decryptedItem && decryptedItem.toString() === itemToEncrypt.toString()){
      return true;
    }
    throw new Error;
  }catch(error){
    throw new InvalidKeyError(`invalid encrypting keypair: ${error.message}`);
  }
};
