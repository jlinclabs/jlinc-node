'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.acceptSisa', function() {

  beforeEach(function() {
    const { sisaOffering, rightsHolder } = this.generateSisa();
    Object.assign(this, { sisaOffering, rightsHolder });
  });

  it('should validate the given offeredSisa and rightsHolder', function() {
    expect(() => {
      JLINC.acceptSisa({});
    }).to.throw('sisaOffering is reqiured');

    expect(() => {
      JLINC.acceptSisa({
        sisaOffering: {},
      });
    }).to.throw('rightsHolder is reqiured');
  });

  it('should sign the offeredSisa', function() {
    const { sisaOffering, rightsHolder } = this;
    const sisa = JLINC.acceptSisa({ sisaOffering, rightsHolder });

    expect(sisa).to.be.an('object');
    expect(sisa).to.be.serializable();

    expect(sisa['@context']).to.equal(JLINC.contextUrl);
    expect(sisa.acceptedSisaJwt).to.be.aJwtSignedWith(this.rightsHolder.secret);
    expect(sisa.sisaId).to.be.a('string');

    const acceptedSisa = JLINC.decodeAndVerifyJwt({
      jwt: sisa.acceptedSisaJwt,
      secret: this.rightsHolder.secret,
    });
    expect(acceptedSisa['@context']).to.equal(JLINC.contextUrl);
    expect(acceptedSisa.offeredSisaJwt).to.be.aJwtSignedWith(this.rightsHolder.secret);
    expect(acceptedSisa.offeredSisaJwt).to.be.aJwtEncodingOf(sisaOffering.offeredSisa);
    expect(acceptedSisa.rightsHolderSigType).to.equal('sha256:ed25519');
    expect(acceptedSisa.rightsHolderId).to.equal(this.rightsHolder.publicKey);
    expect(acceptedSisa.rightsHolderSig).to.be.a('string');
    expect(acceptedSisa.iat).to.be.aRecentSecondsFromEpochInteger();

    expect(
      JLINC.verifySignature({
        itemSigned: acceptedSisa.offeredSisaJwt,
        signature: acceptedSisa.rightsHolderSig,
        publicKey: this.rightsHolder.publicKey,
      })
    ).to.be.true;
  });

});
