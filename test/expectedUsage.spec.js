'use strict';

require('./setup');

it('expected usage', function() {

  // done by bob on the B API

  const dataCustodian = JLINC.createEntity();
  expect( JLINC.validateDataCustodian({ dataCustodian }) ).to.be.true;

  const sisaAgreement = JLINC.createSisaAgreement();
  expect( JLINC.validateSisaAgreement({ sisaAgreement }) ).to.be.true;

  const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });

  // done by alice on the A API

  const { offeredSisa } = sisaOffering;
  expect( JLINC.validateOfferedSisa({ offeredSisa }) ).to.be.true;

  const rightsHolder = JLINC.createEntity();
  expect( JLINC.validateRightsHolder({ rightsHolder }) ).to.be.true;

  const acceptedSisa = JLINC.acceptSisa({ offeredSisa, rightsHolder });


  // done by bob on the B API
  expect( JLINC.validateAcceptedSisa({ acceptedSisa }) ).to.be.true;

  const expandedAcceptedSisa = JLINC.expandAcceptedSisa({ acceptedSisa });

});
