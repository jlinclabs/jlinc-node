'use strict';

module.exports = function verifySisaEventWasSignedByRightsHolder({ sisaEvent, rightsHolderPublicKey }) {
  const { InvalidSignatureError, SisaEventVerificationError } = this;

  if (!sisaEvent) throw new Error('sisaEvent is required');
  if (!rightsHolderPublicKey) throw new Error('rightsHolderPublicKey is required');

  try {
    this.verifyHashSignature({
      signed: sisaEvent.audit.eventId,
      signature: sisaEvent.audit.rightsHolderSig,
      publicKey: rightsHolderPublicKey,
    });
  } catch (error) {
    if (error instanceof InvalidSignatureError)
      throw new SisaEventVerificationError('sisaEvent was not signed by the given rightsHolderPublicKey');
    throw error;
  }

  return true;
};
