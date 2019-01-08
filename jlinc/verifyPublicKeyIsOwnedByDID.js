'use strict';

module.exports = async function verifyPublicKeyIsOwnedByDID({ did, publicKey }){
  const { DIDVerificationError } = this;
  if (!did) throw new Error('did is required');
  if (!publicKey) throw new Error('publicKey is required');

  let didDocument;
  try{
    didDocument = await this.DIDClient.resolve({ did });
  }catch(error){
    throw new DIDVerificationError(`unable to verify public key is owned by DID: ${error.message}`);
  }
  const verified = didDocument.publicKey.some(record =>
    record.publicKeyBase64 === publicKey
  );
  if (verified) return true;
  throw new DIDVerificationError('publicKey is not owned by DID');
};
