'use strict';

const JLINC = require('../../jlinc');
const { generateSisaEvent } = require('../helpers');

describe('JLINC.verifySisaEventWasSignedByRightsHolder', function() {
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
        }).to.throw(JLINC.SisaEventVerificationError, 'sisaEvent was not signed by the given dataCustodian');
      });
    });
  });
});
