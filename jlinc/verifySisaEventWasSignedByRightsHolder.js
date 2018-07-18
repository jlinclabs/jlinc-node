'use strict';

module.exports = function verifySisaEventWasSignedByRightsHolder({ sisaEvent, rightsHolderId }) {
  const { InvalidSignatureError, SisaEventVerificationError } = this;

  if (!sisaEvent) throw new Error('sisaEvent is required');
  if (!rightsHolderId) throw new Error('rightsHolderId is required');

  try{
    this.validateSignature({
      itemSigned: sisaEvent.eventJwt,
      signature: sisaEvent.audit.rightsHolderSig,
      publicKey: rightsHolderId,
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new SisaEventVerificationError('sisaOffering is not from the given dataCustodian');
    throw error;
  }

};
