'use strict';

module.exports = function createSisaOffering({ agreementURI, dataCustodian }) {

  if (!dataCustodian) throw new Error('dataCustodian is required');

  const sisaAgreement = {
    "@context": this.contextUrl,
    jlincId: this.createNonce(),
    agreementURI: agreementURI || this.defaultAgreementURI,
    iat: this.now(),
  };

  const agreementJwt = this.createSignedJwt({
    itemToSign: sisaAgreement,
    secret: dataCustodian.secret,
  });

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

