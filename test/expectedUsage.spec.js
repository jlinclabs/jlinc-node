'use strict';

require('./setup');
const JLINC = require('../jlinc');

it('expected usage', function() {

  /*
   * done by bob on the B API
   */

  // bob is a data custodian
  const dataCustodian = JLINC.createEntity();

  // bob can validate his dataCustodian object anytime
  expect( JLINC.validateDataCustodian({ dataCustodian }) ).to.be.true;

  // bob creates a sisa agreement
  const sisaAgreement = JLINC.createSisaAgreement();

  // bob can validate any sisa agreement he creates
  expect( JLINC.validateSisaAgreement({ sisaAgreement }) ).to.be.true;

  // bob creates a sisa offering for that sisa agreement
  const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });

  // bob sends the sisa offering to alice

  /*
   * done by alice on the A API
   */

  // alice extracts the offered sisa from the sisa offering
  const { offeredSisa } = sisaOffering;

  // alice validates that this offered sisa was signed by the bob she's expecting
  expect( JLINC.validateOfferedSisa({ offeredSisa, dataCustodian: { id: dataCustodian.id } }) ).to.be.true;

  // an error is thrown when the offered sisa was not signed by the bob alice is expecting
  expect(() => {
    JLINC.validateOfferedSisa({ offeredSisa, dataCustodian: { id: JLINC.createEntity().id } });
  }).to.throw('offeredSisa.dataCustodianId does not match given dataCustodian');

  // alice is a rights holder, she needs these keys for every sisa she signs
  const rightsHolder = JLINC.createEntity();

  // alice can validate her rightsHolder object anytime
  expect( JLINC.validateRightsHolder({ rightsHolder }) ).to.be.true;

  // alice accepts the sisa bob offered her
  const sisa = JLINC.acceptSisa({ offeredSisa, rightsHolder });

  // alice can validate that this sisa was signed by her
  expect( JLINC.validateSisa({ sisa, rightsHolder }) ).to.be.true;

  // an error is thrown when this sisa is not signed by her
  expect(() => {
    JLINC.validateSisa({ sisa, rightsHolder: JLINC.createEntity() });
  }).to.throw('sisa.acceptedSisa.rightsHolderId does not match given rightsHolder');

  // alice sends bob back the sisa

  /*
   * done by bob on the B API
   */

  // bob validates that the returned sisa was originally signed by him
  expect( JLINC.validateSisa({ sisa, dataCustodian }) ).to.be.true;

  // an error is thrown when the returned sisa is not signed by bob
  expect(() => {
    JLINC.validateSisa({ sisa, dataCustodian: JLINC.createEntity() });
  }).to.throw('sisa.acceptedSisa.offeredSisa.agreementJwt was not signed by the given dataCustodian');

  // bob stores the sisa as well as the expanded sisa
  const expandedSisa = JLINC.expandSisa({ sisa });




});
