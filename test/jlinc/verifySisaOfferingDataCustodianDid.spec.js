'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');
const withSinon = require('../helpers/withSinon');

describe('JLINC.verifySisaOfferingDataCustodianDid', function() {
  withDidServer();
  withSinon();

  context('when missing required arguments', function() {
    it('should throw an error', async function(){
      await expect(
        JLINC.verifySisaOfferingDataCustodianDid({

        })
      ).to.be.rejectedWith(Error, 'sisaOffering is required');

      await expect(
        JLINC.verifySisaOfferingDataCustodianDid({
          sisaOffering: {},
        })
      ).to.be.rejectedWith(Error, 'offeredSisa is required');

      await expect(
        JLINC.verifySisaOfferingDataCustodianDid({
          sisaOffering: {
            offeredSisa: {},
          },
        })
      ).to.be.rejectedWith(Error, 'dataCustodianDid is required');
    });
  });

  context('when given all required arguments', function(){
    it('should call JLINC.verifyOfferedSisaDataCustodianDid', async function(){
      this.sinon.stub(JLINC, 'verifyOfferedSisaDataCustodianDid');

      const sisaOffering = {
        offeredSisa: {
          this_is_a_fake_offed_sisa: 'yup',
        },
      };
      const dataCustodianDid = 'jlinc:did:frogsaregross';

      await expect(
        JLINC.verifySisaOfferingDataCustodianDid({ sisaOffering, dataCustodianDid })
      ).to.eventually.be.true;

      expect(JLINC.verifyOfferedSisaDataCustodianDid).to.have.been.calledOnce;
      expect(JLINC.verifyOfferedSisaDataCustodianDid).to.have.been.calledWith({
        offeredSisa: sisaOffering.offeredSisa,
        dataCustodianDid,
      });

    });
  });

});
