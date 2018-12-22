'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifySisaWasSignedByRightsHolder', function() {
  withDidServer();

  before(async function() {
    const { dataCustodian, rightsHolder, sisa } = await this.generateSisa();
    Object.assign(this, { dataCustodian, rightsHolder, sisa });
  });

  context('when missing required arguments', function() {
    it('should return true', function(){
      const { sisa, rightsHolder } = this;

      expect(()=>{
        JLINC.verifySisaWasSignedByRightsHolder({

        });
      }).to.throw('sisa is required');

      expect(()=>{
        JLINC.verifySisaWasSignedByRightsHolder({
          sisa,
        });
      }).to.throw('rightsHolder is required');

      expect(()=>{
        JLINC.verifySisaWasSignedByRightsHolder({
          sisa,
          rightsHolder,
        });
      }).to.not.throw();
    });
  });

  context('when given a mismatching rightsHolder', function() {
    it('should return true', async function(){
      const { sisa } = this;
      const rightsHolder = await JLINC.createRightsHolder();
      expect(()=>{
        JLINC.verifySisaWasSignedByRightsHolder({ sisa, rightsHolder });
      }).to.throw(JLINC.SisaVerificationError, 'sisa.acceptedSisaJwt is not signed by the given rightsHolder');
    });
  });

  context('when given a weird rightsHolder with the right secret but wrong publicKey', function() {
    it('should return true', async function(){
      const { rightsHolder, sisa } = this;
      const otherRightsHolder = await JLINC.createRightsHolder();
      expect(()=>{
        JLINC.verifySisaWasSignedByRightsHolder({
          sisa,
          rightsHolder: {
            ...otherRightsHolder,
            secret: rightsHolder.secret,
          }
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa.acceptedSisa.rightsHolderDid does not match given rightsHolder.did');
    });
  });

  context('when given the matching rightsHolder', function() {
    it('should return true', function(){
      const { rightsHolder, sisa } = this;
      expect(
        JLINC.verifySisaWasSignedByRightsHolder({
          sisa,
          rightsHolder,
        })
      ).to.be.true;
    });
  });

});
