'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.validateSisaOffering', function() {
  withDidServer();

  beforeEach(async function() {
    const dataCustodian = await JLINC.createDataCustodian();
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
    Object.assign(this, { dataCustodian, sisaOffering, sisaOffering });
  });

  context('when given a valid sisaOffering', function(){
    it('should eventually return true', function(){
      const { sisaOffering } = this;
      expect(
        JLINC.validateSisaOffering({ sisaOffering })
      ).to.be.true;
    });
  });

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(()=>{
        JLINC.validateSisaOffering({});
      }).to.throw(Error, 'sisaOffering is required');

      expect(()=>{
        JLINC.validateSisaOffering({
          sisaOffering: 1,
        });
      }).to.throw(Error, 'sisaOffering must be of type object');
    });
  });

  context('when the given sisaOffering is missing @context', function() {
    it('should throw and InvalidSisaOfferingError', function(){
      expect(()=>{
        JLINC.validateSisaOffering({
          sisaOffering: {},
        });
      }).to.throw(JLINC.InvalidSisaOfferingError, 'sisaOffering must have key "@context"');
    });
  });

  context('when the given sisaOffering has an invalid @context', function() {
    it('should throw and InvalidSisaOfferingError', function(){
      expect(()=>{
        JLINC.validateSisaOffering({
          sisaOffering: {
            '@context': 'love',
          },
        });
      }).to.throw(JLINC.InvalidSisaOfferingError, 'sisaOffering["@context"] is invalid');
    });
  });

  context('when the given sisaOffering is missing offeredSisa', function() {
    it('should throw and InvalidSisaOfferingError', function(){
      expect(()=>{
        JLINC.validateSisaOffering({
          sisaOffering: {
            '@context': JLINC.contextUrl,
          },
        });
      }).to.throw(JLINC.InvalidSisaOfferingError, 'sisaOffering must have key "offeredSisa"');
    });
  });


  context('when the given sisaOffering has an invalid offeredSisa', function() {
    it('should throw and InvalidSisaOfferingError', function(){
      expect(()=>{
        JLINC.validateSisaOffering({
          sisaOffering: {
            '@context': JLINC.contextUrl,
            offeredSisa: 'xxx'
          },
        });
      }).to.throw(JLINC.InvalidOfferedSisaError, 'sisaOffering.offeredSisa must be of type object');
    });
  });

});
