'use strict';

module.exports = function acceptSisa({ sisaOffering, rightsHolder }){
  if (!sisaOffering) throw new Error('sisaOffering is reqiured');
  if (!rightsHolder) throw new Error('rightsHolder is reqiured');

  this.validateSisaOffering({ sisaOffering });

  const offeredSisaJwt = this.createSignedJwt({
    itemToSign: sisaOffering.offeredSisa,
    secret: rightsHolder.secret,
  });

  const rightsHolderSig = this.signItem({
    itemToSign: offeredSisaJwt,
    privateKey: rightsHolder.privateKey,
  });

  const acceptedSisa = {
    '@context': this.contextUrl,
    offeredSisaJwt,
    rightsHolderSigType: this.signatureType,
    rightsHolderId: rightsHolder.publicKey,
    rightsHolderSig,
    acceptedAt: Date.now(),
  };

  const acceptedSisaJwt = this.createSignedJwt({
    itemToSign: acceptedSisa,
    secret: rightsHolder.secret,
  });

  const sisaId = this.createHash({ itemToHash: acceptedSisaJwt });

  return {
    '@context': this.contextUrl,
    acceptedSisaJwt,
    sisaId,
  };
};
