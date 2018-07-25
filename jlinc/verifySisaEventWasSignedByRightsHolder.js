'use strict';

module.exports = function verifySisaEventWasSignedByRightsHolder({ sisaEvent, rightsHolderId }) {
  const { InvalidSignatureError, SisaEventVerificationError } = this;

  if (!sisaEvent) throw new Error('sisaEvent is required');
  if (!rightsHolderId) throw new Error('rightsHolderId is required');

  try{
    this.verifySignature({
      itemSigned: sisaEvent.audit.eventId,
      signature: sisaEvent.audit.rightsHolderSig,
      publicKey: rightsHolderId,
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new SisaEventVerificationError('sisaOffering is signed by the given rightsHolder');
    throw error;
  }

  return true;
};
