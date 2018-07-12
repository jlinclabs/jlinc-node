'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.verifySisaOfferingIsFromDataCustodian', function() {

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(()=>{
        JLINC.verifySisaOfferingIsFromDataCustodian({

        });
      }).to.throw(Error, 'sisaOffering is required');
      expect(()=>{
        JLINC.verifySisaOfferingIsFromDataCustodian({
          sisaOffering: {},
        });
      }).to.throw(Error, 'dataCustodianId is required');
    });
  });

  context('when given a sisaOffering and dataCustodianId that match', function() {
    before(function() {
      const dataCustodian = JLINC.createDataCustodian();
      const dataCustodianId = dataCustodian.publicKey;
      const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
      Object.assign(this, { sisaOffering, dataCustodianId });
    });
    it('should return true', function(){
      const { sisaOffering, dataCustodianId } = this;
      expect(
        JLINC.verifySisaOfferingIsFromDataCustodian({
          sisaOffering,
          dataCustodianId,
        })
      ).to.be.true;
    });
  });

  context('when given a sisaOffering and dataCustodianId that do not match', function() {
    before(function() {
      const dataCustodian = JLINC.createDataCustodian();
      const dataCustodianId = JLINC.createDataCustodian().publicKey;
      const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
      Object.assign(this, { sisaOffering, dataCustodianId });
    });
    it('should throw the error "invalid signature"', function(){
      const { sisaOffering, dataCustodianId } = this;
      expect(()=>{
        JLINC.verifySisaOfferingIsFromDataCustodian({
          sisaOffering,
          dataCustodianId,
        });
      }).to.throw(JLINC.SisaOfferingVerificationError, 'sisaOffering is not from the given dataCustodian');
    });
  });

});
