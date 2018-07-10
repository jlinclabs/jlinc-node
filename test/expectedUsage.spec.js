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
  expect(() => {
    JLINC.validateOfferedSisa({ offeredSisa, dataCustodian: { id: JLINC.createEntity().id } });
  }).to.throw('offeredSisa.dataCustodianId does not match given dataCustodian');

  const rightsHolder = JLINC.createEntity();
  expect( JLINC.validateRightsHolder({ rightsHolder }) ).to.be.true;

  const sisa = JLINC.acceptSisa({ offeredSisa, rightsHolder });
  expect( JLINC.validateSisa({ sisa, rightsHolder }) ).to.be.true;
  expect(() => {
    JLINC.validateSisa({ sisa, rightsHolder: JLINC.createEntity() });
  }).to.throw('sisa.acceptedSisa.rightsHolderId does not match given rightsHolder');


  // done by bob on the B API
  expect( JLINC.validateSisa({ sisa, dataCustodian }) ).to.be.true;
  expect(() => {
    JLINC.validateSisa({ sisa, dataCustodian: JLINC.createEntity() });
  }).to.throw('sisa.acceptedSisa.offeredSisa.agreementJwt was not signed by the given dataCustodian');

  const expandedSisa = JLINC.expandSisa({ sisa });

  expect(expandedSisa.acceptedSisa.rightsHolderId).to.equal(rightsHolder.id);
  expect(expandedSisa.acceptedSisa.offeredSisa.dataCustodianId).to.equal(dataCustodian.id);

});
