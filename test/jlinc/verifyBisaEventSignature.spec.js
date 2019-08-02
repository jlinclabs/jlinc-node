'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifyBisaEventSignature', function() {
  withDidServer();

  let bisaEvent, offeror;

  beforeEach(async function(){
    ({ bisaEvent, offeror } = await this.generateBisaEvent());
  });

  context('when given invalid arguments', function(){
    it('should return true', function(){
      expect(()=>
        JLINC.verifyBisaEventSignature({
        })
      ).to.throw('bisaEvent is required');
      expect(()=>
        JLINC.verifyBisaEventSignature({
          bisaEvent,
        })
      ).to.throw('dataCustodianPublicKey is required');
    });
  });

  context('when given a valid bisaEvent', function(){
    it('should return true', function(){
      expect(
        JLINC.verifyBisaEventSignature({
          bisaEvent: bisaEvent,
          dataCustodianPublicKey: offeror.signingPublicKey,
        })
      ).to.be.true;
    });
  });

  context('when given an invalid bisaEvent', function(){
    it('should', function(){
      expect(()=>{
        JLINC.verifyBisaEventSignature({
          bisaEvent: bisaEvent,
          dataCustodianPublicKey: 'IcUIumA04iGgLOllGBsk03CcPlw5NfYvBWN1KqDELyk',
        });
      }).to.throw(
        JLINC.BisaEventVerificationError,
        'bisaEvent was not signed by the given dataCustodianPublicKey'
      );

      bisaEvent.audit.initiatorSig = 'xxx';

      expect(()=>{
        JLINC.verifyBisaEventSignature({
          bisaEvent: bisaEvent,
          dataCustodianPublicKey: offeror.signingPublicKey,
        });
      }).to.throw(
        JLINC.BisaEventVerificationError,
        'bisaEvent was not signed by the given dataCustodianPublicKey'
      );
    });
  });
});
