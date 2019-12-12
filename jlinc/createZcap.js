'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function createZcap({ invoker, target }) {
  // invoker is rightsHolder or dataCustodian data including decrypted private key
  if (!invoker)                   throw new Error('invoker is required');
  if (!invoker.did)               throw new Error('invoker.did is required');
  if (!invoker.secret)            throw new Error('invoker.secret is required');
  if (!invoker.signingPrivateKey) throw new Error('invoker.signingPrivateKey is required');
  if (!invoker.signingPublicKey)  throw new Error('invoker.signingPublicKey is required');

  const payload = JSON.stringify({
    '@context': 'https://protocol.jlinc.org/zcap/v1.jsonld',
    '@id': `urn:uuid:${uuidv4()}`,
    target,
    invoker: invoker.did,
    signingPublicKey: invoker.signingPublicKey,
    action: 'authorization',
    caveat: [{type: 'useOnce'}],
  });
  const signature = this.signItem({ itemToSign: payload, privateKey:invoker.signingPrivateKey });

  const capability = {capability: payload};
  capability.proof = {
    type: 'ed25519',
    proofPurpose: 'capabilityDelegation',
    created: this.now(),
    creator: invoker.did,
    verificationMethod: `${invoker.did}#signing`,
    signatureValue: signature};

  return this.createSignedJwt({ itemToSign: capability, secret: invoker.secret });
};
