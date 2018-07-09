'use strict';

require('../setup');

describe('JLINC.validateOfferedSisa', function() {
  it('should validate a sisaOffering', function() {
    const dataCustodian = JLINC.createEntity();
    const sisaAgreement = JLINC.createSisaAgreement();
    const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });
    const { offeredSisa } = sisaOffering;

    expect(() => {
      JLINC.validateOfferedSisa({});
    }).to.throw('offeredSisa must be of type object');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {},
      });
    }).to.throw('offeredSisa must have key "@context"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'xxx',
        },
      });
    }).to.throw('offeredSisa["@context"] is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        },
      });
    }).to.throw('offeredSisa must have key "agreementJwt"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: 'jay dubyah tea',
        },
      });
    }).to.throw('offeredSisa.agreementJwt is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: 'jay dubyah tea',
        },
      });
    }).to.throw('offeredSisa.agreementJwt is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
        },
      });
    }).to.throw('offeredSisa must have key "dataCustodianSigType"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 4,
        },
      });
    }).to.throw('offeredSisa.dataCustodianSigType must be of type string');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'alpha:numeric:awesome',
        },
      });
    }).to.throw('offeredSisa.dataCustodianSigType is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
        },
      });
    }).to.throw('offeredSisa must have key "dataCustodianID"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianID: 44,
        },
      });
    }).to.throw('offeredSisa.dataCustodianID must be of type string');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianID: dataCustodian.id,
        },
      });
    }).to.throw('offeredSisa must have key "dataCustodianSig"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianID: dataCustodian.id,
          dataCustodianSig: 123,
        },
      });
    }).to.throw('offeredSisa.dataCustodianSig must be of type string');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianID: dataCustodian.id,
          dataCustodianSig: offeredSisa.dataCustodianSig,
        },
      });
    }).to.throw('offeredSisa must have key "iat"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianID: dataCustodian.id,
          dataCustodianSig: offeredSisa.dataCustodianSig,
          iat: 123,
        },
      });
    }).to.throw('offeredSisa.iat is too old');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianID: dataCustodian.id,
          dataCustodianSig: offeredSisa.dataCustodianSig,
          iat: Date.now() + 10000,
        },
      });
    }).to.throw('offeredSisa.iat cannot be in the future');

    expect(
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianID: dataCustodian.id,
          dataCustodianSig: offeredSisa.dataCustodianSig,
          iat: Date.now(),
        },
      })
    ).to.be.true;

    expect( JLINC.validateOfferedSisa({ offeredSisa }) ).to.be.true;
  });
});
