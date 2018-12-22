'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifySisaEventRightsHolderDid', function() {
  withDidServer();

  context('when given missing arguments', function() {
    it('should throw an error', async function(){
      await expect(
        JLINC.verifySisaEventRightsHolderDid({

        })
      ).to.be.rejectedWith('sisaEvent is required');

      await expect(
        JLINC.verifySisaEventRightsHolderDid({
          sisaEvent: {},
        })
      ).to.be.rejectedWith('rightsHolderDid is required');
    });
  });

  context('when the dataCustodianDid does not match the sisa', function(){
    it('should throw an error', async function(){
      const { sisaEvent } = await this.generateSisaEvent();
      await expect(
        JLINC.verifySisaEventRightsHolderDid({
          sisaEvent,
          rightsHolderDid: 'xxx',
        })
      ).to.be.rejectedWith(
        JLINC.SisaEventVerificationError,
        'sisaEvent.audit.rightsHolderDid does not match given rightsHolderDid',
      );
    });
  });

  context('when rightsHolderDid is valid', function() {
    beforeEach(async function() {
      const { rightsHolder, sisaEvent } = await this.generateSisaEvent();
      const rightsHolderDid = rightsHolder.did;
      Object.assign(this, { sisaEvent, rightsHolderDid });
    });
    it('should resolve with true', async function(){
      const { sisaEvent, rightsHolderDid } = this;
      await expect(
        JLINC.verifySisaEventRightsHolderDid({ sisaEvent, rightsHolderDid })
      ).to.eventually.be.true;
    });
  });

  context('when the dataCustodianDid is invalid', function(){
    beforeEach(async function() {
      const { rightsHolder, sisa } = await this.generateSisa();

      const otherRightsHolder = await JLINC.createRightsHolder();
      // mixup the signing keys with another rights holder
      rightsHolder.signingPublicKey = otherRightsHolder.signingPublicKey;
      rightsHolder.signingPrivateKey = otherRightsHolder.signingPrivateKey;

      const sisaEvent = JLINC.createSisaEvent({
        eventType: 'dataEvent',
        event: {},
        sisa: sisa,
        latestSisaEvent: null,
        rightsHolder,
      });

      const rightsHolderDid = rightsHolder.did;
      Object.assign(this, { sisaEvent, rightsHolderDid });
    });
    it('should throw an error', async function(){
      const { sisaEvent, rightsHolderDid } = this;
      await expect(
        JLINC.verifySisaEventRightsHolderDid({ sisaEvent, rightsHolderDid })
      ).to.be.rejectedWith(JLINC.SisaEventVerificationError, 'sisaEvent is not from the rightsHolder');
    });
  });
});
