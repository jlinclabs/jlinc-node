'use strict';

require('../setup');

describe('JLINC.validateEntity', function() {
  it('should validate a given entity', function(){
    const validEntity = JLINC.createEntity();

    expect(() => {
      JLINC.validateEntity({});
    }).to.throw('entity must be of type object');

    expect(() => {
      JLINC.validateEntity({
        entity: {},
      });
    }).to.throw('entity must have key "id"');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          id: 42,
        },
      });
    }).to.throw('entity.id must be of type string');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          id: 'same shit id',
        },
      });
    }).to.throw('entity.id must be of length 43');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          id: validEntity.id,
        },
      });
    }).to.throw('entity must have key "secretKey"');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          id: validEntity.id,
          secretKey: undefined,
        },
      });
    }).to.throw('entity.secretKey must be of type string');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          id: validEntity.id,
          secretKey:'same shit secretKey',
        },
      });
    }).to.throw('entity.secretKey must be of length 86');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          id: validEntity.id,
          secretKey: validEntity.secretKey,
        },
      });
    }).to.throw('entity must have key "nonce"');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          id: validEntity.id,
          secretKey: validEntity.secretKey,
          nonce: 99999,
        },
      });
    }).to.throw('entity.nonce must be of type string');

    expect(() => {
      JLINC.validateEntity({
        entity: {
          id: validEntity.id,
          secretKey: validEntity.secretKey,
          nonce: 'some bunk nonce',
        },
      });
    }).to.throw('entity.nonce must be of length 32');

    expect(
      JLINC.validateEntity({
        entity: {
          id: validEntity.id,
          secretKey: validEntity.secretKey,
          nonce:  validEntity.nonce,
        },
      })
    ).to.be.true;

  });
});
