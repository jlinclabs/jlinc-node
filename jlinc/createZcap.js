'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function createZcap({ invoker, target }) {
  // invoker is rightsHolder or dataCustodian data including decrypted private key
  if (!invoker)                   throw new Error('invoker is required');
  if (!invoker.did)               throw new Error('invoker.did is required');
  if (!invoker.secret)            throw new Error('invoker.secret is required');
  if (!invoker.signingPrivateKey) throw new Error('invoker.signingPrivateKey is required');
  if (!invoker.signingPublicKey)  throw new Error('invoker.signingPublicKey is required');

  let context = 'https://protocol.jlinc.org/zcap/v1.jsonld';
  let id = 'urn:uuid:' + uuidv4();
  let payloadObject = {'@context': context,'@id': id};
  payloadObject.target = target;
  payloadObject.invoker = invoker.did;
  payloadObject.action = 'authorization';
  payloadObject.caveat = [{type: 'useOnce'}];

  let payload = JSON.stringify(payloadObject);
  let signature = this.signItem({ itemToSign: payload, privateKey:invoker.signingPrivateKey });

  let capability = {capability: payload};
  capability.proof = {
    type: 'ed25519',
    proofPurpose: 'capabilityDelegation',
    created: this.now(),
    creator: invoker.did,
    signatureValue: signature};

  return this.createSignedJwt({ itemToSign: capability, secret: invoker.secret });
};
