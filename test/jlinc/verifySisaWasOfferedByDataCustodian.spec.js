'use strict';

const JLINC = require('../../jlinc');
const { generateSisa } = require('../helpers');

describe('JLINC.verifySisaWasOfferedByDataCustodian', function() {

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({

        });
      }).to.throw(Error, 'sisa is required');
      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa: {},
        });
      }).to.throw(Error, 'dataCustodian is required');
    });
  });

  context('when given a sisa and dataCustodian that match', function() {
    before(function() {
      const { sisa, dataCustodian } = generateSisa();
      Object.assign(this, { sisa, dataCustodian });
    });
    it('should return true', function(){
      const { sisa, dataCustodian } = this;
      expect(
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa,
          dataCustodian
        })
      ).to.be.true;
    });
  });

  context('when given a sisa and dataCustodian that do not match', function() {
    before(function() {
      const { sisa, dataCustodian } = generateSisa();
      const otherDataCustodian = JLINC.createDataCustodian();
      Object.assign(this, { sisa, dataCustodian, otherDataCustodian });
    });
    it('should throw the error "invalid signature"', function(){
      const { sisa, otherDataCustodian, dataCustodian } = this;
      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa,
          dataCustodian: otherDataCustodian
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa agreementJwt is not signed by the given dataCustodian');
      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa,
          dataCustodian: {
            secret: dataCustodian.secret,
            publicKey: otherDataCustodian.publicKey,
          }
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa dataCustodianSig does not match the given dataCustodian');
    });
  });

});
