'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = async function createEntity(){
  const registerResponse = await this.DIDClient.registerRequest();

  if (!registerResponse.success || registerResponse.error){
    throw new Error(`failed to register new DID: ${registerResponse.error}`);
  }
  const registerConfirmResponse = await this.DIDClient.registerConfirm(
    registerResponse.entity,
    registerResponse.confirmable,
  );

  if (registerResponse.confirmable.id !== registerConfirmResponse.id) {
    throw new Error('failed to confirm redistration of new DID');
  }

  const secret = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
  sodium.randombytes(secret);

  return {
    did: registerResponse.confirmable.id,
    signingPublicKey: registerResponse.entity.signingPublicKey,
    signingPrivateKey: registerResponse.entity.signingPrivateKey,
    encryptingPublicKey: registerResponse.entity.encryptingPublicKey,
    encryptingPrivateKey: registerResponse.entity.encryptingPrivateKey,
    registrationSecret: registerResponse.entity.registrationSecret,
    secret: b64.encode(secret),
  };
};
