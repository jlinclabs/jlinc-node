'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');
const { generateISODateStringInTheFuture } = require('../helpers');

describe('JLINC.validateOfferedBisa', function() {
  withDidServer();

  let offeredBisa;

  beforeEach(async function() {
    ({ offeredBisa } = await this.generateBisaOffering());
  });

  context('when given a valid offeredBisa', function(){
    it('should eventually return true', function(){
      expect( JLINC.validateOfferedBisa({ offeredBisa }) ).to.be.true;
    });
  });

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({});
      }).to.throw(Error, 'offeredBisa is required');
    });
  });

  context('when the given offeredBisa is missing @context', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(() => {
        JLINC.validateOfferedBisa({
          offeredBisa: {
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa must have key "@context"');
    });
  });

  context('when the given offeredBisa has an invalid @context', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': 'xxx',
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa["@context"] is invalid');
    });
  });

  context('when the given offeredBisa is missing agreementJwt', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa must have key "agreementJwt"');
    });
  });

  context('when the given offeredBisa has an invalid agreementJwt', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: 'jay dubyah tea',
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.agreementJwt is invalid');

      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            ...offeredBisa,
            agreementJwt: JLINC.createSignedJwt({ itemToSign: {}, secret: 'xx' }),
          }
        });
      }).to.throw(JLINC.InvalidBisaAgreementError, 'acceptedBisa.agreement must have key "@context"');
    });
  });

  context('when the given offeredBisa is missing offerorSigType', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa must have key "offerorSigType"');
    });
  });

  context('when the given offeredBisa has an invalid offerorSigType', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: 4,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.offerorSigType must be of type string');
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: 'alpha:numeric:awesome',
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.offerorSigType is invalid');
    });
  });

  context('when the given offeredBisa is missing offerorDid', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa must have key "offerorDid"');
    });
  });

  context('when the given offeredBisa has an invalid offerorDid', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: 44,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.offerorDid must be of type string');
    });
  });

  context('when the given offeredBisa is missing offerorPublicKey', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa must have key "offerorPublicKey"');
    });
  });

  context('when the given offeredBisa has an invalid offerorPublicKey', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
            offerorPublicKey: 18,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.offerorPublicKey must be of type string');

      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
            offerorPublicKey: 'trucks',
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.offerorPublicKey must be of length 43');
    });
  });

  context('when the given offeredBisa is missing offerorSig', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
            offerorPublicKey: offeredBisa.offerorPublicKey,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa must have key "offerorSig"');
    });
  });

  context('when the given offeredBisa has an invalid offerorSig', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
            offerorPublicKey: offeredBisa.offerorPublicKey,
            offerorSig: 123,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.offerorSig must be of type string');

      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
            offerorPublicKey: offeredBisa.offerorPublicKey,
            offerorSig: 'jsdhfjkdshfjkdsfhdjkshfdsjkfhdsjkfhjk'
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.offerorSig is invalid');

      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
            offerorPublicKey: '1Qp_E-TnN7JYB4Tj3TqQRzXo7LjqJBgn-LrzrIGP1nE',
            offerorSig: offeredBisa.offerorSig,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.offerorSig is invalid');
    });
  });

  context('when the given offeredBisa is missing createdAt', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
            offerorPublicKey: offeredBisa.offerorPublicKey,
            offerorSig: offeredBisa.offerorSig,
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa must have key "createdAt"');
    });
  });


  context('when the given offeredBisa.createdAt is in the future', function() {
    it('should throw and InvalidOfferedBisaError', function(){
      expect(()=>{
        JLINC.validateOfferedBisa({
          offeredBisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredBisa.agreementJwt,
            offerorSigType: JLINC.signatureType,
            offerorDid: offeredBisa.offerorDid,
            offerorPublicKey: offeredBisa.offerorPublicKey,
            offerorSig: offeredBisa.offerorSig,
            createdAt: generateISODateStringInTheFuture(),
          },
        });
      }).to.throw(JLINC.InvalidOfferedBisaError, 'offeredBisa.createdAt cannot be in the future');
    });
  });

});
