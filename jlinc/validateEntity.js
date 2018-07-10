'use strict';

module.exports = function validateEntity({ entity }){
  if (typeof entity !== 'object')
    throw new Error('entity must be of type object');

  // validating entity.id
  if (!('id' in entity))
    throw new Error('entity must have key "id"');

  if (typeof entity.id !== 'string')
    throw new Error('entity.id must be of type string');

  if (entity.id.length !== 43)
    throw new Error('entity.id must be of length 43');


  // validating entity.secretKey
  if (!('secretKey' in entity))
    throw new Error('entity must have key "secretKey"');

  if (typeof entity.secretKey !== 'string')
    throw new Error('entity.secretKey must be of type string');

  if (entity.secretKey.length !== 86)
    throw new Error('entity.secretKey must be of length 86');


  // validating entity.nonce
  if (!('nonce' in entity))
    throw new Error('entity must have key "nonce"');

  if (typeof entity.nonce !== 'string')
    throw new Error('entity.nonce must be of type string');

  if (entity.nonce.length !== 32)
    throw new Error('entity.nonce must be of length 32');

  const itemToSign = this.createNonce();
  const signature = this.signItem({
    itemToSign,
    secretKey: entity.secretKey,
  });

  return this.validateSignature({
    itemSigned: itemToSign,
    signature,
    publicKey: entity.id,
  });
};
