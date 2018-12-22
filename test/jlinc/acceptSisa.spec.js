'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.acceptSisa', function() {
  withDidServer();

  beforeEach(async function() {
    const { sisaOffering, rightsHolder } = await this.generateSisa();
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
    expect(sisa).to.matchPattern({
      '@context': JLINC.contextUrl,
      acceptedSisaJwt: _.isJwtSignedWith(rightsHolder.secret),
      sisaId: _.isString,
    });

    const acceptedSisa = JLINC.decodeAndVerifyJwt({
      jwt: sisa.acceptedSisaJwt,
      secret: rightsHolder.secret,
    });
    expect(acceptedSisa).to.matchPattern({
      '@context': JLINC.contextUrl,
      offeredSisaJwt: _.isString,
      rightsHolderDid: rightsHolder.did,
      rightsHolderPublicKey: rightsHolder.signingPublicKey,
      rightsHolderSigType: JLINC.signatureType,
      rightsHolderSig: _.isString,
      createdAt: _.isRecentDatetimeInISOFormat,
    });
    expect(acceptedSisa.offeredSisaJwt).to.be.aJwtSignedWith(rightsHolder.secret);
    expect(acceptedSisa.offeredSisaJwt).to.be.aJwtEncodingOf(sisaOffering.offeredSisa);

    expect(
      JLINC.verifySignature({
        itemSigned: acceptedSisa.offeredSisaJwt,
        signature: acceptedSisa.rightsHolderSig,
        publicKey: rightsHolder.signingPublicKey,
        contextUrl: JLINC.contextUrl
      })
    ).to.be.true;
  });

});
