'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function acceptSisa({ offeredSisa, rightsHolder }){
  this.validateOfferedSisa({ offeredSisa });
  this.validateRightsHolder({ rightsHolder });

  const offeredSisaJwt = jsonwebtoken.sign(offeredSisa, rightsHolder.privateKey);
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

  const acceptedSisaJwt = jsonwebtoken.sign(acceptedSisa, rightsHolder.privateKey);
  const sisaId = this.createHash({ itemToHash: acceptedSisaJwt });

  return {
    '@context': this.contextUrl,
    acceptedSisaJwt,
    sisaId,
  };
};
