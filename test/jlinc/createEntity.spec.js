'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.createEntity', function() {
  it('should create a unique id, seed and privateKey', function() {
    const entity = JLINC.createEntity();
    expect(entity).to.be.an('object');
    expect(entity).to.have.all.keys('publicKey', 'privateKey', 'secret');
    expect(entity.publicKey).to.be.aBase64EncodedString();
    expect(entity.publicKey).to.have.lengthOf(43);
    expect(entity.privateKey).to.be.aBase64EncodedString();
    expect(entity.privateKey).to.have.lengthOf(86);
    expect(entity.secret).to.be.aBase64EncodedString();
    expect(entity.secret).to.have.lengthOf(32);

    expect(
      sodium.crypto_sign_open(
        sodium.crypto_sign(
          Buffer.from('frogs are fun to love', 'utf8'),
          b64.decode(entity.privateKey),
        ),
        b64.decode(entity.publicKey)
      ).toString()
    ).to.equal('frogs are fun to love');
  });
});
