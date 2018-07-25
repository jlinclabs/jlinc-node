'use strict';

const JLINC = require('../jlinc');

const zeroPadded = n => n >= 10 ? n : `0${n}`;

const generateISODateStringOfOneMinuteFromNow = function(){
  const isoDateString = new Date().toISOString();
  return isoDateString.replace(/:(\d\d):(\d\d)\./, (_, m, s) =>
    `:${zeroPadded(Number(m)+1)}:${s}.`
  );
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
  generateISODateStringOfOneMinuteFromNow,
  generateSisa,
  generateSisaEvent,
  generateAcknowledgedSisaEvent,
};
