'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.signItem', function() {
  withDidServer();
  it('should sign the given item with the given privateKey', async function(){
    const rightsHolder = await JLINC.createRightsHolder();
    const itemToSign = 'people be swimming!';
    const privateKey = rightsHolder.signingPrivateKey;
    const publicKey = rightsHolder.signingPublicKey;

    const signature = JLINC.signItem({
      itemToSign,
      privateKey,
    });
    expect(signature).to.aBase64EncodedString();

    JLINC.verifySignature({
      itemSigned: itemToSign,
      signature,
      publicKey,
      contextUrl: JLINC.contextUrl,
    });
  });
});
