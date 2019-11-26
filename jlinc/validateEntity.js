'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

module.exports = function validateEntity({ entity }) {
  const { InvalidEntityError } = this;

  if (typeof entity !== 'object')
    throw new InvalidEntityError('entity must be of type object');

  [
    'did',
    'signingPublicKey',
    'signingPrivateKey',
    'encryptingPublicKey',
    'encryptingPrivateKey',
    'secret',
    'registrationSecret',
  ].forEach(key => {
    if (typeof entity[key] !== 'string')
      throw new InvalidEntityError(`entity.${key} must be of type string`);
  });

  if (entity.did.length < 32)
    throw new InvalidEntityError('entity.did must be longer than 32 characters');

  Object.entries({
    signingPublicKey: 43,
    signingPrivateKey: 86,
    encryptingPublicKey: 43,
    encryptingPrivateKey: 43,
    secret: 32,
    registrationSecret: 64,
  }).forEach(([key, length]) => {
    if (entity[key].length !== length)
      throw new InvalidEntityError(`entity.${key} must be of length ${length}`);
  });

  [
    'signingPublicKey',
    'signingPrivateKey',
    'encryptingPublicKey',
    'encryptingPrivateKey',
    'secret',
    'registrationSecret',
  ].forEach(key => {
    if (!isBase64(entity[key]))
      throw new InvalidEntityError(`entity.${key} must be base64 encoded`);
  });

  if (!isSigningKeypair(entity.signingPublicKey, entity.signingPrivateKey))
    throw new InvalidEntityError('entity.signingPublicKey and entity.signingPrivateKey are not a valid signing keypair');

  if (!isEncryptingKeypair(entity.encryptingPublicKey, entity.encryptingPrivateKey))
    throw new InvalidEntityError('entity.encryptingPublicKey and entity.encryptingPrivateKey are not a valid encrypting keypair');

  return true;
};

function isBase64(string){
  return typeof string === 'string' && /^[A-Za-z0-9\-_]+$/.test(string);
}

function isSigningKeypair(publicKey, privateKey){
  const itemToSign = `${Math.random()}`;
  const signature = sodium.crypto_sign(
    Buffer.from(itemToSign, 'utf8'),
    b64.decode(privateKey),
  );
  const itemSigned = sodium.crypto_sign_open(
    signature,
    b64.decode(publicKey)
  );
  return itemSigned && itemSigned.toString() === itemToSign;
}

function isEncryptingKeypair(b64EncodedPublicKey, b64EncodedPrivateKey){
  const senderPublicKey = b64.decode(b64EncodedPublicKey);
  const senderPrivateKey = b64.decode(b64EncodedPrivateKey);

  const {
    publicKey: recieverPublicKey,
    secretKey: recieverPrivateKey,
  } = sodium.crypto_box_keypair();

  const secret = Buffer.allocUnsafe(sodium.crypto_box_NONCEBYTES);
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

  return decryptedItem && decryptedItem.toString() === itemToEncrypt.toString();
}
