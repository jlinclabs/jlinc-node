'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.acknowledgeSisaEvent', function() {

  before(function() {
    const { dataCustodian, rightsHolder, sisa, sisaEvent } = this.generateSisaEvent();
    Object.assign(this, { dataCustodian, sisa, sisaEvent });
  });

  context('when given an invalid dataCustodian', function() {
    it('should throw a InvalidDataCustodianError', function(){
      const { dataCustodian, sisa, sisaEvent } = this;
      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          dataCustodian: {},
          sisa,
          sisaEvent,
        });
      }).to.throw(JLINC.InvalidDataCustodianError);
    });
  });

  context('when given an invalid sisa', function() {
    it('should throw an InvalidSisaError', function(){
      const { dataCustodian, sisa, sisaEvent } = this;
      expect(()=> {
        JLINC.acknowledgeSisaEvent({
          dataCustodian,
          sisa: {},
          sisaEvent,
        });
      }).to.throw(JLINC.InvalidSisaError);
    });
  });

  context('when given a dataCustodian that does not match the sisa', function() {
    it('should throw a InvalidDataCustodianError', function(){
      const { dataCustodian, sisa, sisaEvent } = this;
      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          dataCustodian: JLINC.createEntity(),
          sisa,
          sisaEvent,
        });
      }).to.throw(JLINC.SisaVerificationError, 'sisa agreementJwt is not signed by the given dataCustodian');
    });
  });

  context('when given an invalid sisaEvent', function() {
    it('should throw an InvalidSisaEventError', function(){
      const { dataCustodian, sisa, sisaEvent } = this;
      expect(()=> {
        JLINC.acknowledgeSisaEvent({
          dataCustodian,
          sisa,
          sisaEvent: {},
        });
      }).to.throw(JLINC.InvalidSisaEventError);
    });
  });

  context('when given all valid arguments', function() {
    it('should return a new acknowledgedSisaEvent', function() {
      const { dataCustodian, sisa, sisaEvent } = this;
      const acknowledgedSisaEvent = JLINC.acknowledgeSisaEvent({
        dataCustodian,
        sisa,
        sisaEvent,
      });
      expect(acknowledgedSisaEvent).to.be.an('object');
      expect(acknowledgedSisaEvent).to.not.equal(sisaEvent);

      // acknowledgedSisaEvent should be a clone of the given sisaEvent
      expect(acknowledgedSisaEvent['@context']              ).to.equal(sisaEvent['@context']);
      expect(acknowledgedSisaEvent.eventJwt                 ).to.equal(sisaEvent.eventJwt);
      expect(acknowledgedSisaEvent.eventJwt                 ).to.equal(sisaEvent.eventJwt);
      expect(acknowledgedSisaEvent.audit.eventType          ).to.equal(sisaEvent.audit.eventType);
      expect(acknowledgedSisaEvent.audit.sisaId             ).to.equal(sisaEvent.audit.sisaId);
      expect(acknowledgedSisaEvent.audit.eventId            ).to.equal(sisaEvent.audit.eventId);
      expect(acknowledgedSisaEvent.audit.timestamp          ).to.equal(sisaEvent.audit.timestamp);
      expect(acknowledgedSisaEvent.audit.previousId         ).to.equal(sisaEvent.audit.previousId);
      expect(acknowledgedSisaEvent.audit.rightsHolderSigType).to.equal(sisaEvent.audit.rightsHolderSigType);
      expect(acknowledgedSisaEvent.audit.rightsHolderId     ).to.equal(sisaEvent.audit.rightsHolderId);
      expect(acknowledgedSisaEvent.audit.rightsHolderSig    ).to.equal(sisaEvent.audit.rightsHolderSig);

      // new keys
      expect(acknowledgedSisaEvent.audit.dataCustodianSigType).to.equal('sha256:ed25519');
      expect(acknowledgedSisaEvent.audit.dataCustodianId).to.equal(dataCustodian.publicKey);
      expect(acknowledgedSisaEvent.audit.dataCustodianSig).to.be.a('string');

      expect(
        JLINC.validateSignature({
          itemSigned: acknowledgedSisaEvent.eventJwt,
          signature: acknowledgedSisaEvent.audit.dataCustodianSig,
          publicKey: dataCustodian.publicKey,
        })
      ).to.be.true;
    });
  });

});
