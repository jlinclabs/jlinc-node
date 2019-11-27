'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.validateEncryptingKeypair', function() {
  withDidServer();

  context('when the keys are blank', function(){
    it('should throw a JLINC.InvalidKeyError', async function(){
      expect(
        () => JLINC.validateEncryptingKeypair({})
      ).to.throw(JLINC.InvalidKeyError, 'invalid encrypting keypair');
    });
  });

  context('when the keys are not real keys', function(){
    it('should throw a JLINC.InvalidKeyError', async function(){
      expect(
        () => JLINC.validateEncryptingKeypair({
          publicKey: 'xxxx',
          privateKey: 'yyyy',
        })
      ).to.throw(JLINC.InvalidKeyError, 'invalid encrypting keypair');
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
          () => JLINC.validateEncryptingKeypair({
            publicKey: entityA.encryptingPublicKey,
            privateKey: entityB.encryptingPrivateKey,
          })
        ).to.throw(JLINC.InvalidKeyError, 'invalid encrypting keypair');
      });
    });
    context('but they are backwards', function(){
      it('should throw a JLINC.InvalidKeyError', async function(){
        expect(
          () => JLINC.validateEncryptingKeypair({
            publicKey: entityA.encryptingPrivateKey,
            privateKey: entityA.encryptingPublicKey,
          })
        ).to.throw(JLINC.InvalidKeyError, 'invalid encrypting keypair');
      });
    });
    context('but they are both public keys', function(){
      it('should throw a JLINC.InvalidKeyError', async function(){
        expect(
          () => JLINC.validateEncryptingKeypair({
            publicKey: entityA.encryptingPublicKey,
            privateKey: entityB.encryptingPublicKey,
          })
        ).to.throw(JLINC.InvalidKeyError, 'invalid encrypting keypair');
      });
    });
    context('but they are both private keys', function(){
      it('should throw a JLINC.InvalidKeyError', async function(){
        expect(
          () => JLINC.validateEncryptingKeypair({
            publicKey: entityA.encryptingPrivateKey,
            privateKey: entityB.encryptingPrivateKey,
          })
        ).to.throw(JLINC.InvalidKeyError, 'invalid encrypting keypair');
      });
    });
  });

  context('when given valid keys', function(){
    it('should return true', async function(){
      const entity = await JLINC.createEntity();
      expect(
        JLINC.validateEncryptingKeypair({
          publicKey: entity.encryptingPublicKey,
          privateKey: entity.encryptingPrivateKey,
        })
      ).to.be.true;
    });
  });
});
