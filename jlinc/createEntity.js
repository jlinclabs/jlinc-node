'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium-native');

module.exports = async function createEntity(){
  const entity = await this.DIDClient.register();

  const secret = Buffer.alloc(sodium.crypto_secretbox_NONCEBYTES);
  sodium.randombytes_buf(secret);

  return {
    ...entity,
    secret: b64.encode(secret),
  };
};
