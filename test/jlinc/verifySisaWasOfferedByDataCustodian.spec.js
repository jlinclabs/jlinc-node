'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifySisaWasOfferedByDataCustodian', function() {
  withDidServer();

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({

        });
      }).to.throw('sisa is required');

      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa: {},
        });
      }).to.throw('dataCustodian is required');

      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa: {},
          dataCustodian: {},
        });
      }).to.throw('dataCustodian.did is required');

      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa: {},
          dataCustodian: {
            did: 'x',
          },
        });
      }).to.throw('dataCustodian.secret is required');
    });
  });

  context('when given a sisa and dataCustodian that match', function() {
    before(async function() {
      const { sisa, dataCustodian } = await this.generateSisa();
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
    before(async function() {
      const { sisa, dataCustodian } = await this.generateSisa();
      const otherDataCustodian = await JLINC.createDataCustodian();
      Object.assign(this, { sisa, dataCustodian, otherDataCustodian });
    });
    it('should throw the error "invalid signature"', function(){
      const { sisa, otherDataCustodian, dataCustodian } = this;
      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa,
          dataCustodian: {
            did: otherDataCustodian.did,
            secret: dataCustodian.secret,
          }
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa.acceptedSisa.offeredSisa.dataCustodianDid does not match the given dataCustodian');
      expect(()=>{
        JLINC.verifySisaWasOfferedByDataCustodian({
          sisa,
          dataCustodian: {
            did: dataCustodian.did,
            secret: otherDataCustodian.secret,
          }
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa agreementJwt is not signed by the given dataCustodian');
    });
  });

});
