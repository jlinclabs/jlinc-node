'use strict';

const JLINC = require('../jlinc');

const generateISODateStringInTheFuture = function(){
  const date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  return date.toISOString();
};

const generateSisa = function() {
  const dataCustodian = JLINC.createDataCustodian();
  const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
  const { offeredSisa } = sisaOffering;
  const agreement = JLINC.decodeJwt({ jwt: sisaOffering.offeredSisa.agreementJwt });
  const rightsHolder = JLINC.createRightsHolder();
  const sisa = JLINC.acceptSisa({ sisaOffering, rightsHolder });
  const acceptedSisa = JLINC.decodeJwt({ jwt: sisa.acceptedSisaJwt });
  const { offeredSisaJwt } = acceptedSisa;
  const rightsHolderId = rightsHolder.publicKey;
  const dataCustodianId = dataCustodian.publicKey;
  return {
    dataCustodian,
    agreement,
    offeredSisa,
    sisaOffering,
    acceptedSisa,
    offeredSisaJwt,
    rightsHolder,
    sisa,
    rightsHolderId,
    dataCustodianId,
  };
};

const generateSisaEvent = function() {
  const {
    dataCustodian,
    agreement,
    offeredSisa,
    sisaOffering,
    acceptedSisa,
    offeredSisaJwt,
    rightsHolder,
    sisa,
    rightsHolderId,
    dataCustodianId,
  } = generateSisa();

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
    agreement,
    offeredSisa,
    sisaOffering,
    acceptedSisa,
    offeredSisaJwt,
    rightsHolder,
    sisa,
    rightsHolderId,
    dataCustodianId,
    sisaEvent,
    event,
  };
};

const generateAcknowledgedSisaEvent = function() {
  const {
    dataCustodian,
    agreement,
    offeredSisa,
    sisaOffering,
    acceptedSisa,
    offeredSisaJwt,
    rightsHolder,
    sisa,
    rightsHolderId,
    dataCustodianId,
    sisaEvent,
    event,
  } = generateSisaEvent();

  const acknowledgedSisaEvent = JLINC.acknowledgeSisaEvent({
    sisa,
    dataCustodian,
    sisaEvent,
  });

  return {
    dataCustodian,
    agreement,
    offeredSisa,
    sisaOffering,
    acceptedSisa,
    offeredSisaJwt,
    rightsHolder,
    sisa,
    rightsHolderId,
    dataCustodianId,
    sisaEvent,
    event,
    acknowledgedSisaEvent,
  };
};

module.exports = {
  generateISODateStringInTheFuture,
  generateSisa,
  generateSisaEvent,
  generateAcknowledgedSisaEvent,
};
