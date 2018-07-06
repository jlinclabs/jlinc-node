'use strict';

require('./setup');

describe('JLINC.validateSisaAgreement', function() {
  it('should validate a given SISA Agreement', function(){
    expect(() => {
      JLINC.validateSisaAgreement();
    }).to.throw('sisaAgreement must be of type object');

    expect(() => {
      JLINC.validateSisaAgreement({});
    }).to.throw('sisaAgreement must have key "@context"');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'yourface',
      });
    }).to.throw('sisaAgreement["@context"] is invalid');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
      });
    }).to.throw('sisaAgreement must have key "jlincID"');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: 42,
      });
    }).to.throw('sisaAgreement["jlincID"] must be of type string');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: 'my wack jlinc ID',
      });
    }).to.throw('sisaAgreement["jlincID"] is invalid');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
      });
    }).to.throw('sisaAgreement must have key "agreementURI"');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
        agreementURI: 'http://agreeeeeeeeeeee.ment',
      });
    }).to.throw('sisaAgreement["agreementURI"] is invalid');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
        agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
      });
    }).to.throw('sisaAgreement must have key "iat"');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
        agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
        iat: undefined,
      });
    }).to.throw('sisaAgreement["iat"] must be of type number');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
        agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
        iat: 12345,
      });
    }).to.throw('sisaAgreement["iat"] is too old');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
        agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
        iat: Date.now() + 1000,
      });
    }).to.throw('sisaAgreement["iat"] cannot be in the future');

    expect(() => {
      JLINC.validateSisaAgreement({
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        jlincID: '133cd3f1fca1045bf7c8e711b6ae8ba79482866ab142f241c958f686f44468b2',
        agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
        iat: Date.now(),
      });
    }).to.not.throw();
  });
});
