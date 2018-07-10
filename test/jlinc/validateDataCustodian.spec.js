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
    }).to.throw('dataCustodian must have key "publicKey"');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: 42,
        },
      });
    }).to.throw('dataCustodian.publicKey must be of type string');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: 'same shit id',
        },
      });
    }).to.throw('dataCustodian.publicKey must be of length 43');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: validDataCustodian.publicKey,
        },
      });
    }).to.throw('dataCustodian must have key "privateKey"');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: validDataCustodian.publicKey,
          privateKey: undefined,
        },
      });
    }).to.throw('dataCustodian.privateKey must be of type string');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: validDataCustodian.publicKey,
          privateKey: 'same shit privateKey',
        },
      });
    }).to.throw('dataCustodian.privateKey must be of length 86');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: validDataCustodian.publicKey,
          privateKey: validDataCustodian.privateKey,
        },
      });
    }).to.throw('dataCustodian must have key "secret"');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: validDataCustodian.publicKey,
          privateKey: validDataCustodian.privateKey,
          secret: 99999,
        },
      });
    }).to.throw('dataCustodian.secret must be of type string');

    expect(() => {
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: validDataCustodian.publicKey,
          privateKey: validDataCustodian.privateKey,
          secret: 'some bunk secret',
        },
      });
    }).to.throw('dataCustodian.secret must be of length 32');

    expect(
      JLINC.validateDataCustodian({
        dataCustodian: {
          publicKey: validDataCustodian.publicKey,
          privateKey: validDataCustodian.privateKey,
          secret:  validDataCustodian.secret,
        },
      })
    ).to.be.true;

  });
});
