'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.validateSisaAgreement', function() {
  it('should validate a given SISA Agreement', function(){
    expect(() => {
      JLINC.validateSisaAgreement({});
    }).to.throw('sisaAgreement must be of type object');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {},
      });
    }).to.throw('sisaAgreement must have key "@context"');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': 'yourface',
        },
      });
    }).to.throw('sisaAgreement["@context"] is invalid');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
        },
      });
    }).to.throw('sisaAgreement must have key "jlincId"');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: 42,
        },
      });
    }).to.throw('sisaAgreement.jlincId must be of type string');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: 'my wack jlinc Id',
        },
      });
    }).to.throw('sisaAgreement.jlincId is invalid');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
        },
      });
    }).to.throw('sisaAgreement must have key "agreementURI"');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: null,
        },
      });
    }).to.throw('sisaAgreement.agreementURI must be of type string');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'booohyakahshaaaa',
        },
      });
    }).to.throw('sisaAgreement.agreementURI must be a url');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
        },
      });
    }).to.throw('sisaAgreement must have key "iat"');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
          iat: undefined,
        },
      });
    }).to.throw('sisaAgreement.iat must be of type number');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
          iat: 12345,
        },
      });
    }).to.throw('sisaAgreement.iat is too old');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
          iat: Math.floor(Date.now() / 1000) + 10,
        },
      });
    }).to.throw('sisaAgreement.iat cannot be in the future');

    expect(() => {
      JLINC.validateSisaAgreement({
        sisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
          iat: Math.floor(Date.now() / 1000),
        },
      });
    }).to.not.throw();
  });
});
