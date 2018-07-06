'use strict';

require('./setup');

it('expected usage', function() {
  const dataCustodian = JLINC.createEntity();
  expect( JLINC.validateDataCustodian({ dataCustodian }) ).to.be.true;

  const sisaAgreement = JLINC.createSisaAgreement();;
  expect( JLINC.validateSisaAgreement({ sisaAgreement }) ).to.be.true;

  const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });
  expect( JLINC.validateSisaOffering({ sisaOffering, dataCustodian }) ).to.be.true;

  const rightsHolder = JLINC.createEntity();
  expect( JLINC.validateRightsHolder({ rightsHolder }) ).to.be.true;

  const acceptedSisa = JLINC.acceptSisa({ sisaOffering, rightsHolder });
});
