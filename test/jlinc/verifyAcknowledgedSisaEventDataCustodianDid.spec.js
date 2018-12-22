'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifyAcknowledgedSisaEventDataCustodianDid', function() {
  withDidServer();

  context('when given missing arguments', function() {
    it('should throw an error', async function(){
      await expect(
        JLINC.verifyAcknowledgedSisaEventDataCustodianDid({

        })
      ).to.be.rejectedWith('acknowledgedSisaEvent is required');

      await expect(
        JLINC.verifyAcknowledgedSisaEventDataCustodianDid({
          acknowledgedSisaEvent: {},
        })
      ).to.be.rejectedWith('dataCustodianDid is required');
    });
  });

  context('when the acknowledgedSisaEvent rightsHolderDid does not match the given dataCustodianDid', function() {
    it('should throw an error', async function(){
      const { acknowledgedSisaEvent } = await this.generateAcknowledgedSisaEvent();
      await expect(
        JLINC.verifyAcknowledgedSisaEventDataCustodianDid({
          acknowledgedSisaEvent,
          dataCustodianDid: 'xxx',
        })
      ).to.be.rejectedWith(
        JLINC.AcknowledgedSisaEventVerificationError,
        'sisaEvent dataCustodianDid does not match given dataCustodianDid'
      );
    });
  });

  context('when rightsHolderDid is valid', function() {
    beforeEach(async function() {
      const { dataCustodian, acknowledgedSisaEvent } = await this.generateAcknowledgedSisaEvent();
      const dataCustodianDid = dataCustodian.did;
      Object.assign(this, { acknowledgedSisaEvent, dataCustodianDid });
    });
    it('should resolve with true', async function(){
      const { acknowledgedSisaEvent, dataCustodianDid } = this;
      await expect(
        JLINC.verifyAcknowledgedSisaEventDataCustodianDid({ acknowledgedSisaEvent, dataCustodianDid })
      ).to.eventually.be.true;
    });
  });

  context('when the dataCustodianDid is invalid', function(){
    beforeEach(async function() {
      const { dataCustodian, sisa, sisaEvent } = await this.generateSisaEvent();

      const otherDataCustodian = await JLINC.createDataCustodian();
      // mixup the signing keys with another data custodian
      dataCustodian.signingPublicKey = otherDataCustodian.signingPublicKey;
      dataCustodian.signingPrivateKey = otherDataCustodian.signingPrivateKey;

      const acknowledgedSisaEvent = JLINC.acknowledgeSisaEvent({
        sisa,
        dataCustodian,
        sisaEvent,
      });

      const dataCustodianDid = dataCustodian.did;
      Object.assign(this, { acknowledgedSisaEvent, dataCustodianDid });
    });
    it('should throw an error', async function(){
      const { acknowledgedSisaEvent, dataCustodianDid } = this;
      await expect(
        JLINC.verifyAcknowledgedSisaEventDataCustodianDid({ acknowledgedSisaEvent, dataCustodianDid })
      ).to.be.rejectedWith(JLINC.AcknowledgedSisaEventVerificationError, 'acknowledgedSisaEvent is not from the dataCustodian');
    });
  });
});
