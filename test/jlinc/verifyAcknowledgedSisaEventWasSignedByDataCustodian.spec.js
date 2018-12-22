'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian', function() {
  withDidServer();

  before(async function() {
    const { dataCustodian, acknowledgedSisaEvent } = await this.generateAcknowledgedSisaEvent();
    Object.assign(this, { dataCustodian, acknowledgedSisaEvent });
  });

  context('when missing required arguments', function() {
    it('should throw and error', function(){
      const { dataCustodian, acknowledgedSisaEvent } = this;
      expect(() => {
        JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({

        });
      }).to.throw('acknowledgedSisaEvent is required');

      expect(() => {
        JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
          acknowledgedSisaEvent,
        });
      }).to.throw('dataCustodianPublicKey is required');

      expect(() => {
        JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
          acknowledgedSisaEvent,
          dataCustodianPublicKey: dataCustodian.signingPublicKey,
        });
      }).to.not.throw();
    });
  });

  context('when given an acknowledgedSisaEvent', function() {
    context('that was signed by the given dataCustodian', function() {
      it('should return true', function(){
        const { dataCustodian, acknowledgedSisaEvent } = this;
        expect(
          JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
            acknowledgedSisaEvent,
            dataCustodianPublicKey: dataCustodian.signingPublicKey,
          })
        ).to.be.true;
      });
    });
    context('that was NOT signed by the given dataCustodian', function() {
      before(async function() {
        this.dataCustodian = await JLINC.createDataCustodian();
      });
      it('should throw the error "acknowledgedSisaEvent was not signed by the given dataCustodian"', function(){
        const { dataCustodian, acknowledgedSisaEvent } = this;
        expect(() => {
          JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
            acknowledgedSisaEvent,
            dataCustodianPublicKey: dataCustodian.signingPublicKey,
          });
        }).to.throw(JLINC.AcknowledgedSisaEventVerificationError, 'acknowledgedSisaEvent was not signed by the given dataCustodian');
      });
    });
  });

});
