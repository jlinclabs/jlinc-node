'use strict';

module.exports = function createSisaOffering({ agreementURI, dataCustodian }) {
  if (!dataCustodian) throw new Error('dataCustodian is required');

  const sisaAgreement = {
    "@context": this.contextUrl,
    jlincId: this.createNonce(),
    agreementURI: agreementURI || this.defaultAgreementURI,
  };

  const agreementJwt = this.createSignedJwt({
    itemToSign: sisaAgreement,
    secret: dataCustodian.secret,
  });

  const dataCustodianSig = this.signItem({
    itemToSign: agreementJwt,
    privateKey: dataCustodian.signingPrivateKey,
  });

  return {
    '@context': this.contextUrl,
    offeredSisa: {
      '@context': this.contextUrl,
      agreementJwt,
      dataCustodianSigType: this.signatureType,
      dataCustodianDid: dataCustodian.did,
      dataCustodianPublicKey: dataCustodian.signingPublicKey,
      dataCustodianSig,
      createdAt: this.now(),
    }
  };
};
