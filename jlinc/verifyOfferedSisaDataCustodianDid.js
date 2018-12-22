'use strict';

module.exports = async function verifyOfferedSisaDataCustodianDid({ offeredSisa, dataCustodianDid }){
  const { DIDVerificationError, OfferedSisaVerificationError } = this;

  if (!offeredSisa) throw new Error('offeredSisa is required');
  if (!dataCustodianDid) throw new Error('dataCustodianDid is required');

  if (offeredSisa.dataCustodianDid !== dataCustodianDid)
    throw new OfferedSisaVerificationError('sisaOffering.offeredSisa.dataCustodianDid does not match given dataCustodianDid');

  try{
    await this.verifyPublicKeyIsOwnedByDID({
      did: offeredSisa.dataCustodianDid,
      publicKey: offeredSisa.dataCustodianPublicKey,
    });
  }catch(error){
    if (error instanceof DIDVerificationError)
      throw new OfferedSisaVerificationError('sisaOffering is not from the given dataCustodian');
    throw error;
  }

  return true;
};
