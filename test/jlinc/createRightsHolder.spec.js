'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.createRightsHolder', function() {

  withDidServer();

  it('should create a unique publicKey, privateKey and secret', async function() {
    const a = await JLINC.createRightsHolder();
    expect(a).to.be.aJlincEntity();
    expect(a).to.matchPattern({
      did: _.isJlincDid,
      signingPublicKey: _.isSigningPublicKey,
      signingPrivateKey: _.isSigningPrivateKey,
      encryptingPublicKey: _.isEncryptingPublicKey,
      encryptingPrivateKey: _.isEncryptingPrivateKey,
      registrationSecret: _.isString,
      secret: _.isString,
    });
    const b = await JLINC.createRightsHolder();
    expect(a.signingPublicKey    ).to.not.equal(b.signingPublicKey);
    expect(a.signingPrivateKey   ).to.not.equal(b.signingPrivateKey);
    expect(a.encryptingPublicKey ).to.not.equal(b.encryptingPublicKey);
    expect(a.encryptingPrivateKey).to.not.equal(b.encryptingPrivateKey);
    expect(a.registrationSecret  ).to.not.equal(b.registrationSecret);
  });
});
