'use strict';

module.exports = function verifyBisaEventSignature({ bisaEvent, dataCustodianPublicKey }) {
  const { InvalidSignatureError, BisaEventVerificationError } = this;

  if (!bisaEvent) throw new Error('bisaEvent is required');
  if (!dataCustodianPublicKey) throw new Error('dataCustodianPublicKey is required');

  try {
    this.verifyHashSignature({
      signed: bisaEvent.audit.eventId,
      signature: bisaEvent.audit.initiatorSig,
      publicKey: dataCustodianPublicKey,
    });
  } catch (error) {
    if (error instanceof InvalidSignatureError)
      throw new BisaEventVerificationError('bisaEvent was not signed by the given dataCustodianPublicKey');
    throw error;
  }

  return true;
};
