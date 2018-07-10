'use strict';

module.exports = function acceptSisa({ offeredSisa, rightsHolder }){
  this.validateOfferedSisa({ offeredSisa });
  this.validateRightsHolder({ rightsHolder });

  const offeredSisaJwt = this.createSignedJwt({
    itemToSign: offeredSisa,
    secret: rightsHolder.secret,
  });

  const rightsHolderSig = this.signItem({
    itemToSign: offeredSisaJwt,
    privateKey: rightsHolder.privateKey,
  });

  const acceptedSisa = {
    '@context': this.contextUrl,
    offeredSisaJwt,
    rightsHolderSigType: 'sha256:ed25519',
    rightsHolderId: rightsHolder.publicKey,
    rightsHolderSig,
    iat: this.now(),
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
