'use strict';

module.exports = function validateEntity({ entity }){
  if (typeof entity !== 'object')
    throw new Error('entity must be of type object');

  // validating entity.publicKey
  if (!('publicKey' in entity))
    throw new Error('entity must have key "publicKey"');

  if (typeof entity.publicKey !== 'string')
    throw new Error('entity.publicKey must be of type string');

  if (entity.publicKey.length !== 43)
    throw new Error('entity.publicKey must be of length 43');


  // validating entity.privateKey
  if (!('privateKey' in entity))
    throw new Error('entity must have key "privateKey"');

  if (typeof entity.privateKey !== 'string')
    throw new Error('entity.privateKey must be of type string');

  if (entity.privateKey.length !== 86)
    throw new Error('entity.privateKey must be of length 86');


  // validating entity.secret
  if (!('secret' in entity))
    throw new Error('entity must have key "secret"');

  if (typeof entity.secret !== 'string')
    throw new Error('entity.secret must be of type string');

  if (entity.secret.length !== 32)
    throw new Error('entity.secret must be of length 32');

  const itemToSign = this.createNonce();
  const signature = this.signItem({
    itemToSign,
    privateKey: entity.privateKey,
  });

  return this.validateSignature({
    itemSigned: itemToSign,
    signature,
    publicKey: entity.publicKey,
  });
};
