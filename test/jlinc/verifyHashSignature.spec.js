'use strict';

const JLINC = require('../../jlinc');
const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

describe('JLINC.verifyHashSignature', function() {

  it('should validate that the given signature is a signature of the given signed hash and publicKey', function(){
    const rightsHolder = JLINC.createRightsHolder();
    const hashToSign = b64.encode(sodium.crypto_hash_sha256(Buffer.from('A perfect and absolute blank!')));

    const signature = JLINC.signHash({
      hashToSign,
      privateKey: rightsHolder.privateKey,
    });

    expect(
      JLINC.verifyHashSignature({
        signature,
        publicKey: rightsHolder.publicKey,
        signed: hashToSign,
      })
    ).to.be.true;

    expect(() => {
      JLINC.verifyHashSignature({
        signature: 'some fake signature Jared made up',
        publicKey: rightsHolder.publicKey,
        signed: hashToSign,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.verifyHashSignature({
        signature,
        publicKey: JLINC.createRightsHolder().publicKey, // using the wrong public key
        signed: hashToSign,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.verifyHashSignature({
        signature,
        publicKey: rightsHolder.publicKey,
        signed: 'this is not the item that was signed',
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');
  });

});
