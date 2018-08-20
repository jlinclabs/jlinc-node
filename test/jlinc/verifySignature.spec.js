'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.verifySignature', function() {

  it('should validate that the given signature is a signature of the give itemSigned and publicKey', function(){
    const rightsHolder = JLINC.createRightsHolder();
    const itemToSign = 'donkeys need food too';

    const signature = JLINC.signItem({
      itemToSign,
      privateKey: rightsHolder.privateKey,
    });

    expect(
      JLINC.verifySignature({
        signature,
        publicKey: rightsHolder.publicKey,
        itemSigned: itemToSign,
        version: JLINC.contextUrl
      })
    ).to.be.true;

    expect(() => {
      JLINC.verifySignature({
        signature: 'some fake signature i made up',
        publicKey: rightsHolder.publicKey,
        itemSigned: itemToSign,
        version: JLINC.contextUrl
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.verifySignature({
        signature,
        publicKey: JLINC.createRightsHolder().publicKey, // using the wrong public key
        itemSigned: itemToSign,
        version: JLINC.contextUrl
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.verifySignature({
        signature,
        publicKey: rightsHolder.publicKey,
        itemSigned: 'this is not the item that was signed',
        version: JLINC.contextUrl
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');
  });

});
