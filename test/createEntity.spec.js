'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

require('./setup');

describe('JLINC.createEntity', function() {
  it('should create a unique id, seed and secretKey', function() {
    const entity = JLINC.createEntity();
    expect(entity).to.be.an('object');
    expect(entity).to.have.all.keys('id', 'secretKey', 'nonce');
    expect(entity.id).to.be.aBase64EncodedString();
    expect(entity.id).to.have.lengthOf(43);
    expect(entity.secretKey).to.be.aBase64EncodedString();
    expect(entity.secretKey).to.have.lengthOf(86);
    expect(entity.nonce).to.be.aBase64EncodedString();
    expect(entity.nonce).to.have.lengthOf(32);

    expect(
      sodium.crypto_sign_open(
        sodium.crypto_sign(
          Buffer.from('frogs are fun to love', 'utf8'),
          b64.decode(entity.secretKey),
        ),
        b64.decode(entity.id)
      ).toString()
    ).to.equal('frogs are fun to love');
  });
});
