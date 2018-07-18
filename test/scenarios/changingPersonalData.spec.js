'use strict';

require('../setup');
const JLINC = require('../../jlinc');

it('changing personal data', function() {
  const {
    dataCustodian,
    sisaOffering,
    offeredSisaJwt,
    acceptedSisa,
    rightsHolder,
    sisa,
    rightsHolderId,
    dataCustodianId,
    sisaEvent,
  } = this.generateSisa();

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
    sisa,
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
