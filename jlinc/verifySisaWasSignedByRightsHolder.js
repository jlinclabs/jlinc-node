'use strict';

module.exports = function verifySisaWasSignedByRightsHolder({ sisa, rightsHolder }){
  const { JWTVerificationError, InvalidSignatureError, SisaVerificationError } = this;

  if (!sisa) throw new Error('sisa is required');
  if (!rightsHolder) throw new Error('rightsHolder is required');

  this.validateSisa({ sisa });

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

  if (acceptedSisa === null)
    throw new SisaVerificationError('sisa.acceptedSisa is invalid');

  if (acceptedSisa.rightsHolderId !== rightsHolder.publicKey)
    throw new SisaVerificationError('sisa.acceptedSisa.rightsHolderId does not match given rightsHolder');

  return true;
};
