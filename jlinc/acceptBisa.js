'use strict';

module.exports = function acceptBisa({ bisaOffering, dataCustodian }){
  const { InvalidBisaError } = this;

  if (!bisaOffering) throw new Error('bisaOffering is reqiured');
  if (!dataCustodian) throw new Error('dataCustodian is reqiured');
  if (!dataCustodian.did) throw new Error('dataCustodian.did is reqiured');

  this.validateBisaOffering({
    bisaOffering,
  });

  const agreement = this.decodeJwt({
    jwt: bisaOffering.offeredBisa.agreementJwt,
  });

  if (agreement.targetAcceptorDid !== dataCustodian.did)
    throw new InvalidBisaError('bisaOffering.offeredBisa.agreement.targetAcceptorDid does not match given dataCustodian.did');

  const offeredBisaJwt = this.createSignedJwt({
    itemToSign: bisaOffering.offeredBisa,
    secret: dataCustodian.secret,
  });

  const acceptorSig = this.signItem({
    itemToSign: offeredBisaJwt,
    privateKey: dataCustodian.signingPrivateKey,
  });

  const acceptedBisa = {
    '@context': this.contextUrl,
    offeredBisaJwt,
    acceptorSigType: this.signatureType,
    acceptorDid: dataCustodian.did,
    acceptorPublicKey: dataCustodian.signingPublicKey,
    acceptorSig,
    createdAt: this.now(),
  };

  const acceptedBisaJwt = this.createSignedJwt({
    itemToSign: acceptedBisa,
    secret: dataCustodian.secret,
  });

  const bisaId = this.createHash({ itemToHash: acceptedBisaJwt });

  return {
    '@context': this.contextUrl,
    acceptedBisaJwt,
    bisaId,
  };
};
