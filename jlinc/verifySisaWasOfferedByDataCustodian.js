'use strict';

module.exports = function verifySisaWasOfferedByDataCustodian({ sisa, dataCustodian }){
  const { JWTVerificationError, InvalidSignatureError, SisaVerificationError } = this;

  if (!sisa) throw new Error('sisa is required');
  if (!dataCustodian) throw new Error('dataCustodian is required');

  const acceptedSisa = this.decodeJwt({ jwt: sisa.acceptedSisaJwt });
  const offeredSisa = this.decodeJwt({ jwt: acceptedSisa.offeredSisaJwt });
  const { agreementJwt, dataCustodianSig } = offeredSisa;

  try{
    this.decodeAndVerifyJwt({
      jwt: agreementJwt,
      secret: dataCustodian.secret,
    });
  }catch(error){
    if (error instanceof JWTVerificationError)
      throw new SisaVerificationError('sisa agreementJwt is not signed by the given dataCustodian');
    throw error;
  }

  try{
    this.verifySignature({
      itemSigned: agreementJwt,
      signature: dataCustodianSig,
      publicKey: dataCustodian.publicKey,
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new SisaVerificationError('sisa dataCustodianSig does not match the given dataCustodian');
    throw error;
  }

  return true;
};
