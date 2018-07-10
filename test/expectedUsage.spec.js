'use strict';

require('./setup');
const JLINC = require('../jlinc');

it('expected usage', function() {

  // done by bob on the B API

  const dataCustodian = JLINC.createEntity();
  expect( JLINC.validateDataCustodian({ dataCustodian }) ).to.be.true;

  const sisaAgreement = JLINC.createSisaAgreement();
  expect( JLINC.validateSisaAgreement({ sisaAgreement }) ).to.be.true;

  const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });

  // done by alice on the A API

  const { offeredSisa } = sisaOffering;
  expect( JLINC.validateOfferedSisa({ offeredSisa, dataCustodian: { id: dataCustodian.id } }) ).to.be.true;

  const rightsHolder = JLINC.createEntity();
  expect( JLINC.validateRightsHolder({ rightsHolder }) ).to.be.true;

  const sisa = JLINC.acceptSisa({ offeredSisa, rightsHolder });

  // done by bob on the B API
  // expect( JLINC.validateAcceptedSisa({ sisa, dataCustodian }) ).to.be.true;

  const expandedSisa = JLINC.expandSisa({ sisa });

});
