'use strict';

module.exports = function verifyAcknowledgedSisaEventWasSignedByDataCustodian({ acknowledgedSisaEvent, dataCustodianPublicKey }) {
  const { InvalidSignatureError, AcknowledgedSisaEventVerificationError } = this;

  if (!acknowledgedSisaEvent) throw new Error('acknowledgedSisaEvent is required');
  if (!dataCustodianPublicKey) throw new Error('dataCustodianPublicKey is required');

  try {
    this.verifyHashSignature({
      signed: acknowledgedSisaEvent.audit.eventId,
      signature: acknowledgedSisaEvent.audit.dataCustodianSig,
      publicKey: dataCustodianPublicKey,
    });
  } catch (error) {
    if (error instanceof InvalidSignatureError)
      throw new AcknowledgedSisaEventVerificationError('acknowledgedSisaEvent was not signed by the given dataCustodian');
    throw error;
  }

  return true;
};
