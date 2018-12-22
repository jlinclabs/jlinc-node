'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifyOfferedSisaDataCustodianDid', function() {
  withDidServer();

  context('when missing required arguments', function() {
    it('should throw an error', async function(){
      await expect(
        JLINC.verifyOfferedSisaDataCustodianDid({

        })
      ).to.be.rejectedWith(Error, 'offeredSisa is required');

      await expect(
        JLINC.verifyOfferedSisaDataCustodianDid({
          offeredSisa: {},
        })
      ).to.be.rejectedWith(Error, 'dataCustodianDid is required');
    });
  });

  context('when the given dataCustodianDid does not match the offeredSisa', function(){
    it('should resolve with true', async function(){
      const { offeredSisa } = await this.generateSisaOffering();
      await expect(
        JLINC.verifyOfferedSisaDataCustodianDid({
          offeredSisa,
          dataCustodianDid: 'x',
        })
      ).to.be.rejectedWith(
        JLINC.OfferedSisaVerificationError,
        'sisaOffering.offeredSisa.dataCustodianDid does not match given dataCustodianDid'
      );
    });
  });

  context('when the dataCustodianDid is valid', function(){
    beforeEach(async function() {
      const { dataCustodian, offeredSisa } = await this.generateSisaOffering();
      const dataCustodianDid = dataCustodian.did;
      Object.assign(this, { offeredSisa, dataCustodianDid });
    });
    it('should resolve with true', async function(){
      const { offeredSisa, dataCustodianDid } = this;
      await expect(
        JLINC.verifyOfferedSisaDataCustodianDid({ offeredSisa, dataCustodianDid })
      ).to.eventually.be.true;
    });
  });

  context('when the dataCustodianDid is invalid', function(){
    beforeEach(async function() {
      const dataCustodian = await JLINC.createDataCustodian();
      const otherDataCustodian = await JLINC.createDataCustodian();
      // mixup the signing keys with another data custodian
      dataCustodian.signingPublicKey = otherDataCustodian.signingPublicKey;
      dataCustodian.signingPrivateKey = otherDataCustodian.signingPrivateKey;
      const { offeredSisa } = JLINC.createSisaOffering({ dataCustodian });
      const dataCustodianDid = dataCustodian.did;
      Object.assign(this, { offeredSisa, dataCustodianDid });
    });
    it('should throw an error', async function(){
      const { offeredSisa, dataCustodianDid } = this;
      await expect(
        JLINC.verifyOfferedSisaDataCustodianDid({ offeredSisa, dataCustodianDid })
      ).to.be.rejectedWith(JLINC.OfferedSisaVerificationError, 'sisaOffering is not from the given dataCustodian');
    });
  });

});
