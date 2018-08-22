'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.createSisaOffering', function() {

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(() => {
        JLINC.createSisaOffering({

        });
      }).to.throw('dataCustodian is required');
    });
  });

  it('should create a valid sisa offering', function() {
    const dataCustodian = JLINC.createDataCustodian();

    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });

    expect(sisaOffering).to.be.an('object');
    expect(sisaOffering).to.be.serializable();

    expect(sisaOffering).to.have.all.keys('@context', 'offeredSisa');
    expect(sisaOffering['@context']).to.equal(JLINC.contextUrl);
    expect(sisaOffering.offeredSisa).to.have.all.keys(
      '@context',
      'agreementJwt',
      'dataCustodianSigType',
      'dataCustodianId',
      'dataCustodianSig',
      'createdAt',
    );
    expect(sisaOffering.offeredSisa['@context']).to.equal(JLINC.contextUrl);
    expect(sisaOffering.offeredSisa.agreementJwt).to.be.aJwtSignedWith(dataCustodian.secret);
    expect(sisaOffering.offeredSisa.dataCustodianSigType).to.be.a('string');
    expect(sisaOffering.offeredSisa.dataCustodianId).to.equal(dataCustodian.publicKey);
    expect(sisaOffering.offeredSisa.dataCustodianSig).to.be.a('string');
    expect(sisaOffering.offeredSisa.createdAt).to.be.aRecentDatetimeInISOFormat();

    const agreement = JLINC.decodeAndVerifyJwt({
      jwt: sisaOffering.offeredSisa.agreementJwt,
      secret: dataCustodian.secret,
    });

    expect(agreement['@context']).to.equal(JLINC.contextUrl);
    expect(agreement.jlincId).to.be.aNonce();
    expect(agreement.agreementURI).to.equal(JLINC.defaultAgreementURI);

    expect(
      JLINC.verifySignature({
        itemSigned: sisaOffering.offeredSisa.agreementJwt,
        signature: sisaOffering.offeredSisa.dataCustodianSig,
        publicKey: dataCustodian.publicKey,
        contextUrl: JLINC.contextUrl
      })
    ).to.be.true;
  });
});
