'use strict';

module.exports = function createSisaAgreement(options = {}) {
  const {
    agreementURI = this.defaultAgreementURI,
  } = options;
  return {
    "@context": this.contextUrl,
    jlincId: this.createNonce(),
    agreementURI,
    iat: this.now(),
  };
};
