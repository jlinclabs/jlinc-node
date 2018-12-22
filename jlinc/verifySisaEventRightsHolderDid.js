'use strict';

module.exports = async function verifySisaEventRightsHolderDid({ sisaEvent, rightsHolderDid }) {
  const { DIDVerificationError, SisaEventVerificationError } = this;

  if (!sisaEvent) throw new Error('sisaEvent is required');
  if (!rightsHolderDid) throw new Error('rightsHolderDid is required');

  if (rightsHolderDid !== sisaEvent.audit.rightsHolderDid)
    throw new SisaEventVerificationError('sisaEvent.audit.rightsHolderDid does not match given rightsHolderDid');

  try{
    await this.verifyPublicKeyIsOwnedByDID({
      did: sisaEvent.audit.rightsHolderDid,
      publicKey: sisaEvent.audit.rightsHolderPublicKey,
    });
  }catch(error){
    if (error instanceof DIDVerificationError)
      throw new SisaEventVerificationError('sisaEvent is not from the rightsHolder');
    throw error;
  }

  return true;
};
