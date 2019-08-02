'use strict';

module.exports = function verifyAcknowledgedBisaEventWasSignedBy({
  bisa,
  bisaEvent,
  acknowledgedBisaEvent,
  dataCustodianPublicKey,
}) {
  const { InvalidSignatureError, AcknowledgedBisaEventVerificationError } = this;

  if (!bisa) throw new Error('bisa is required');
  if (!bisaEvent) throw new Error('bisaEvent is required');
  if (!acknowledgedBisaEvent) throw new Error('acknowledgedBisaEvent is required');
  if (!dataCustodianPublicKey) throw new Error('dataCustodianPublicKey is required');

  this.validateBisaEvent({ bisa, bisaEvent });

  try {
    this.verifyHashSignature({
      signed: acknowledgedBisaEvent.audit.eventId,
      signature: acknowledgedBisaEvent.audit.acceptorSig,
      publicKey: dataCustodianPublicKey,
    });
  } catch (error) {
    if (error instanceof InvalidSignatureError)
      throw new AcknowledgedBisaEventVerificationError('acknowledgedBisaEvent was not signed by the given dataCustodian');
    throw error;
  }

  return true;
};
