'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.validateRightsHolder', function() {
  it('should validate a given rightsHolder', function(){
    const validRightsHolder = JLINC.createEntity();

    expect(() => {
      JLINC.validateRightsHolder({});
    }).to.throw('rightsHolder must be of type object');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {},
      });
    }).to.throw('rightsHolder must have key "id"');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: 42,
        },
      });
    }).to.throw('rightsHolder.id must be of type string');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: 'same shit id',
        },
      });
    }).to.throw('rightsHolder.id must be of length 43');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: validRightsHolder.id,
        },
      });
    }).to.throw('rightsHolder must have key "secretKey"');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: validRightsHolder.id,
          secretKey: undefined,
        },
      });
    }).to.throw('rightsHolder.secretKey must be of type string');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: validRightsHolder.id,
          secretKey:'same shit secretKey',
        },
      });
    }).to.throw('rightsHolder.secretKey must be of length 86');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: validRightsHolder.id,
          secretKey: validRightsHolder.secretKey,
        },
      });
    }).to.throw('rightsHolder must have key "nonce"');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: validRightsHolder.id,
          secretKey: validRightsHolder.secretKey,
          nonce: 99999,
        },
      });
    }).to.throw('rightsHolder.nonce must be of type string');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: validRightsHolder.id,
          secretKey: validRightsHolder.secretKey,
          nonce: 'some bunk nonce',
        },
      });
    }).to.throw('rightsHolder.nonce must be of length 32');

    expect(
      JLINC.validateRightsHolder({
        rightsHolder: {
          id: validRightsHolder.id,
          secretKey: validRightsHolder.secretKey,
          nonce:  validRightsHolder.nonce,
        },
      })
    ).to.be.true;

  });
});
