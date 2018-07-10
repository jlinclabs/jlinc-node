'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function createSisaOffering({ sisaAgreement, dataCustodian }) {
  this.validateSisaAgreement({ sisaAgreement });
  this.validateDataCustodian({ dataCustodian });

  const agreementJwt = jsonwebtoken.sign(sisaAgreement, dataCustodian.secretKey);
  const dataCustodianSig = this.signItem({
    itemToSign: agreementJwt,
    secretKey: dataCustodian.secretKey,
  });

  return {
    '@context': this.contextUrl,
    offeredSisa: {
      '@context': this.contextUrl,
      agreementJwt,
      dataCustodianSigType: 'sha256:ed25519',
      dataCustodianId: dataCustodian.id,
      dataCustodianSig,
      iat: this.now(),
    }
  };
};

