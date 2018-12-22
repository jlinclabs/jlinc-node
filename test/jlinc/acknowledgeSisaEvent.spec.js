'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.acknowledgeSisaEvent', function() {
  withDidServer();

  before(async function() {
    const { dataCustodian, sisa, sisaEvent } = await this.generateSisaEvent();
    Object.assign(this, { dataCustodian, sisa, sisaEvent });
  });

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      const { sisa, sisaEvent, dataCustodian } = this;

      expect(()=>{
        JLINC.acknowledgeSisaEvent({

        });
      }).to.throw('sisa is required');

      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          sisa,
        });
      }).to.throw('sisaEvent is required');

      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          sisa,
          sisaEvent,
        });
      }).to.throw('dataCustodian is required');

      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          sisa,
          sisaEvent,
          dataCustodian: {},
        });
      }).to.throw('dataCustodian.did is required');

      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          sisa,
          sisaEvent,
          dataCustodian: {
            did: dataCustodian.did,
          },
        });
      }).to.throw('dataCustodian.signingPublicKey is required');

      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          sisa,
          sisaEvent,
          dataCustodian: {
            did: dataCustodian.did,
            signingPublicKey: dataCustodian.signingPublicKey,
          },
        });
      }).to.throw('dataCustodian.signingPrivateKey is required');

      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          sisa,
          sisaEvent,
          dataCustodian,
        });
      }).to.not.throw();
    });
  });

  context('when given an invalid dataCustodian', function() {
    it('should throw a InvalidDataCustodianError', function(){
      const { sisa, sisaEvent } = this;
      expect(()=>{
        JLINC.acknowledgeSisaEvent({
          dataCustodian: {},
          sisa,
          sisaEvent,
        });
      }).to.throw(JLINC.InvalidDataCustodianError);
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
      expect(acknowledgedSisaEvent).to.matchPattern({
        '@context': sisaEvent['@context'],
        eventJwt: sisaEvent.eventJwt,
        audit: {
          ...sisaEvent.audit,
          dataCustodianSigType: JLINC.signatureType,
          dataCustodianDid: dataCustodian.did,
          dataCustodianPublicKey: dataCustodian.signingPublicKey,
          dataCustodianSig: _.isString,
        },
      });

      expect(
        JLINC.verifyHashSignature({
          signed: acknowledgedSisaEvent.audit.eventId,
          signature: acknowledgedSisaEvent.audit.dataCustodianSig,
          publicKey: dataCustodian.signingPublicKey,
        })
      ).to.be.true;
    });
  });

});
