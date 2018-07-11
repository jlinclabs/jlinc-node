'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.validateSignature', function() {

  it('should validate that the given signature is a signature of the give itemSigned and publicKey', function(){
    const entity = JLINC.createEntity();
    const itemToSign = 'donkeys need food too';

    const signature = JLINC.signItem({
      itemToSign,
      privateKey: entity.privateKey,
    });

    expect(
      JLINC.validateSignature({
        signature,
        publicKey: entity.publicKey,
        itemSigned: itemToSign,
      })
    ).to.be.true;

    expect(() => {
      JLINC.validateSignature({
        signature: 'some fake signature i made up',
        publicKey: entity.publicKey,
        itemSigned: itemToSign,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.validateSignature({
        signature,
        publicKey: JLINC.createEntity().publicKey, // using the wrong public key
        itemSigned: itemToSign,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.validateSignature({
        signature,
        publicKey: entity.publicKey,
        itemSigned: 'this is not the item that was signed',
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');
  });

});
