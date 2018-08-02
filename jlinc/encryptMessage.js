'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function encryptMessage({ message, senderPrivateKey, recipientPublicKey }){
  const { MessageEncryptionError } = this;

  if (!message) throw new Error('message is required');
  if (!senderPrivateKey) throw new Error('senderPrivateKey is required');
  if (!recipientPublicKey) throw new Error('recipientPublicKey is required');

  const nonce = Buffer.alloc(sodium.crypto_box_NONCEBYTES);
  sodium.randombytes(nonce);

  let payload;
  try{
    payload = sodium.crypto_box(
      Buffer.from(message),
      nonce,
      sodium.crypto_sign_ed25519_pk_to_curve25519(b64.decode(recipientPublicKey)),
      sodium.crypto_sign_ed25519_sk_to_curve25519(b64.decode(senderPrivateKey)),
    );
  }catch(error){
    throw new MessageEncryptionError('failed to encrypt message');
  }
  if (!payload) throw new MessageEncryptionError('failed to encrypt message');

  return {
    payload: b64.encode(payload),
    nonce: b64.encode(nonce),
  };
};
