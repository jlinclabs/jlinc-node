'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');
const { generateISODateStringInTheFuture } = require('../helpers');

describe('JLINC.validateOfferedSisa', function() {
  withDidServer();

  beforeEach(async function() {
    const dataCustodian = await JLINC.createDataCustodian();
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
    const { offeredSisa } = sisaOffering;
    const dataCustodianDid = dataCustodian.did;
    Object.assign(this, { dataCustodian, dataCustodianDid, sisaOffering, offeredSisa });
  });

  context('when given a valid offeredSisa', function(){
    it('should eventually return true', function(){
      const { dataCustodianDid, offeredSisa } = this;
      expect( JLINC.validateOfferedSisa({ dataCustodianDid, offeredSisa }) ).to.be.true;
    });
  });

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({});
      }).to.throw(Error, 'offeredSisa is required');
    });
  });

  context('when the given offeredSisa is missing @context', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {

          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "@context"');
    });
  });

  context('when the given offeredSisa has an invalid @context', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': 'xxx',
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa["@context"] is invalid');
    });
  });

  context('when the given offeredSisa is missing agreementJwt', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "agreementJwt"');
    });
  });

  context('when the given offeredSisa has an invalid agreementJwt', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: 'jay dubyah tea',
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.agreementJwt is invalid');

      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            ...this.offeredSisa,
            agreementJwt: JLINC.createSignedJwt({ itemToSign: {}, secret: 'xx' }),
          }
        });
      }).to.throw(JLINC.InvalidSisaAgreementError, 'acceptedSisa.agreement must have key "@context"');
    });
  });

  context('when the given offeredSisa is missing dataCustodianSigType', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianSigType"');
    });
  });

  context('when the given offeredSisa has an invalid dataCustodianSigType', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: 4,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSigType must be of type string');
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: 'alpha:numeric:awesome',
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSigType is invalid');
    });
  });

  context('when the given offeredSisa is missing dataCustodianDid', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianDid"');
    });
  });

  context('when the given offeredSisa has an invalid dataCustodianDid', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: 44,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianDid must be of type string');
    });
  });

  context('when the given offeredSisa is missing dataCustodianPublicKey', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianPublicKey"');
    });
  });

  context('when the given offeredSisa has an invalid dataCustodianPublicKey', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: 18,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianPublicKey must be of type string');

      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: 'trucks',
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianPublicKey must be of length 43');
    });
  });

  context('when the given offeredSisa is missing dataCustodianSig', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: this.offeredSisa.dataCustodianPublicKey,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianSig"');
    });
  });

  context('when the given offeredSisa has an invalid dataCustodianSig', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: this.offeredSisa.dataCustodianPublicKey,
            dataCustodianSig: 123,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSig must be of type string');

      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: this.offeredSisa.dataCustodianPublicKey,
            dataCustodianSig: 'jsdhfjkdshfjkdsfhdjkshfdsjkfhdsjkfhjk'
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSig is invalid');

      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: '1Qp_E-TnN7JYB4Tj3TqQRzXo7LjqJBgn-LrzrIGP1nE',
            dataCustodianSig: this.offeredSisa.dataCustodianSig,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSig is invalid');
    });
  });

  context('when the given offeredSisa is missing createdAt', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: this.offeredSisa.dataCustodianPublicKey,
            dataCustodianSig: this.offeredSisa.dataCustodianSig,
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "createdAt"');
    });
  });


  context('when the given offeredSisa.createdAt is in the future', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      expect(()=>{
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: this.offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianDid: this.offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: this.offeredSisa.dataCustodianPublicKey,
            dataCustodianSig: this.offeredSisa.dataCustodianSig,
            createdAt: generateISODateStringInTheFuture(),
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.createdAt cannot be in the future');
    });
  });

  //     expect(()=>{
  //       JLINC.validateOfferedSisa({
  //         dataCustodianDid,
  //         offeredSisa: {
  //           '@context': JLINC.contextUrl,
  //           agreementJwt: offeredSisa.agreementJwt,
  //           dataCustodianSigType: JLINC.signatureType,
  //           dataCustodianDid: offeredSisa.dataCustodianDid,
  //           dataCustodianPublicKey: offeredSisa.dataCustodianPublicKey,
  //           dataCustodianSig: offeredSisa.dataCustodianSig,
  //           createdAt: JLINC.now(),
  //         }
  //       })
  //     ).to.eventually.be.true;

  //     // when given an invalid agreementJwt
  //     expect(()=>{
  //       JLINC.validateOfferedSisa({
  //         dataCustodianDid,
  //         offeredSisa: {
  //           '@context': JLINC.contextUrl,
  //           agreementJwt: JLINC.createSignedJwt({ itemToSign: {}, secret: 'xx' }),
  //           dataCustodianSigType: JLINC.signatureType,
  //           dataCustodianDid: offeredSisa.dataCustodianDid,
  //           dataCustodianPublicKey: offeredSisa.dataCustodianPublicKey,
  //           dataCustodianSig: offeredSisa.dataCustodianSig,
  //           createdAt: JLINC.now(),
  //         }
  //       })
  //     ).to.be.rejectedWith(JLINC.InvalidSisaAgreementError, 'acceptedSisa.agreement must have key "@context"');

  //     expect(()=>{ JLINC.validateOfferedSisa({ offeredSisa }) ).to.eventually.be.true;
  //   });
  // });

});
