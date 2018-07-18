'use strict';

const JLINC = require('../../jlinc');
const { generateSisa } = require('../helpers');

describe('JLINC.verifySisaWasSignedByRightsHolder', function() {

  before(function() {
    const { dataCustodian, rightsHolder, sisa } = generateSisa();
    Object.assign(this, { dataCustodian, rightsHolder, sisa });
  });

  context('when given a mismatching rightsHolder', function() {
    it('should return true', function(){
      const { rightsHolder, sisa } = this;
      expect(()=>{
        JLINC.verifySisaWasSignedByRightsHolder({
          sisa,
          rightsHolder: JLINC.createRightsHolder(),
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa.acceptedSisaJwt is not signed by the given rightsHolder');
    });
  });

  context('when given a weird rightsHolder with the right secret but wrong publicKey', function() {
    it('should return true', function(){
      const { rightsHolder, sisa } = this;
      expect(()=>{
        JLINC.verifySisaWasSignedByRightsHolder({
          sisa,
          rightsHolder: {
            ...JLINC.createRightsHolder(),
            secret: rightsHolder.secret,
          }
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa.acceptedSisa.rightsHolderId does not match given rightsHolder');
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
