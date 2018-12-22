'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifySisaRightsHolderDid', function() {
  withDidServer();

  context('when missing required arguments', function() {
    it('should throw an error', async function(){
      await expect(
        JLINC.verifySisaRightsHolderDid({

        })
      ).to.be.rejectedWith('sisa is required');
    });
  });

  context('when the rightsHolderDid is verifiable', function(){
    beforeEach(async function(){
      const { rightsHolder, sisa } = await this.generateSisaEvent();
      const rightsHolderDid = rightsHolder.did;
      Object.assign(this, { sisa, rightsHolderDid });
    });
    it('should resolve with true', async function(){
      const { sisa, rightsHolderDid } = this;
      await expect(
        JLINC.verifySisaRightsHolderDid({ sisa, rightsHolderDid })
      ).to.eventually.be.true;
    });
  });

  context('when the rightsHolderDid is not verifiable', function(){
    beforeEach(async function(){
      const { sisaOffering } = await this.generateSisaOffering();
      const rightsHolder = await JLINC.createRightsHolder();
      const otherRightsHolder = await JLINC.createRightsHolder();
      // mixup the rightsholder signing keys
      rightsHolder.signingPublicKey = otherRightsHolder.signingPublicKey;
      rightsHolder.signingPrivateKey = otherRightsHolder.signingPrivateKey;
      const sisa = JLINC.acceptSisa({ sisaOffering, rightsHolder });
      const rightsHolderDid = rightsHolder.did;
      Object.assign(this, { sisa, rightsHolderDid });
    });
    it('should reject a JLINC.SisaVerificationError', async function(){
      const { sisa, rightsHolderDid } = this;
      await expect(
        JLINC.verifySisaRightsHolderDid({ sisa, rightsHolderDid })
      ).to.be.rejectedWith(JLINC.SisaVerificationError, 'sisa is not from the given rightsHolder');
    });
  });

});
