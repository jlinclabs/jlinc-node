'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.validateEntity', function() {
  it('should validate a given entity', function(){
    const validEntity = JLINC.createEntity();

    expect(() => {
      JLINC.validateEntity({});
    }).to.throw(JLINC.InvalidEntityError, 'entity must be of type object');

    expect(() => {
      JLINC.validateEntity({
        entity: {},
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity must have key "publicKey"');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          publicKey: 42,
        },
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity.publicKey must be of type string');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          publicKey: 'same shit id',
        },
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity.publicKey must be of length 43');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          publicKey: validEntity.publicKey,
        },
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity must have key "privateKey"');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          publicKey: validEntity.publicKey,
          privateKey: undefined,
        },
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity.privateKey must be of type string');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          publicKey: validEntity.publicKey,
          privateKey:'same shit privateKey',
        },
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity.privateKey must be of length 86');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          publicKey: validEntity.publicKey,
          privateKey: validEntity.privateKey,
        },
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity must have key "secret"');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          publicKey: validEntity.publicKey,
          privateKey: validEntity.privateKey,
          secret: 99999,
        },
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity.secret must be of type string');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          publicKey: validEntity.publicKey,
          privateKey: validEntity.privateKey,
          secret: 'some bunk secret',
        },
      });
    }).to.throw(JLINC.InvalidEntityError, 'entity.secret must be of length 32');

    expect(
      JLINC.validateEntity({
        entity: {
          publicKey: validEntity.publicKey,
          privateKey: validEntity.privateKey,
          secret:  validEntity.secret,
        },
      })
    ).to.be.true;

  });
});
