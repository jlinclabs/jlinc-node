'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.validateBisaAgreement', function() {
  it('should validate a given SISA Agreement', function(){
    expect(() => {
      JLINC.validateBisaAgreement({});
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement must be of type object');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {},
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement must have key "@context"');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': 'yourface',
        },
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement["@context"] is invalid');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': JLINC.contextUrl,
        },
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement must have key "jlincId"');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: 42,
        },
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement.jlincId must be of type string');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: 'my wack jlinc Id',
        },
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement.jlincId is invalid');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
        },
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement must have key "agreementURI"');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: null,
        },
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement.agreementURI must be of type string');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'booohyakahshaaaa',
        },
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement.agreementURI must be a url');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'https://bisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
        },
      });
    }).to.throw(JLINC.InvalidBisaAgreementError, 'bisaAgreement must have key "targetAcceptorDid"');

    expect(() => {
      JLINC.validateBisaAgreement({
        bisaAgreement: {
          '@context': JLINC.contextUrl,
          jlincId: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
          agreementURI: 'https://bisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
          targetAcceptorDid: 'did:jlinc:IcUIumA04iGgLOllGBsk03CcPlw5NfYvBWN1KqDELyk',
        },
      });
    }).to.not.throw();
  });
});
