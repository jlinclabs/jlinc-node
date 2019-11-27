'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.validateSigningKeypair', function() {
  withDidServer();

  context('when the keys are blank', function(){
    it('should throw a JLINC.InvalidKeyError', async function(){
      expect(
        () => JLINC.validateSigningKeypair({})
      ).to.throw(JLINC.InvalidKeyError, 'invalid signing keypair');
    });
  });

  context('when the keys are not real keys', function(){
    it('should throw a JLINC.InvalidKeyError', async function(){
      expect(
        () => JLINC.validateSigningKeypair({
          publicKey: 'xxxx',
          privateKey: 'yyyy',
        })
      ).to.throw(JLINC.InvalidKeyError, 'invalid signing keypair');
    });
  });

  context('when the keys are real keys', function(){
    let entityA, entityB;
    beforeEach(async function(){
      [entityA, entityB] = await Promise.all([
        JLINC.createEntity(),
        JLINC.createEntity(),
      ]);
    });
    context('but they do not match', function(){
      it('should throw a JLINC.InvalidKeyError', async function(){
        expect(
          () => JLINC.validateSigningKeypair({
            publicKey: entityA.signingPublicKey,
            privateKey: entityB.signingPrivateKey,
          })
        ).to.throw(JLINC.InvalidKeyError, 'invalid signing keypair');
      });
    });
    context('but they are backwards', function(){
      it('should throw a JLINC.InvalidKeyError', async function(){
        expect(
          () => JLINC.validateSigningKeypair({
            publicKey: entityA.signingPrivateKey,
            privateKey: entityA.signingPublicKey,
          })
        ).to.throw(JLINC.InvalidKeyError, 'invalid signing keypair');
      });
    });
  });

  context('when given valid keys', function(){
    it('should return true', async function(){
      const entity = await JLINC.createEntity();
      expect(
        JLINC.validateSigningKeypair({
          publicKey: entity.signingPublicKey,
          privateKey: entity.signingPrivateKey,
        })
      ).to.be.true;
    });
  });
});
