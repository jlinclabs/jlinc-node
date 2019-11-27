'use strict';

module.exports = function validateEntity({ entity }) {
  const { InvalidEntityError, InvalidKeyError } = this;

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

  try{
    this.validateSigningKeypair({
      publicKey: entity.signingPublicKey,
      privateKey: entity.signingPrivateKey,
    });
  }catch(error){
    if (error instanceof InvalidKeyError){
      throw new InvalidEntityError('entity.signingPublicKey and entity.signingPrivateKey are not a valid signing keypair');
    }
    throw error;
  }

  try{
    this.validateEncryptingKeypair({
      publicKey: entity.encryptingPublicKey,
      privateKey: entity.encryptingPrivateKey,
    });
  }catch(error){
    if (error instanceof InvalidKeyError){
      throw new InvalidEntityError('entity.encryptingPublicKey and entity.encryptingPrivateKey are not a valid encrypting keypair');
    }
    throw error;
  }

  return true;
};

function isBase64(string){
  return typeof string === 'string' && /^[A-Za-z0-9\-_]+$/.test(string);
}
