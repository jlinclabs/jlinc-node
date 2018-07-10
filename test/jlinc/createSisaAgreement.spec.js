'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.createSisaAgreement', function() {
  it('should create a valid SISA Agreement', function(){
    const sisaAgreement = JLINC.createSisaAgreement();
    expect(sisaAgreement).to.be.an('object');
    expect(sisaAgreement['@context']).to.equal(JLINC.contextUrl);
    expect(sisaAgreement.jlincId).to.be.aNonce();
    expect(sisaAgreement.agreementURI).to.equal(JLINC.defaultAgreementURI);
    expect(sisaAgreement.iat).to.be.aRecentSecondsFromEpochInteger();
  });

  it('should take a custom agreementURI', async function(){
    const agreementURI = 'https://i.chzbgr.com/full/9030025216/h6A62FDCB/';
    const sisaAgreement = JLINC.createSisaAgreement({ agreementURI });
    expect(sisaAgreement).to.be.an('object');
    expect(sisaAgreement['@context']).to.equal(JLINC.contextUrl);
    expect(sisaAgreement.jlincId).to.be.aNonce();
    expect(sisaAgreement.agreementURI).to.equal(agreementURI);
    expect(sisaAgreement.iat).to.be.aRecentSecondsFromEpochInteger();
  });

  it('should create a unique jlincId', function(){
    expect(JLINC.createSisaAgreement().jlincId).to.not.equal(JLINC.createSisaAgreement().jlincId);
  });
});
