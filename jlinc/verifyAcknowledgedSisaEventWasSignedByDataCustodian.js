'use strict';

module.exports = function verifyAcknowledgedSisaEventWasSignedByDataCustodian({ acknowledgedSisaEvent, dataCustodianId }) {
  const { InvalidSignatureError, AcknowledgedSisaEventVerificationError } = this;

  if (!acknowledgedSisaEvent) throw new Error('acknowledgedSisaEvent is required');
  if (!dataCustodianId) throw new Error('dataCustodianId is required');

  try{
    this.verifySignature({
      itemSigned: acknowledgedSisaEvent.eventJwt,
      signature: acknowledgedSisaEvent.audit.dataCustodianSig,
      publicKey: dataCustodianId,
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new AcknowledgedSisaEventVerificationError('acknowledgedSisaEvent was not signed by the given dataCustodian');
    throw error;
  }

};
