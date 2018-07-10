'use strict';

require('./setup');

const JLINC = require('../jlinc');

module.exports = {
  generateSisa() {
    const dataCustodian = JLINC.createEntity();
    const sisaAgreement = JLINC.createSisaAgreement();
    const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });
    const { offeredSisa } = sisaOffering;
    const rightsHolder = JLINC.createEntity();
    const sisa = JLINC.acceptSisa({ offeredSisa, rightsHolder });

    const acceptedSisa = JLINC.decodeJwt({ jwt: sisa.acceptedSisaJwt });
    const { offeredSisaJwt } = acceptedSisa;
    return {
      dataCustodian,
      sisaAgreement,
      sisaOffering,
      offeredSisa,
      offeredSisaJwt,
      acceptedSisa,
      rightsHolder,
      sisa,
    };
  }
};
