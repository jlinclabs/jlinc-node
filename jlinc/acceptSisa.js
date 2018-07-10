'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function acceptSisa({ offeredSisa, rightsHolder }){
  this.validateOfferedSisa({ offeredSisa });
  this.validateRightsHolder({ rightsHolder });

  const offeredSisaJwt = jsonwebtoken.sign(offeredSisa, rightsHolder.secretKey);
  const rightsHolderSig = this.signItem({
    itemToSign: offeredSisaJwt,
    secretKey: rightsHolder.secretKey,
  });

  const acceptedSisa = {
    '@context': this.contextUrl,
    offeredSisaJwt,
    rightsHolderSigType: 'sha256:ed25519',
    rightsHolderId: rightsHolder.id,
    rightsHolderSig,
    // iat: Math.floor(Date.now() / 1000),
  };

  const acceptedSisaJwt = jsonwebtoken.sign(acceptedSisa, rightsHolder.secretKey);
  const sisaId = this.createHash({ itemToHash: acceptedSisaJwt });

  return {
    '@context': this.contextUrl,
    acceptedSisaJwt,
    sisaId,
  };
};
