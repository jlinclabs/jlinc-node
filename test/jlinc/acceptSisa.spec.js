'use strict';

const jsonwebtoken = require('jsonwebtoken');

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.acceptSisa', function() {

  beforeEach(function() {


    const { offeredSisa, rightsHolder } = this.generateSisa();
    this.offeredSisa = offeredSisa;
    this.rightsHolder = rightsHolder;
    // const dataCustodian = JLINC.createEntity();
    // const sisaAgreement = JLINC.createSisaAgreement();
    // const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });
    // const { offeredSisa } = sisaOffering;
    // this.offeredSisa = offeredSisa;
    // this.rightsHolder = JLINC.createEntity();
  });

  it('should validate the given offeredSisa and rightsHolder', function() {
    expect(() => {
      JLINC.acceptSisa({});
    }).to.throw('offeredSisa must be of type object');

    expect(() => {
      JLINC.acceptSisa({
        offeredSisa: {},
      });
    }).to.throw('offeredSisa must have key "@context"');

    expect(() => {
      JLINC.acceptSisa({
        offeredSisa: this.offeredSisa,
      });
    }).to.throw('rightsHolder must be of type object');

    expect(() => {
      JLINC.acceptSisa({
        offeredSisa: this.offeredSisa,
        rightsHolder: {},
      });
    }).to.throw('rightsHolder must have key "publicKey"');

    expect(() => {
      JLINC.acceptSisa({
        offeredSisa: this.offeredSisa,
        rightsHolder: this.rightsHolder,
      });
    }).to.not.throw();
  });

  it('should sign the offeredSisa', function() {
    const sisa = JLINC.acceptSisa({
      offeredSisa: this.offeredSisa,
      rightsHolder: this.rightsHolder,
    });

    expect(sisa).to.be.an('object');
    expect(sisa['@context']).to.equal(JLINC.contextUrl);
    expect(sisa.acceptedSisaJwt).to.be.aJWTSignedWith(this.rightsHolder.privateKey);
    expect(sisa.sisaId).to.be.a('string');

    const acceptedSisa = jsonwebtoken.verify(sisa.acceptedSisaJwt, this.rightsHolder.privateKey);
    expect(acceptedSisa['@context']).to.equal(JLINC.contextUrl);
    expect(acceptedSisa.offeredSisaJwt).to.be.aJWTSignedWith(this.rightsHolder.privateKey);
    expect(acceptedSisa.offeredSisaJwt).to.be.aJWTEncodingOf(this.offeredSisa);
    expect(acceptedSisa.rightsHolderSigType).to.equal('sha256:ed25519');
    expect(acceptedSisa.rightsHolderId).to.equal(this.rightsHolder.publicKey);
    expect(acceptedSisa.rightsHolderSig).to.be.a('string');
    expect(acceptedSisa.iat).to.be.aRecentSecondsFromEpochInteger();

    expect(
      JLINC.validateSignature({
        itemSigned: acceptedSisa.offeredSisaJwt,
        signature: acceptedSisa.rightsHolderSig,
        publicKey: this.rightsHolder.publicKey,
      })
    ).to.be.true;
  });

});
