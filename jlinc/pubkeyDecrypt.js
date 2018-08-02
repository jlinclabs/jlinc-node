'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function pubkeyDecrypt({ itemToDecrypt, nonce, senderPublicKey, recipientPrivateKey }){
  // itemToDecrypt is the encrypted item
  // nonce is the nonce value generated during encryption
  // senderPublicKey is a rightsHolderId or a dataCustodianId of the sender
  // recipientPrivateKey is the recipient's private key -- either a Buffer or a base64 encoded Buffer
  const { DecryptError } = this;

  if (typeof recipientPrivateKey === 'string') {
    recipientPrivateKey = b64.decode(recipientPrivateKey);
  }

  // convert signing keys to encrypting keys
  let senderPub = sodium.crypto_sign_ed25519_pk_to_curve25519(b64.decode(senderPublicKey));
  let recipientPriv = sodium.crypto_sign_ed25519_sk_to_curve25519(recipientPrivateKey);

  let plainMsg = sodium.crypto_box_open(b64.decode(itemToDecrypt), b64.decode(nonce), senderPub, recipientPriv);
  if( !plainMsg ) {
    throw new DecryptError('pubkeyDecrypt failed');
  }

  return plainMsg.toString();
};
