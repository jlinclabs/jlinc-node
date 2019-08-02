'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifyAcknowledgedBisaEventWasSignedBy', function() {
  withDidServer();

  let bisa, bisaEvent, acknowledgedBisaEvent, target;

  before(async function() {
    ({
      bisa,
      bisaEvent,
      acknowledgedBisaEvent,
      target,
    } = await this.generateAcknowledgedBisaEvent());
  });

  context('when missing required arguments', function() {
    it('should throw and error', function(){
      expect(() => {
        JLINC.verifyAcknowledgedBisaEventWasSignedBy({

        });
      }).to.throw('bisa is required');

      expect(() => {
        JLINC.verifyAcknowledgedBisaEventWasSignedBy({
          bisa,
        });
      }).to.throw('bisaEvent is required');

      expect(() => {
        JLINC.verifyAcknowledgedBisaEventWasSignedBy({
          bisa,
          bisaEvent,
        });
      }).to.throw('acknowledgedBisaEvent is required');

      expect(() => {
        JLINC.verifyAcknowledgedBisaEventWasSignedBy({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent,
        });
      }).to.throw('dataCustodianPublicKey is required');

      expect(() => {
        JLINC.verifyAcknowledgedBisaEventWasSignedBy({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent,
          dataCustodianPublicKey: target.signingPublicKey,
        });
      }).to.not.throw();
    });
  });

  context('when given a valid acknowledgedBisaEvent', function() {
    it('should return true', function(){
      expect(
        JLINC.verifyAcknowledgedBisaEventWasSignedBy({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent,
          dataCustodianPublicKey: target.signingPublicKey,
        })
      ).to.be.true;
    });
  });

  context('when given an invalid acknowledgedBisaEvent', function() {
    it('should throw an error', function(){
      expect(()=>
        JLINC.verifyAcknowledgedBisaEventWasSignedBy({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent,
          dataCustodianPublicKey: 'IcUIumA04iGgLOllGBsk03CcPlw5NfYvBWN1KqDELyk',
        })
      ).to.throw(
        JLINC.AcknowledgedBisaEventVerificationError,
        'acknowledgedBisaEvent was not signed by the given dataCustodian'
      );
    });
  });

});
