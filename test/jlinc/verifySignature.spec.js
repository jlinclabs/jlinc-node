'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.verifySignature', function() {

  beforeEach(function() {
    const rightsHolder = JLINC.createRightsHolder();
    const itemSigned = 'donkeys need food too';
    const signature = JLINC.signItem({
      itemToSign: itemSigned,
      privateKey: rightsHolder.privateKey,
    });
    const publicKey = rightsHolder.publicKey;
    const contextUrl = JLINC.contextUrl;
    Object.assign(this, { itemSigned, signature, publicKey, contextUrl });
  });

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      const { itemSigned, signature, publicKey, contextUrl } = this;

      expect(()=>{
        JLINC.verifySignature({

        });
      }).to.throw('itemSigned is required');

      expect(()=>{
        JLINC.verifySignature({
          itemSigned,
        });
      }).to.throw('signature is required');

      expect(()=>{
        JLINC.verifySignature({
          itemSigned,
          signature,
        });
      }).to.throw('publicKey is required');

      expect(()=>{
        JLINC.verifySignature({
          itemSigned,
          signature,
          publicKey,
        });
      }).to.throw('contextUrl is required');

      expect(()=>{
        JLINC.verifySignature({
          itemSigned,
          signature,
          publicKey,
          contextUrl,
        });
      }).to.not.throw();
    });
  });


  it('should validate that the given signature is a signature of the give itemSigned and publicKey', function(){
    const { itemSigned, signature, publicKey, contextUrl } = this;

    expect(
      JLINC.verifySignature({
        signature,
        publicKey,
        itemSigned,
        contextUrl,
      })
    ).to.be.true;

    expect(() => {
      JLINC.verifySignature({
        signature: 'some fake signature i made up',
        publicKey,
        itemSigned,
        contextUrl,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.verifySignature({
        signature,
        publicKey: JLINC.createRightsHolder().publicKey, // using the wrong public key
        itemSigned,
        contextUrl,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.verifySignature({
        signature,
        publicKey,
        itemSigned: 'this is not the item that was signed',
        contextUrl,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');
  });

});
