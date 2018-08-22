'use strict';

const JLINC = require('../../jlinc');
const { generateSisaEvent } = require('../helpers');

describe('JLINC.verifySisaEventWasSignedByRightsHolder', function() {
  context('when given missing arguments', function() {
    it('should throw an error', function(){
      const { rightsHolder, sisaEvent } = generateSisaEvent();
      const rightsHolderId = rightsHolder.publicKey;

      expect(()=>{
        JLINC.verifySisaEventWasSignedByRightsHolder({

        });
      }).to.throw('sisaEvent is required');

      expect(()=>{
        JLINC.verifySisaEventWasSignedByRightsHolder({
          sisaEvent,
        });
      }).to.throw('rightsHolderId is required');

      expect(()=>{
        JLINC.verifySisaEventWasSignedByRightsHolder({
          sisaEvent,
          rightsHolderId
        });
      }).to.not.throw();

    });
  });
  context('when given a sisaEvent', function() {
    context('that was signed by the given rightsHolder', function() {
      it('should return true', function(){
        const { rightsHolder, sisaEvent } = generateSisaEvent();
        const rightsHolderId = rightsHolder.publicKey;
        expect(
          JLINC.verifySisaEventWasSignedByRightsHolder({ sisaEvent, rightsHolderId })
        ).to.be.true;
      });
    });
    context('that was NOT signed by the given rightsHolder', function() {
      it('should throw the error "sisaEvent was not signed by the given rightsHolder"', function(){
        const { sisaEvent } = generateSisaEvent();
        const rightsHolder = JLINC.createDataCustodian();
        const rightsHolderId = rightsHolder.publicKey;
        expect(() => {
          JLINC.verifySisaEventWasSignedByRightsHolder({ sisaEvent, rightsHolderId });
        }).to.throw(JLINC.SisaEventVerificationError, 'sisaEvent was not signed by the given rightsHolder');
      });
    });
  });

  context('when given a version 5 sisaEvent', function() {
    beforeEach(function() {
      this.sisaEvent = {
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        audit: {
          eventType: 'dataEvent',
          sisaId: '8ICEk0lENTj4FB7XMMzO3WZHSM5FBnjJCMcr9cafr2o',
          eventId: 'Ju8rtUHSX2gdstmxnGfl4WAZN53NjEEew1_HO1aIwOY',
          createdAt: '2018-08-22T19:45:40.482Z',
          previousId: null,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderId: 'e4d_8KYeeCmQTFIHe-5OkILGzQajpl1wk-L0IbQWLRs',
          rightsHolderSig: 'oIxFONasiJhu2RNgiG_X7RBV5kESVSsMMfT_FT2VCThiWkVXxfJ7ntpJa5zVDFWUgil9HTi0RkElk9aGr87oALz_noMB0rLX2Nl_d7F7mE_vZZgnLeHE68lYn9opvPad',
        },
        eventJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hbF9kYXRhIjp7ImZpcnN0bmFtZSI6IkxhcnJ5IiwibGFzdG5hbWUiOiJEYXZpZCJ9fQ.qU-JxkaKMupV55_cqoqXl2ZvZMlQr8jVS0ANv8g374o'
      };
      this.rightsHolder = {
        publicKey: 'e4d_8KYeeCmQTFIHe-5OkILGzQajpl1wk-L0IbQWLRs',
        privateKey: 'mSi9N_Dr89N5Zlr5seu00JjTjThCDE9qyp4hOkDQ19F7h3_wph54KZBMUgd77k6QgsbNBqOmXXCT4vQhtBYtGw',
        secret: 'fK5jEa4gBgbgH6T_0Hn-F4u3BbcOBFdP',
      };
    });
    context('that was signed by the given rightsHolder', function() {
      it('should return true', function(){
        const { sisaEvent, rightsHolder } = this;
        const rightsHolderId = rightsHolder.publicKey;
        expect(
          JLINC.verifySisaEventWasSignedByRightsHolder({ sisaEvent, rightsHolderId })
        ).to.be.true;
      });
    });
    context('that was NOT signed by the given rightsHolder', function() {
      it('should throw the error "sisaEvent was not signed by the given rightsHolder"', function(){
        const { sisaEvent } = this;
        const rightsHolder = JLINC.createDataCustodian();
        const rightsHolderId = rightsHolder.publicKey;
        expect(() => {
          JLINC.verifySisaEventWasSignedByRightsHolder({ sisaEvent, rightsHolderId });
        }).to.throw(JLINC.SisaEventVerificationError, 'sisaEvent was not signed by the given rightsHolder');
      });
    });
  });
});
