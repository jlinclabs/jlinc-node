'use strict';

module.exports = function createSisaAgreement() {
  return {
    "@context": this.contextUrl,
    jlincId: this.createNonce(),
    agreementURI: "https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4",
    iat: this.now(),
  };
};
