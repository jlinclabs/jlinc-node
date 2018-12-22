'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.verifyPublicKeyIsOwnedByDID', function() {
  withDidServer();

  it('should validate arguments', async function(){
    await expect(
      JLINC.verifyPublicKeyIsOwnedByDID({ })
    ).to.be.rejectedWith('did is required');
    await expect(
      JLINC.verifyPublicKeyIsOwnedByDID({ did: 'xxx' })
    ).to.be.rejectedWith('publicKey is required');
  });

  context('when the did and public key match', function(){
    it('should return true', async function(){
      const dataCustodian = await JLINC.createDataCustodian();
      expect(
        await JLINC.verifyPublicKeyIsOwnedByDID({
          did: dataCustodian.did,
          publicKey: dataCustodian.signingPublicKey,
        })
      ).to.be.true;
    });
  });

  context('when the did and public key do not match', function(){
    it('should throw an error', async function(){
      const dataCustodianA = await JLINC.createDataCustodian();
      await expect(
        JLINC.verifyPublicKeyIsOwnedByDID({
          did: dataCustodianA.did,
          publicKey: 'CY5BkgpYLFZ9JZW5Lpmn5uN9G_3qcT-BSNKAuJZidUY',
        })
      ).to.be.rejectedWith('publicKey is not owned by DID');
    });
  });

  context('when the did doesnt exist', function(){
    it('should throw an error', async function(){
      await expect(
        JLINC.verifyPublicKeyIsOwnedByDID({
          did: 'did:jlinc:CY5BkgpYLFZ9JZW5Lpmn5uN9G_3qcT-BSNKAuJZidUY',
          publicKey: 'CY5BkgpYLFZ9JZW5Lpmn5uN9G_3qcT-BSNKAuJZidUY',
        })
      ).to.be.rejectedWith('unable to verify public key is owned by DID: DID not found');
    });
  });
});
