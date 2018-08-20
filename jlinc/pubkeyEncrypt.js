'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function pubkeyEncrypt({ itemToEncrypt, recipientPublicKey, senderPrivateKey }){
  // itemToEncrypt should be a string (JSON.stringify objects for this purpose)
  // recipientPublicKey is a rightsHolderId or a dataCustodianId of the recipient
  // senderPrivateKey is the sender's private key - either a Buffer or a base64 encoded Buffer
  const { EncryptError } = this;

  let nonce = Buffer.alloc(sodium.crypto_box_NONCEBYTES);
  sodium.randombytes(nonce);

  if (typeof senderPrivateKey === 'string') {
    senderPrivateKey = b64.decode(senderPrivateKey);
  }

  // convert signing keys to encrypting keys
  let senderPriv = sodium.crypto_sign_ed25519_sk_to_curve25519(senderPrivateKey);
  let recipientPub = sodium.crypto_sign_ed25519_pk_to_curve25519(b64.decode(recipientPublicKey));

  let cipherMsg = sodium.crypto_box(Buffer.from(itemToEncrypt), nonce, recipientPub, senderPriv);
  if( !cipherMsg ) {
    throw new EncryptError('pubkeyEncrypt failed');
  }

  return {cipherMsg: b64.encode(cipherMsg), nonce: b64.encode(nonce)};

};
