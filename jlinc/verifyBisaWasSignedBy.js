'use strict';

module.exports = function verifyBisaWasSignedBy({ bisa, dataCustodian }){
  const { InvalidSignatureError, BisaVerificationError } = this;

  if (!bisa) throw new Error('bisa is required');
  if (!dataCustodian) throw new Error('dataCustodian is required');
  if (!dataCustodian.did) throw new Error('dataCustodian.did is required');
  if (!dataCustodian.signingPublicKey) throw new Error('dataCustodian.signingPublicKey is required');

  const acceptedBisa = this.decodeJwt({ jwt: bisa.acceptedBisaJwt });
  if (acceptedBisa.acceptorDid === dataCustodian.did){
    try{
      this.verifySignature({
        itemSigned: acceptedBisa.offeredBisaJwt,
        signature: acceptedBisa.acceptorSig,
        publicKey: dataCustodian.signingPublicKey,
        contextUrl: acceptedBisa['@context']
      });
    }catch(error){
      if (error instanceof InvalidSignatureError)
        throw new BisaVerificationError('bisa was not signed by the given dataCustodian');
      throw error;
    }
    return true;
  }

  const offeredBisa = this.decodeJwt({ jwt: acceptedBisa.offeredBisaJwt });
  if (offeredBisa.offerorDid === dataCustodian.did){
    try{
      this.verifySignature({
        itemSigned: offeredBisa.agreementJwt,
        signature: offeredBisa.offerorSig,
        publicKey: dataCustodian.signingPublicKey,
        contextUrl: offeredBisa['@context']
      });
    }catch(error){
      if (error instanceof InvalidSignatureError)
        throw new BisaVerificationError('bisa was not signed by the given dataCustodian');
      throw error;
    }
    return true;
  }

  throw new BisaVerificationError('bisa was not signed by the given dataCustodian');
};
