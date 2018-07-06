'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function createSisaOffering(options = {}) {
  const { sisaAgreement, dataCustodian } = options;

  this.validateSisaAgreement({ sisaAgreement });
  this.validateDataCustodian({ dataCustodian });

  const agreementJwt = jsonwebtoken.sign(sisaAgreement, dataCustodian.secretKey);
  const dataCustodianSig = this.signItem({
    itemToSign: agreementJwt,
    secretKey: dataCustodian.secretKey
  });

  return {
    '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
    offeredSisa: {
      '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
      agreementJwt,
      dataCustodianSigType: 'sha256:ed25519',
      dataCustodianID: dataCustodian.id,
      dataCustodianSig,
      iat: Date.now(),
    }
  };
};

