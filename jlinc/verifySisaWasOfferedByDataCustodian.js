'use strict';

module.exports = function verifySisaWasOfferedByDataCustodian({ sisa, dataCustodian }){
  const { JWTVerificationError, SisaVerificationError } = this;

  if (!sisa) throw new Error('sisa is required');
  if (!dataCustodian) throw new Error('dataCustodian is required');
  if (!dataCustodian.did) throw new Error('dataCustodian.did is required');
  if (!dataCustodian.secret) throw new Error('dataCustodian.secret is required');

  const acceptedSisa = this.decodeJwt({ jwt: sisa.acceptedSisaJwt });
  const offeredSisa = this.decodeJwt({ jwt: acceptedSisa.offeredSisaJwt });

  if (offeredSisa.dataCustodianDid !== dataCustodian.did)
    throw new SisaVerificationError('sisa.acceptedSisa.offeredSisa.dataCustodianDid does not match the given dataCustodian');

  try{
    this.decodeAndVerifyJwt({
      jwt: offeredSisa.agreementJwt,
      secret: dataCustodian.secret,
    });
  }catch(error){
    if (error instanceof JWTVerificationError)
      throw new SisaVerificationError('sisa agreementJwt is not signed by the given dataCustodian');
    throw error;
  }

  return true;
};
