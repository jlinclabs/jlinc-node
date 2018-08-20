'use strict';

module.exports = function verifySisaEventWasSignedByRightsHolder({ sisaEvent, rightsHolderId }) {
  const { InvalidSignatureError, SisaEventVerificationError } = this;

  if (!sisaEvent) throw new Error('sisaEvent is required');
  if (!rightsHolderId) throw new Error('rightsHolderId is required');

  if (this.getContextVersion(sisaEvent['@context']) < 6) {
    try{
      this.verifySignature({
        itemSigned: sisaEvent.audit.eventId,
        signature: sisaEvent.audit.rightsHolderSig,
        publicKey: rightsHolderId,
        oldVersion: true
      });
    }catch(error){
      if (error instanceof InvalidSignatureError)
        throw new SisaEventVerificationError('sisaEvent was not signed by the given dataCustodian');
      throw error;
    }
  } else {
    try{
      this.verifyHashSignature({
        signed: sisaEvent.audit.eventId,
        signature: sisaEvent.audit.rightsHolderSig,
        publicKey: rightsHolderId,
      });
    }catch(error){
      if (error instanceof InvalidSignatureError)
        throw new SisaEventVerificationError('sisaEvent was not signed by the given dataCustodian');
      throw error;
    }
  }

  return true;
};
