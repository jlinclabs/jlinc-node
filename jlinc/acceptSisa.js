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

  return {
    '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
    offeredSisaJwt,
    rightsHolderSigType: 'sha256:ed25519',
    rightsHolderID: rightsHolder.id,
    rightsHolderSig,
    iat: Date.now(),
  };
};
