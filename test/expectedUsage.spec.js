'use strict';

require('./setup');
const JLINC = require('../jlinc');

it('expected usage', function() {

  // On the B Server
  const dataCustodian = JLINC.createDataCustodian();

  const dataCustodianId = dataCustodian.publicKey;

  const sisaOffering = JLINC.createSisaOffering({ dataCustodian });

  // simulate sending sisa across an HTTP request
  const copyOfSisaOffering = JSON.parse(JSON.stringify(sisaOffering));

  // On the A Server
  const rightsHolder = JLINC.createRightsHolder();

  JLINC.validateSisaOffering({
    sisaOffering: copyOfSisaOffering
  });

  JLINC.verifySisaOfferingIsFromDataCustodian({
    sisaOffering: copyOfSisaOffering,
    dataCustodianId,
  });

  const sisa = JLINC.acceptSisa({
    sisaOffering: copyOfSisaOffering,
    rightsHolder,
  });

  // simulate sending sisa across an HTTP request
  const copyOfSisa = JSON.parse(JSON.stringify(sisa));

  // On the B Server
  JLINC.validateSisa({ sisa: copyOfSisa });

  JLINC.verifySisaWasOfferedByDataCustodian({ sisa: copyOfSisa, dataCustodian });
  const expandedSisa = JLINC.expandSisa({ sisa: copyOfSisa });
  const rightsHolderId = expandedSisa.acceptedSisa.rightsHolderId;

  // Sisa is signed :D




  // On the A server

  // Alice wantes to update the personal data she shares with bob
  const sisaEvent_1 = JLINC.createSisaEvent({
    eventType: 'dataEvent',
    event: {
      personal_data: {
        firstname: 'Alice',
        lastname: 'McEnduser',
      },
    },
    sisa: copyOfSisa,
    latestSisaEvent: null,
    rightsHolder,
  });

  // alice sends the sisaEvent to bob
  const copyOfSisaEvent_1 = JSON.parse(JSON.stringify(sisaEvent_1));


  // On the B Server
  JLINC.validateSisaEvent({ sisaEvent: copyOfSisaEvent_1 });

  JLINC.verifySisaEventWasSignedByRightsHolder({
    sisaEvent: copyOfSisaEvent_1,
    rightsHolderId,
  });

  const acknowledgedSisaEvent_1 = JLINC.acknowledgeSisaEvent({
    sisa,
    dataCustodian,
    sisaEvent: copyOfSisaEvent_1,
  });

  // bob should save this acknowledged sisa event in the database

  // bob sends the acknowledge Sisa Event back to alice
  const copyOfAcknowledgedSisaEvent_1 = JSON.parse(JSON.stringify(acknowledgedSisaEvent_1));

  // On the A Server
  // alice validates the acknowledged sisa event
  JLINC.validateAcknowledgedSisaEvent({
    sisaEvent: sisaEvent_1,
    acknowledgedSisaEvent: copyOfAcknowledgedSisaEvent_1,
  });

  JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
    acknowledgedSisaEvent: copyOfAcknowledgedSisaEvent_1,
    dataCustodianId,
  });


  // alice should save this acknowledged sisa event in the database


});
