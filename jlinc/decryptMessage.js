'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function decryptMessage({ encryptedMessage, senderPublicKey, recipientPrivateKey }){
  const { MessageDecryptionError } = this;

  if (!encryptedMessage) throw new Error('encryptedMessage is required');
  if (typeof encryptedMessage !== 'object') throw new Error('encryptedMessage must be typeof object');
  if (!encryptedMessage.payload) throw new Error('encryptedMessage.payload is required');
  if (!encryptedMessage.nonce) throw new Error('encryptedMessage.nonce is required');
  if (!senderPublicKey) throw new Error('senderPublicKey is required');
  if (!recipientPrivateKey) throw new Error('recipientPrivateKey is required');

  let decryptedMessage;
  try{
    decryptedMessage = sodium.crypto_box_open(
      b64.decode(encryptedMessage.payload),
      b64.decode(encryptedMessage.nonce),
      sodium.crypto_sign_ed25519_pk_to_curve25519(b64.decode(senderPublicKey)),
      sodium.crypto_sign_ed25519_sk_to_curve25519(b64.decode(recipientPrivateKey)),
    );
  }catch(error){
    throw new MessageDecryptionError('failed to decrypt message');
  }
  if (!decryptedMessage) throw new MessageDecryptionError('failed to decrypt message');

  return decryptedMessage.toString();
};
