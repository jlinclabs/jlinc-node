'use strict';

require('./setup');

const JLINC = require('../jlinc');

module.exports = {
  generateSisa() {
    const dataCustodian = JLINC.createEntity();
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
    const rightsHolder = JLINC.createEntity();
    const sisa = JLINC.acceptSisa({ sisaOffering, rightsHolder });

    const acceptedSisa = JLINC.decodeJwt({ jwt: sisa.acceptedSisaJwt });
    const { offeredSisaJwt } = acceptedSisa;
    return {
      dataCustodian,
      sisaOffering,
      offeredSisaJwt,
      acceptedSisa,
      rightsHolder,
      sisa,
    };
  },

  generateSisaEvent() {
    const {
      dataCustodian,
      sisaOffering,
      offeredSisaJwt,
      acceptedSisa,
      rightsHolder,
      sisa,
    } = this.generateSisa();

    const event = {
      personal_data: {
        firstname: 'Larry',
        lastname: 'David',
      },
    };

    const sisaEvent = JLINC.createSisaEvent({
      eventType: 'dataEvent',
      event,
      sisa: sisa,
      latestSisaEvent: null,
      rightsHolder,
    });

    return {
      dataCustodian,
      sisaOffering,
      offeredSisaJwt,
      acceptedSisa,
      rightsHolder,
      sisa,
      sisaEvent,
    };
  },
};
