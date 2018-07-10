'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function createSisaOffering({ sisaAgreement, dataCustodian }) {
  this.validateSisaAgreement({ sisaAgreement });
  this.validateDataCustodian({ dataCustodian });

  const agreementJwt = jsonwebtoken.sign(sisaAgreement, dataCustodian.privateKey);
  const dataCustodianSig = this.signItem({
    itemToSign: agreementJwt,
    privateKey: dataCustodian.privateKey,
  });

  return {
    '@context': this.contextUrl,
    offeredSisa: {
      '@context': this.contextUrl,
      agreementJwt,
      dataCustodianSigType: 'sha256:ed25519',
      dataCustodianId: dataCustodian.publicKey,
      dataCustodianSig,
      iat: this.now(),
    }
  };
};

