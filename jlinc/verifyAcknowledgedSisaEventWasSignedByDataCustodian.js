'use strict';

module.exports = function verifyAcknowledgedSisaEventWasSignedByDataCustodian({ acknowledgedSisaEvent, dataCustodianId }) {
  const { InvalidSignatureError, AcknowledgedSisaEventVerificationError } = this;

  if (!acknowledgedSisaEvent) throw new Error('acknowledgedSisaEvent is required');
  if (!dataCustodianId) throw new Error('dataCustodianId is required');

  try {
    let version = this.getContextVersion(acknowledgedSisaEvent['@context']);
    if (version < 6) {
      this.verifySignature({
        itemSigned: acknowledgedSisaEvent.audit.eventId,
        signature: acknowledgedSisaEvent.audit.dataCustodianSig,
        publicKey: dataCustodianId,
        version: version
      });
    } else {
      this.verifyHashSignature({
        signed: acknowledgedSisaEvent.audit.eventId,
        signature: acknowledgedSisaEvent.audit.dataCustodianSig,
        publicKey: dataCustodianId,
      });
    }
  } catch (error) {
    if (error instanceof InvalidSignatureError)
      throw new AcknowledgedSisaEventVerificationError('acknowledgedSisaEvent was not signed by the given dataCustodian');
    throw error;
  }

  // if (this.getContextVersion(acknowledgedSisaEvent['@context']) < 6) {
  //   try{
  //     this.verifySignature({
  //       itemSigned: acknowledgedSisaEvent.audit.eventId,
  //       signature: acknowledgedSisaEvent.audit.dataCustodianSig,
  //       publicKey: dataCustodianId,
  //       oldVersion: true
  //     });
  //   }catch(error){
  //     if (error instanceof InvalidSignatureError)
  //       throw new AcknowledgedSisaEventVerificationError('acknowledgedSisaEvent was not signed by the given dataCustodian');
  //     throw error;
  //   }
  // } else {
  //   try{
  //     this.verifyHashSignature({
  //       signed: acknowledgedSisaEvent.audit.eventId,
  //       signature: acknowledgedSisaEvent.audit.dataCustodianSig,
  //       publicKey: dataCustodianId,
  //     });
  //   }catch(error){
  //     if (error instanceof InvalidSignatureError)
  //       throw new AcknowledgedSisaEventVerificationError('acknowledgedSisaEvent was not signed by the given dataCustodian');
  //     throw error;
  //   }
  // }

  return true;
};
