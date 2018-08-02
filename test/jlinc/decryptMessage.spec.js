'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.decryptMessage', function() {

  beforeEach(function() {
    this.dataCustodian = JLINC.createDataCustodian();
    this.rightsHolder = JLINC.createRightsHolder();
  });

  context('when given invalid arguments', function() {
    it('should throw an error', function(){
      expect(() => {
        JLINC.decryptMessage({

        });
      }).to.throw('encryptedMessage is required');

      expect(() => {
        JLINC.decryptMessage({
          encryptedMessage: 'foobar',
        });
      }).to.throw('encryptedMessage must be typeof object');

      expect(() => {
        JLINC.decryptMessage({
          encryptedMessage: {},
        });
      }).to.throw('encryptedMessage.payload is required');

      expect(() => {
        JLINC.decryptMessage({
          encryptedMessage: {
            payload: 'xxxx',
          },
        });
      }).to.throw('encryptedMessage.nonce is required');

      expect(() => {
        JLINC.decryptMessage({
          encryptedMessage: {
            payload: 'xxxx',
            nonce: 'opopopo',
          },
        });
      }).to.throw('senderPublicKey is required');

      expect(() => {
        JLINC.decryptMessage({
          encryptedMessage: {
            payload: 'xxxx',
            nonce: 'opopopo',
          },
          senderPublicKey: this.rightsHolder.publicKey,
        });
      }).to.throw('recipientPrivateKey is required');

      expect(() => {
        JLINC.decryptMessage({
          encryptedMessage: {
            payload: 'xxxx',
            nonce: 'opopopo',
          },
          senderPublicKey: this.rightsHolder.publicKey,
          recipientPrivateKey: this.dataCustodian.privateKey,
        });
      }).to.throw(JLINC.MessageDecryptionError, 'failed to decrypt message');

      const exampleEncryptedMessage = JLINC.encryptMessage({
        message: 'the cake is a lie!',
        senderPrivateKey: this.rightsHolder.privateKey,
        recipientPublicKey: this.dataCustodian.publicKey,
      });

      expect(() => {
        JLINC.decryptMessage({
          encryptedMessage: exampleEncryptedMessage,
          senderPublicKey: this.rightsHolder.publicKey,
          recipientPrivateKey: this.dataCustodian.privateKey,
        });
      }).to.not.throw();
    });
  });

  context('when given bad keys', function() {
    it('should throw a JLINC.MessageDecryptionError', function() {
      const encryptedMessage = JLINC.encryptMessage({
        message: 'plans are for fools!',
        senderPrivateKey: this.rightsHolder.privateKey,
        recipientPublicKey: this.dataCustodian.publicKey,
      });
      expect(() => {
        JLINC.decryptMessage({
          encryptedMessage: encryptedMessage,
          senderPublicKey: this.rightsHolder.publicKey.slice(0, -1)+'^',
          recipientPrivateKey: this.dataCustodian.privateKey.slice(0, -1)+'^',
        });
      }).to.throw(JLINC.MessageDecryptionError, 'failed to decrypt message');
    });
  });

  context('when given valid arguments', function() {
    it('should encrypt the given message and return a payload and nonce', function(){
      const encryptedMessage = JLINC.encryptMessage({
        message: 'pssst! what are you doing?',
        senderPrivateKey: this.rightsHolder.privateKey,
        recipientPublicKey: this.dataCustodian.publicKey,
      });

      const decryptedMessage = JLINC.decryptMessage({
        encryptedMessage,
        senderPublicKey: this.rightsHolder.publicKey,
        recipientPrivateKey: this.dataCustodian.privateKey,
      });

      expect(decryptedMessage).to.equal('pssst! what are you doing?');
    });
  });

});
