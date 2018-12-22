'use strict';

module.exports = async function verifyAcknowledgedSisaEventDataCustodianDid({ acknowledgedSisaEvent, dataCustodianDid }) {
  const { DIDVerificationError, AcknowledgedSisaEventVerificationError } = this;

  if (!acknowledgedSisaEvent) throw new Error('acknowledgedSisaEvent is required');
  if (!dataCustodianDid) throw new Error('dataCustodianDid is required');

  if (dataCustodianDid !== acknowledgedSisaEvent.audit.dataCustodianDid)
    throw new AcknowledgedSisaEventVerificationError('sisaEvent dataCustodianDid does not match given dataCustodianDid');

  try{
    await this.verifyPublicKeyIsOwnedByDID({
      did: acknowledgedSisaEvent.audit.dataCustodianDid,
      publicKey: acknowledgedSisaEvent.audit.dataCustodianPublicKey,
    });
  }catch(error){
    if (error instanceof DIDVerificationError)
      throw new AcknowledgedSisaEventVerificationError('acknowledgedSisaEvent is not from the dataCustodian');
    throw error;
  }

  return true;
};
