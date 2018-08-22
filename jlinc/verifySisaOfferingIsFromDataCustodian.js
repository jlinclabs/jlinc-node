'use strict';

module.exports = function verifySisaOfferingIsFromDataCustodian({ sisaOffering, dataCustodianId }) {
  const { InvalidSignatureError, SisaOfferingVerificationError } = this;

  if (!sisaOffering) throw new Error('sisaOffering is required');
  if (!dataCustodianId) throw new Error('dataCustodianId is required');

  const { agreementJwt, dataCustodianSig } = sisaOffering.offeredSisa;

  try{
    this.verifySignature({
      itemSigned: agreementJwt,
      signature: dataCustodianSig,
      publicKey: dataCustodianId,
      contextUrl: sisaOffering['@context']
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new SisaOfferingVerificationError('sisaOffering is not from the given dataCustodian');
    throw error;
  }

  return true;
};
