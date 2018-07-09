'use strict';

const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

require('../setup');

describe('JLINC.validateSignature', function() {

  it('should validate that the given signature is a signature of the give itemSigned and publicKey', function(){
    const entity = JLINC.createEntity();
    const itemToSign = 'donkeys need food too';

    const signature = JLINC.signItem({
      itemToSign,
      secretKey: entity.secretKey,
    });

    expect(
      JLINC.validateSignature({
        signature,
        publicKey: entity.id,
        itemSigned: itemToSign,
      })
    ).to.be.true;

    expect(
      JLINC.validateSignature({
        signature: 'some fake signature i made up',
        publicKey: entity.id,
        itemSigned: itemToSign,
      })
    ).to.be.false;

    expect(
      JLINC.validateSignature({
        signature,
        publicKey: JLINC.createEntity().id, // using the wrong public key
        itemSigned: itemToSign,
      })
    ).to.be.false;

    expect(
      JLINC.validateSignature({
        signature,
        publicKey: entity.id,
        itemSigned: 'this is not the item that was signed',
      })
    ).to.be.false;
  });

});
