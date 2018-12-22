'use strict';

module.exports = async function verifyPublicKeyIsOwnedByDID({ did, publicKey }){
  const { DIDVerificationError } = this;
  if (!did) throw new Error('did is required');
  if (!publicKey) throw new Error('publicKey is required');

  const response = await this.DIDClient.resolve(did);
  if (!response.success) {
    const errorMessage = 'unable to verify public key is owned by DID';
    if (response.error) throw new DIDVerificationError(`${errorMessage}: ${response.error}`);
    if (response.status === 404) throw new DIDVerificationError(`${errorMessage}: DID not found`);
    throw new DIDVerificationError(`${errorMessage}: unknown error`);
  }
  const didDocument = response.resolved.did;
  const verified = didDocument.publicKey.some(record =>
    record.publicKeyBase64 === publicKey
  );
  if (verified) return true;
  throw new DIDVerificationError('publicKey is not owned by DID');
};
