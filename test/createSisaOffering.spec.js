'use strict';

require('./setup');

describe('JLINC.createSisaOffering', function() {
  it('should require and validate a given sisaAgreement', function() {
    const sisaAgreement = JLINC.createSisaAgreement();

    expect(() => {
      JLINC.createSisaOffering();
    }).to.throw('sisaAgreement must be of type object');

    expect(() => {
      JLINC.createSisaOffering({
        sisaAgreement,
      });
    }).to.throw('dataCustodian must be of type object');
  });

  it('should generate a valid sisaAgreement', function() {
    const dataCustodian = JLINC.createEntity();
    const sisaAgreement = JLINC.createSisaAgreement();

    const sisaOffering = JLINC.createSisaOffering({
      sisaAgreement,
      dataCustodian,
    });

    expect(sisaOffering).to.be.an('object');
    expect(sisaOffering).to.have.all.keys('@context', 'offeredSisa');
    expect(sisaOffering['@context']).to.equal('https://context.jlinc.org/v05/jlinc.jsonld');
    expect(sisaOffering.offeredSisa).to.have.all.keys(
      '@context',
      'agreementJwt',
      'dataCustodianSigType',
      'dataCustodianID',
      'dataCustodianSig',
      'iat',
    );
    expect(sisaOffering.offeredSisa['@context']).to.equal('https://context.jlinc.org/v05/jlinc.jsonld');
    expect(sisaOffering.offeredSisa.agreementJwt).to.be.aJWTSignedWith(dataCustodian.secretKey);
    expect(sisaOffering.offeredSisa.agreementJwt).to.be.aJWTencodingOf(sisaAgreement);
    expect(sisaOffering.offeredSisa.dataCustodianSigType).to.be.a('string');
    expect(sisaOffering.offeredSisa.dataCustodianID).to.equal(dataCustodian.id);
    expect(sisaOffering.offeredSisa.dataCustodianSig).to.be.a('string');
    expect(sisaOffering.offeredSisa.iat).to.be.within(Date.now() - 100, Date.now());

    expect(
      JLINC.validateSignature({
        itemSigned: sisaOffering.offeredSisa.agreementJwt,
        signature: sisaOffering.offeredSisa.dataCustodianSig,
        publicKey: dataCustodian.id
      })
    ).to.be.true;
  });
});
