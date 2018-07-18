'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.validateOfferedSisa', function() {

  before(function() {
    const dataCustodian = JLINC.createEntity();
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
    const { offeredSisa } = sisaOffering;
    Object.assign(this, { dataCustodian, sisaOffering, offeredSisa });
  });


  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(() => {
        JLINC.validateOfferedSisa({});
      }).to.throw(Error, 'offeredSisa is required');
    });
  });

  context('when given an invalid offeredSisa', function() {
    it('should throw and InvalidOfferedSisaError', function(){
      const { offeredSisa } = this;
      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {}
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "@context"');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': 'xxx',
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa["@context"] is invalid');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "agreementJwt"');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: 'jay dubyah tea',
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.agreementJwt is invalid');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: 'jay dubyah tea',
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.agreementJwt is invalid');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianSigType"');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: 4,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSigType must be of type string');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: 'alpha:numeric:awesome',
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSigType is invalid');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianId"');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: 44,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianId must be of type string');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: 'fake dataCustodian id here',
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianId must be of length 43');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: offeredSisa.dataCustodianId,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianSig"');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: offeredSisa.dataCustodianId,
            dataCustodianSig: 123,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSig must be of type string');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: offeredSisa.dataCustodianId,
            dataCustodianSig: 'jsdhfjkdshfjkdsfhdjkshfdsjkfhdsjkfhjk',
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSig is invalid');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: JLINC.createDataCustodian().publicKey,
            dataCustodianSig: offeredSisa.dataCustodianSig,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSig is invalid');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: offeredSisa.dataCustodianId,
            dataCustodianSig: offeredSisa.dataCustodianSig,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "iat"');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: offeredSisa.dataCustodianId,
            dataCustodianSig: offeredSisa.dataCustodianSig,
            iat: 123,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.iat is too old');

      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: offeredSisa.dataCustodianId,
            dataCustodianSig: offeredSisa.dataCustodianSig,
            iat: Math.floor(Date.now() / 1000) + 10,
          }
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.iat cannot be in the future');

      expect(
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: offeredSisa.agreementJwt,
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: offeredSisa.dataCustodianId,
            dataCustodianSig: offeredSisa.dataCustodianSig,
            iat: Math.floor(Date.now() / 1000),
          }
        })
      ).to.be.true;

      // when given an invalid agreementJwt
      expect(() => {
        JLINC.validateOfferedSisa({
          offeredSisa: {
            '@context': JLINC.contextUrl,
            agreementJwt: JLINC.createSignedJwt({ itemToSign: {}, secret: 'xx' }),
            dataCustodianSigType: JLINC.signatureType,
            dataCustodianId: offeredSisa.dataCustodianId,
            dataCustodianSig: offeredSisa.dataCustodianSig,
            iat: Math.floor(Date.now() / 1000),
          }
        });
      }).to.throw(JLINC.InvalidSisaAgreementError, 'acceptedSisa.agreement must have key "@context"');

      expect( JLINC.validateOfferedSisa({ offeredSisa }) ).to.be.true;
    });
  });

});
