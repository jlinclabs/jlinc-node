'use strict';

const createNonce = require('./createNonce');

module.exports = function createSisaAgreement() {
  return {
    "@context": "https://context.jlinc.org/v05/jlinc.jsonld",
    "jlincID": createNonce(),
    "agreementURI": "https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4",
    "iat": Date.now(),
  };
};
