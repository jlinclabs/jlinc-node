'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.validateEntity', function() {
  withDidServer();

  beforeEach(async function() {
    this.entityA = await JLINC.createEntity();
    this.entityB = await JLINC.createEntity();
  });

  context('when given a valid entity', function(){
    it('should return true', function(){
      const { entityA, entityB } = this;
      expect(
        JLINC.validateEntity({ entity: entityA })
      ).to.be.true;
      expect(
        JLINC.validateEntity({ entity: entityB })
      ).to.be.true;
    });
  });

  context('when given a invalid entity', function(){
    it('should throw an error', function(){
      const { entityA, entityB } = this;

      const expectToThrow = (entity, errorMessage) => {
        expect(
          () => JLINC.validateEntity({ entity })
        ).to.throw(JLINC.InvalidEntityError, errorMessage);
      };

      expectToThrow(
        '',
        `entity must be of type object`,
      );

      [
        'did',
        'signingPublicKey',
        'signingPrivateKey',
        'encryptingPublicKey',
        'encryptingPrivateKey',
        'secret',
        'registrationSecret',
      ].forEach(key => {
        const entity = {...entityA};
        delete entity[key];
        expectToThrow(
          entity,
          `entity.${key} must be of type string`,
        );
      });

      expectToThrow(
        {...entityA, did: 'x'},
        `entity.did must be longer than 32 characters`,
      );

      Object.entries({
        signingPublicKey: 43,
        signingPrivateKey: 86,
        encryptingPublicKey: 43,
        encryptingPrivateKey: 43,
        secret: 32,
        registrationSecret: 64,
      }).forEach(([key, length]) => {
        const entity = {...entityA};
        entity[key] = 'hello';
        expectToThrow(
          entity,
          `entity.${key} must be of length ${length}`,
        );
      });

      [
        'signingPublicKey',
        'signingPrivateKey',
        'encryptingPublicKey',
        'encryptingPrivateKey',
        'secret',
        'registrationSecret',
      ].forEach(key => {
        const entity = {...entityA};
        entity[key] = `!${entity[key].slice(1)}`;
        expectToThrow(
          entity,
          `entity.${key} must be base64 encoded`,
        );
      });

      expectToThrow(
        {
          ...entityA,
          signingPublicKey: entityB.signingPublicKey,
        },
        'entity.signingPublicKey and entity.signingPrivateKey are not a valid signing keypair',
      );

      expectToThrow(
        {
          ...entityA,
          signingPrivateKey: entityB.signingPrivateKey,
        },
        'entity.signingPublicKey and entity.signingPrivateKey are not a valid signing keypair',
      );

      expectToThrow(
        {
          ...entityA,
          encryptingPublicKey: entityB.encryptingPublicKey,
        },
        'entity.encryptingPublicKey and entity.encryptingPrivateKey are not a valid encrypting keypair',
      );

      expectToThrow(
        {
          ...entityA,
          encryptingPrivateKey: entityB.encryptingPrivateKey,
        },
        'entity.encryptingPublicKey and entity.encryptingPrivateKey are not a valid encrypting keypair',
      );

    });
  });
});
