'use strict';

module.exports = function verifySisaWasSignedByRightsHolder({ sisa, rightsHolder }){
  const { JWTVerificationError, SisaVerificationError } = this;

  if (!sisa) throw new Error('sisa is required');
  if (!rightsHolder) throw new Error('rightsHolder is required');

  let acceptedSisa;
  try{
    acceptedSisa = this.decodeAndVerifyJwt({
      jwt: sisa.acceptedSisaJwt,
      secret: rightsHolder.secret,
    });
  }catch(error){
    if (error instanceof JWTVerificationError)
      throw new SisaVerificationError('sisa.acceptedSisaJwt is not signed by the given rightsHolder');
    throw error;
  }

  if (acceptedSisa.rightsHolderDid !== rightsHolder.did)
    throw new SisaVerificationError('sisa.acceptedSisa.rightsHolderDid does not match given rightsHolder.did');



  return true;
};
