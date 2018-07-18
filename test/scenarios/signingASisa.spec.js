'use strict';

const JLINC = require('../../jlinc');

it('signing a SISA', function() {

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

});
