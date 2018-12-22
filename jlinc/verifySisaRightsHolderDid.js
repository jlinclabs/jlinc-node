'use strict';

module.exports = async function verifySisaRightsHolderDid({ sisa }){
  const { DIDVerificationError, SisaVerificationError } = this;

  if (!sisa) throw new Error('sisa is required');

  const acceptedSisa = this.decodeJwt({ jwt: sisa.acceptedSisaJwt });

  try{
    await this.verifyPublicKeyIsOwnedByDID({
      did: acceptedSisa.rightsHolderDid,
      publicKey: acceptedSisa.rightsHolderPublicKey,
    });
  }catch(error){
    if (error instanceof DIDVerificationError)
      throw new SisaVerificationError('sisa is not from the given rightsHolder');
    throw error;
  }

  return true;
};
