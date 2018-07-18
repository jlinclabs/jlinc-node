'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.validateSisaOffering', function() {
  it('should validate the given sisaOffering', function(){
    expect(() => {
      JLINC.validateSisaOffering({});
    }).to.throw(Error, 'sisaOffering is required');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: 'xx',
      });
    }).to.throw(Error, 'sisaOffering must be of type object');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {},
      });
    }).to.throw(Error, 'sisaOffering must have key "@context"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'love',
        },
      });
    }).to.throw(Error, 'sisaOffering["@context"] is invalid');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': JLINC.contextUrl,
        },
      });
    }).to.throw(Error, 'sisaOffering must have key "offeredSisa"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': JLINC.contextUrl,
          offeredSisa: 'xxx',
        },
      });
    }).to.throw(Error, 'sisaOffering.offeredSisa must be of type object');

    const dataCustodian = JLINC.createDataCustodian();
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });

    expect(
      JLINC.validateSisaOffering({ sisaOffering })
    ).to.be.true;
  });
});
