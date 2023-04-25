'use strict';

const JLINC = require('../../jlinc');
const sodium = require('sodium-native');
const b64 = require('urlsafe-base64');

describe('JLINC.verifyHashSignature', function() {

  before(function(){
    const publicKey = 'xkgJW2lkSgD3sHF0bsGqiWBuA6ViJDyiKzJjw6RLNcU';
    const privateKey = 'Qzq373Tu3VSu9GqFTkLWssovraDW8T534icxS5nT6gPGSAlbaWRKAPewcXRuwaqJYG4DpWIkPKIrMmPDpEs1xQ';
    const hash = Buffer.alloc(sodium.crypto_hash_sha256_BYTES);
    sodium.crypto_hash_sha256(hash, Buffer.from('A perfect and absolute blank!'));
    const signed = b64.encode(hash);
    const signature = JLINC.signHash({ hashToSign: signed, privateKey });
    Object.assign(this, { publicKey, signed, signature });
  });


  context('when given valid arguments', function(){
    it('should return true', function(){
      const { publicKey, signed, signature } = this;
      expect(
        JLINC.verifyHashSignature({
          signature,
          publicKey,
          signed,
        })
      ).to.be.true;
    });
  });

  context('when given a signature, publicKey and signed that do not match', function(){
    it('should throw an InvalidSignatureError', function(){
      const { publicKey, signed, signature } = this;
      expect(() => {
        JLINC.verifyHashSignature({
          signature: 'some fake signature Jared made up',
          publicKey,
          signed,
        });
      }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

      expect(()=>{
        JLINC.verifyHashSignature({
          signature,
          publicKey: 'aqYorRm7-twGJ7WC5J2F1bMYxnkfB6Iy5rBn2ZzEGNA',
          signed,
        });
      }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

      expect(()=>{
        JLINC.verifyHashSignature({
          signature,
          publicKey,
          signed: 'this is not the item that was signed',
        });
      }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');
    });
  });

});
