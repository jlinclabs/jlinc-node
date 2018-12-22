'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifySignature', function() {
  withDidServer();

  beforeEach(function() {
    const publicKey = 'xkgJW2lkSgD3sHF0bsGqiWBuA6ViJDyiKzJjw6RLNcU';
    const privateKey = 'Qzq373Tu3VSu9GqFTkLWssovraDW8T534icxS5nT6gPGSAlbaWRKAPewcXRuwaqJYG4DpWIkPKIrMmPDpEs1xQ';
    const itemSigned = 'donkeys need food too';
    const signature = JLINC.signItem({
      itemToSign: itemSigned,
      privateKey,
    });
    Object.assign(this, { itemSigned, signature, publicKey });
  });

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      const { itemSigned, signature, publicKey } = this;

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
      }).to.not.throw();
    });
  });


  it('should validate that the given signature is a signature of the give itemSigned and publicKey', function(){
    const { itemSigned, signature, publicKey } = this;

    expect(
      JLINC.verifySignature({
        signature,
        publicKey,
        itemSigned,
      })
    ).to.be.true;

    expect(() => {
      JLINC.verifySignature({
        signature: 'some fake signature i made up',
        publicKey,
        itemSigned,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.verifySignature({
        signature,
        publicKey: 'aqYorRm7-twGJ7WC5J2F1bMYxnkfB6Iy5rBn2ZzEGNA', // using the wrong public key
        itemSigned,
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');

    expect(()=>{
      JLINC.verifySignature({
        signature,
        publicKey,
        itemSigned: 'this is not the item that was signed',
      });
    }).to.throw(JLINC.InvalidSignatureError, 'invalid signature');
  });

});
