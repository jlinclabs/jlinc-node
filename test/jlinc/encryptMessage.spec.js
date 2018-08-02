'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.encryptMessage', function() {

  beforeEach(function() {
    this.dataCustodian = JLINC.createDataCustodian();
    this.rightsHolder = JLINC.createRightsHolder();
  });

  context('when given invalid arguments', function() {
    it('should throw an error', function(){
      expect(() => {
        JLINC.encryptMessage({

        });
      }).to.throw('message is required');

      expect(() => {
        JLINC.encryptMessage({
          message: 'foobar',
        });
      }).to.throw('senderPrivateKey is required');

      expect(() => {
        JLINC.encryptMessage({
          message: 'foobar',
          senderPrivateKey: this.rightsHolder.privateKey,
        });
      }).to.throw('recipientPublicKey is required');

      expect(() => {
        JLINC.encryptMessage({
          message: 'foobar',
          senderPrivateKey: this.rightsHolder.privateKey,
          recipientPublicKey: this.dataCustodian.publicKey,
        });
      }).to.not.throw();
    });
  });

  context('when given bad keys', function() {
    it('should throw a JLINC.MessageEncryptionError', function() {
      expect(() => {
        JLINC.encryptMessage({
          message: 'foobar',
          senderPrivateKey: this.rightsHolder.privateKey.slice(0, -1)+'^',
          recipientPublicKey: this.dataCustodian.publicKey.slice(0, -1)+'^',
        });
      }).to.throw(JLINC.MessageEncryptionError, 'failed to encrypt message');
    });
  });

  context('when given valid arguments', function() {
    it('should encrypt the given message and return a payload and nonce', function(){
      const encryptedMessageFromAliceToBob = JLINC.encryptMessage({
        message: 'Yo bob, change my last name to Awesomesauce',
        senderPrivateKey: this.rightsHolder.privateKey,
        recipientPublicKey: this.dataCustodian.publicKey,
      });

      expect(encryptedMessageFromAliceToBob).to.be.an('object');
      expect(encryptedMessageFromAliceToBob.payload).to.be.aBase64EncodedString();
      expect(encryptedMessageFromAliceToBob.nonce).to.be.aBase64EncodedString();
    });
  });

});
