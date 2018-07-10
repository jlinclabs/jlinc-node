'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.validateDataCustodian', function() {
  it('should validate a given dataCustodian', function(){
    const validDataCustodian = JLINC.createEntity();

    expect(() => {
      JLINC.validateDataCustodian({});
    }).to.throw('dataCustodian must be of type object');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {},
      });
    }).to.throw('dataCustodian must have key "id"');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: 42,
        },
      });
    }).to.throw('dataCustodian.id must be of type string');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: 'same shit id',
        },
      });
    }).to.throw('dataCustodian.id must be of length 43');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: validDataCustodian.id,
        },
      });
    }).to.throw('dataCustodian must have key "secretKey"');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: validDataCustodian.id,
          secretKey: undefined,
        },
      });
    }).to.throw('dataCustodian.secretKey must be of type string');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: validDataCustodian.id,
          secretKey:'same shit secretKey',
        },
      });
    }).to.throw('dataCustodian.secretKey must be of length 86');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: validDataCustodian.id,
          secretKey: validDataCustodian.secretKey,
        },
      });
    }).to.throw('dataCustodian must have key "nonce"');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: validDataCustodian.id,
          secretKey: validDataCustodian.secretKey,
          nonce: 99999,
        },
      });
    }).to.throw('dataCustodian.nonce must be of type string');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: validDataCustodian.id,
          secretKey: validDataCustodian.secretKey,
          nonce: 'some bunk nonce',
        },
      });
    }).to.throw('dataCustodian.nonce must be of length 32');

    expect(
      JLINC.validateDataCustodian({
        dataCustodian: {
          id: validDataCustodian.id,
          secretKey: validDataCustodian.secretKey,
          nonce:  validDataCustodian.nonce,
        },
      })
    ).to.be.true;

  });
});
