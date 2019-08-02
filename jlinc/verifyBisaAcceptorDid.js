'use strict';

module.exports = async function verifyBisaAcceptorDid({ bisa }){
  const { DIDVerificationError, BisaVerificationError } = this;

  if (!bisa) throw new Error('bisa is required');

  const acceptedBisa = this.decodeJwt({ jwt: bisa.acceptedBisaJwt });

  try{
    await this.verifyPublicKeyIsOwnedByDID({
      did: acceptedBisa.acceptorDid,
      publicKey: acceptedBisa.acceptorPublicKey,
    });
  }catch(error){
    if (error instanceof DIDVerificationError)
      throw new BisaVerificationError('bisa.acceptedBisa.acceptorDid is not the owner of bisa.acceptedBisa.acceptorPublicKey');
    throw error;
  }

  return true;
};
