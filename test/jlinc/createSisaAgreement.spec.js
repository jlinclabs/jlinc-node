'use strict';

require('../setup');

describe('JLINC.createSisaAgreement', function() {
  it('should create a valid SISA Agreement', function(){
    const sisaAgreement = JLINC.createSisaAgreement();
    expect(sisaAgreement).to.be.an('object');
    expect(sisaAgreement['@context']).to.equal('https://context.jlinc.org/v05/jlinc.jsonld');
    expect(sisaAgreement['jlincID']).to.match(/^[0-9a-f]{64}$/);
    expect(sisaAgreement['agreementURI']).to.equal('https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4');
    expect(sisaAgreement['iat']).to.be.within(Date.now() - 10, Date.now());
  });

  it('should create a unique jlincID', function(){
    expect(JLINC.createSisaAgreement().jlincID).to.not.equal(JLINC.createSisaAgreement().jlincID);
  });
});
