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
    }).to.throw('rightsHolder must have key "publicKey"');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: 42,
        },
      });
    }).to.throw('rightsHolder.publicKey must be of type string');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: 'same shit id',
        },
      });
    }).to.throw('rightsHolder.publicKey must be of length 43');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: validRightsHolder.publicKey,
        },
      });
    }).to.throw('rightsHolder must have key "privateKey"');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: validRightsHolder.publicKey,
          privateKey: undefined,
        },
      });
    }).to.throw('rightsHolder.privateKey must be of type string');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: validRightsHolder.publicKey,
          privateKey:'same shit privateKey',
        },
      });
    }).to.throw('rightsHolder.privateKey must be of length 86');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: validRightsHolder.publicKey,
          privateKey: validRightsHolder.privateKey,
        },
      });
    }).to.throw('rightsHolder must have key "secret"');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: validRightsHolder.publicKey,
          privateKey: validRightsHolder.privateKey,
          secret: 99999,
        },
      });
    }).to.throw('rightsHolder.secret must be of type string');

    expect(() => {
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: validRightsHolder.publicKey,
          privateKey: validRightsHolder.privateKey,
          secret: 'some bunk secret',
        },
      });
    }).to.throw('rightsHolder.secret must be of length 32');

    expect(
      JLINC.validateRightsHolder({
        rightsHolder: {
          publicKey: validRightsHolder.publicKey,
          privateKey: validRightsHolder.privateKey,
          secret:  validRightsHolder.secret,
        },
      })
    ).to.be.true;

  });
});
