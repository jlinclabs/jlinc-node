'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.createSisaAgreement', function() {
  it('should create a valid SISA Agreement', function(){
    const sisaAgreement = JLINC.createSisaAgreement();
    expect(sisaAgreement).to.be.an('object');
    expect(sisaAgreement['@context']).to.equal('https://context.jlinc.org/v05/jlinc.jsonld');
    expect(sisaAgreement['jlincId']).to.match(/^[0-9a-f]{64}$/);
    expect(sisaAgreement['agreementURI']).to.equal('https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4');
    expect(sisaAgreement['iat']).to.be.aRecentSecondsFromEpochInteger();
  });

  it('should create a unique jlincId', function(){
    expect(JLINC.createSisaAgreement().jlincId).to.not.equal(JLINC.createSisaAgreement().jlincId);
  });
});
