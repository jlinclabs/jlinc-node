'use strict';

const JLINC = require('../../jlinc');
const alicePublicKey = 'CDT7dy_1PJd_-z-2RNxYpRb3TCJ5hWJ6gQf4_yZor1I';
const alicePrivateKey = 'dmGTBLZUi944pEcnl3K8cvxl_FqY6EmgeKadlUtX3IAINPt3L_U8l3_7P7ZE3FilFvdMInmFYnqBB_j_JmivUg';
const bobPublicKey = 'kFan5g2lbOafqg7zC5LjXJ8gdfXWuWX3QJwZ2d0h3ew';
const bobPrivateKey = 'j2_u1v2YcwUVsVWhYIzjmi0djaj0bKt2yNH8BFxJ6MiQVqfmDaVs5p-qDvMLkuNcnyB19da5ZfdAnBnZ3SHd7A';
const wrongKey = '8NdnJrm2ZsB_n1HrrGnfbzUGAJ9ftvkdbX-SZqGKJpcMocVM4RxNh1DUQAPKFP3kD1SQyaWRCfz8K10eba_-mA';
const b64 = require('urlsafe-base64');
var aliceSends; var bobReceives; var message1; var message2;

describe('JLINC.pubkeyEncrypt and JLINC.pubkeyDecrypt', function() {

  it('should encrypt a message', function(){
    // Alice sends a message to Bob
    message1 = JSON.stringify({foo: 'foo', bar: 'bar'});
    aliceSends = JLINC.pubkeyEncrypt(
      { itemToEncrypt: message1,
        recipientPublicKey: bobPublicKey,
        senderPrivateKey: alicePrivateKey
      });

    expect(aliceSends).to.be.an('object');
    expect(aliceSends.cipherMsg).to.match(/^[\w\-]+$/);
    expect(aliceSends.nonce).to.match(/^[\w\-]+$/);
  });

  it('should fail to decrypt the message given wrong key', function() {
    expect(()=> {
      JLINC.pubkeyDecrypt(
        { itemToDecrypt: aliceSends.cipherMsg,
          nonce: aliceSends.nonce,
          senderPublicKey: alicePublicKey,
          recipientPrivateKey: wrongKey
        }).to.throw(JLINC.DecryptError);
    });
  });

  it('should decrypt the message', function() {
    bobReceives = JLINC.pubkeyDecrypt(
      { itemToDecrypt: aliceSends.cipherMsg,
        nonce: aliceSends.nonce,
        senderPublicKey: alicePublicKey,
        recipientPrivateKey: bobPrivateKey });

    expect(bobReceives).to.equal(message1);
  });

  it('should encrypt a message with private key as Buffer', function(){
  // Alice sends a message to Bob
    message2 = JSON.stringify({foo: 'bar', bar: 'foo'});
    aliceSends = JLINC.pubkeyEncrypt(
      { itemToEncrypt: message2,
        recipientPublicKey: bobPublicKey,
        senderPrivateKey: b64.decode(alicePrivateKey)
      });

    expect(aliceSends).to.be.an('object');
    expect(aliceSends.cipherMsg).to.match(/^[\w\-]+$/);
    expect(aliceSends.nonce).to.match(/^[\w\-]+$/);
  });

  it('should decrypt the message with private key as Buffer', function() {
    bobReceives = JLINC.pubkeyDecrypt(
      { itemToDecrypt: aliceSends.cipherMsg,
        nonce: aliceSends.nonce,
        senderPublicKey: alicePublicKey,
        recipientPrivateKey: b64.decode(bobPrivateKey)
      });

    expect(bobReceives).to.equal(message2);
  });

});
