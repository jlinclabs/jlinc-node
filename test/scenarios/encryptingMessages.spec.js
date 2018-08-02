'use strict';

const JLINC = require('../../jlinc');

it('encrypting messages', function() {
  const dataCustodian = JLINC.createDataCustodian();
  const rightsHolder = JLINC.createRightsHolder();

  // alice sends an encrypted message to bob
  const encryptedMessageFromAliceToBob = JLINC.encryptMessage({
    message: 'Yo bob, change my last name to Awesomesauce',
    senderPrivateKey: rightsHolder.privateKey,
    recipientPublicKey: dataCustodian.publicKey,
  });

  expect(encryptedMessageFromAliceToBob).to.be.an('object');
  expect(encryptedMessageFromAliceToBob.payload).to.be.aBase64EncodedString();
  expect(encryptedMessageFromAliceToBob.nonce).to.be.aBase64EncodedString();

  // bob decrypts the messages send from alice
  const decryptedMessageFromAliceToBob = JLINC.decryptMessage({
    encryptedMessage: encryptedMessageFromAliceToBob,
    senderPublicKey: rightsHolder.publicKey,
    recipientPrivateKey: dataCustodian.privateKey,
  });

  expect(decryptedMessageFromAliceToBob).to.equal('Yo bob, change my last name to Awesomesauce');

  // bob sends an encrypted message to back to alice
  const encryptedMessageFromBobToAlice = JLINC.encryptMessage({
    message: 'sure thing alice!',
    senderPrivateKey: dataCustodian.privateKey,
    recipientPublicKey: rightsHolder.publicKey,
  });

  expect(encryptedMessageFromBobToAlice).to.be.an('object');
  expect(encryptedMessageFromBobToAlice.payload).to.be.aBase64EncodedString();
  expect(encryptedMessageFromBobToAlice.nonce).to.be.aBase64EncodedString();

  // alice decrypts the messages send from bob
  const decryptedMessageFromBobToAlice = JLINC.decryptMessage({
    encryptedMessage: encryptedMessageFromBobToAlice,
    senderPublicKey: dataCustodian.publicKey,
    recipientPrivateKey: rightsHolder.privateKey,
  });

  expect(decryptedMessageFromBobToAlice).to.equal('sure thing alice!');
});
