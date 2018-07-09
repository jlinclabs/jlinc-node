'use strict';

require('./setup');

it('expected usage', function() {

  // done by bob on the B API

  const dataCustodian = JLINC.createEntity();
  // console.log('\ndataCustodian:\n', dataCustodian);
  expect( JLINC.validateDataCustodian({ dataCustodian }) ).to.be.true;

  const sisaAgreement = JLINC.createSisaAgreement();
  // console.log('\nsisaAgreement:\n', sisaAgreement);
  expect( JLINC.validateSisaAgreement({ sisaAgreement }) ).to.be.true;

  const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });
  // console.log('\nsisaOffering:\n', sisaOffering);
  expect( JLINC.validateSisaOffering({ sisaOffering, dataCustodian }) ).to.be.true;

  // done by alice on the A API

  const { offeredSisa } = sisaOffering;
  // console.log('\nofferedSisa:\n', offeredSisa);

  const rightsHolder = JLINC.createEntity();
  // console.log('\nrightsHolder:\n', rightsHolder);
  expect( JLINC.validateRightsHolder({ rightsHolder }) ).to.be.true;

  const acceptedSisa = JLINC.acceptSisa({ offeredSisa, rightsHolder });
  // console.log('\nacceptedSisa:\n', acceptedSisa);
  expect( JLINC.validateAcceptedSisa({ acceptedSisa }) ).to.be.true;

  const expandedAcceptedSisa = JLINC.expandAcceptedSisa({ acceptedSisa });
  // console.log('\nexpandedAcceptedSisa:\n', expandedAcceptedSisa);
});
