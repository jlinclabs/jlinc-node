'use strict';

module.exports = async function verifyBisaOfferingDid({ bisaOffering }) {
  const { DIDVerificationError, OfferedBisaVerificationError } = this;
  this.validateBisaOffering({ bisaOffering });

  try{
    await this.verifyPublicKeyIsOwnedByDID({
      did: bisaOffering.offeredBisa.offerorDid,
      publicKey: bisaOffering.offeredBisa.offerorPublicKey,
    });
  }catch(error){
    if (error instanceof DIDVerificationError)
      throw new OfferedBisaVerificationError('bisaOffering did is not valid');
    throw error;
  }

  return true;
};
