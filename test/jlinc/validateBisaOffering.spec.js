'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.validateBisaOffering', function() {
  withDidServer();

  beforeEach(async function() {
    const dataCustodianA = await JLINC.createDataCustodian();
    const dataCustodianB = await JLINC.createDataCustodian();
    const bisaOffering = JLINC.createBisaOffering({
      dataCustodian: dataCustodianA,
      targetAcceptorDid: dataCustodianB.did,
    });
    Object.assign(this, {
      dataCustodianA,
      dataCustodianB,
      bisaOffering,
    });
  });

  context('when given a valid bisaOffering', function(){
    it('should eventually return true', function(){
      const { bisaOffering } = this;
      expect(
        JLINC.validateBisaOffering({ bisaOffering })
      ).to.be.true;
    });
  });

  context('when missing required arguments', function() {
    it('should throw an error', function(){
      expect(()=>{
        JLINC.validateBisaOffering({});
      }).to.throw('bisaOffering is required');

      expect(()=>{
        JLINC.validateBisaOffering({
          bisaOffering: 1,
        });
      }).to.throw(JLINC.InvalidBisaOfferingError, 'bisaOffering must be of type object');

      expect(()=>{
        JLINC.validateBisaOffering({
          bisaOffering: {},
        });
      }).to.throw(JLINC.InvalidBisaOfferingError, 'bisaOffering must have key "@context"');

      expect(()=>{
        JLINC.validateBisaOffering({
          bisaOffering: {
            '@context': 'love',
          },
        });
      }).to.throw(JLINC.InvalidBisaOfferingError, 'bisaOffering["@context"] is invalid');

      expect(()=>{
        JLINC.validateBisaOffering({
          bisaOffering: {
            '@context': JLINC.contextUrl,
          },
        });
      }).to.throw(JLINC.InvalidBisaOfferingError, 'bisaOffering must have key "id"');

      expect(()=>{
        JLINC.validateBisaOffering({
          bisaOffering: {
            '@context': JLINC.contextUrl,
            id: 12121,
          },
        });
      }).to.throw(JLINC.InvalidBisaOfferingError, 'bisaOffering.id must of type string');

      expect(()=>{
        JLINC.validateBisaOffering({
          bisaOffering: {
            '@context': JLINC.contextUrl,
            id: 'asdsadasds',
          },
        });
      }).to.throw(JLINC.InvalidBisaOfferingError, 'bisaOffering must have key "offeredBisa"');

      expect(()=>{
        JLINC.validateBisaOffering({
          bisaOffering: {
            '@context': JLINC.contextUrl,
            id: 'asdsadasds',
            offeredBisa: {},
          },
        });
      }).to.throw(JLINC.InvalidBisaOfferingError, 'bisaOffering.offeredBisa must have key "@context"');

    });
  });

});
