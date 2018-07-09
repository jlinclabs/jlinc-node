'use strict';

require('../setup');

describe('JLINC.validateSisaOffering', function() {
  it('should validate a sisaOffering', function() {
    const dataCustodian = JLINC.createEntity();
    const sisaAgreement = JLINC.createSisaAgreement();
    const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });

    expect(() => {
      JLINC.validateSisaOffering({});
    }).to.throw('sisaOffering must be of type object');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {},
      });
    }).to.throw('sisaOffering must have key "@context"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'xxx',
        },
      });
    }).to.throw('sisaOffering["@context"] is invalid');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        },
      });
    }).to.throw('sisaOffering must have key "offeredSisa"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: 'bunk sisa',
        },
      });
    }).to.throw('sisaOffering.offeredSisa must be of type object');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {},
        },
      });
    }).to.throw('sisaOffering.offeredSisa must have key "@context"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'xxx',
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa["@context"] is invalid');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa must have key "agreementJwt"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: 'jay dubyah tea',
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa.agreementJwt is invalid');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: 'jay dubyah tea',
          },
        }
      });
    }).to.throw('sisaOffering.offeredSisa.agreementJwt is invalid');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa must have key "dataCustodianSigType"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 4,
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa.dataCustodianSigType must be of type string');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'alpha:numeric:awesome',
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa.dataCustodianSigType is invalid');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'sha256:ed25519',
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa must have key "dataCustodianID"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianID: 44,
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa.dataCustodianID must be of type string');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianID: dataCustodian.id,
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa must have key "dataCustodianSig"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianID: dataCustodian.id,
            dataCustodianSig: 123,
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa.dataCustodianSig must be of type string');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianID: dataCustodian.id,
            dataCustodianSig: sisaOffering.offeredSisa.dataCustodianSig,
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa must have key "iat"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianID: dataCustodian.id,
            dataCustodianSig: sisaOffering.offeredSisa.dataCustodianSig,
            iat: 123,
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa.iat is too old');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianID: dataCustodian.id,
            dataCustodianSig: sisaOffering.offeredSisa.dataCustodianSig,
            iat: Date.now() + 10000,
          },
        },
      });
    }).to.throw('sisaOffering.offeredSisa.iat cannot be in the future');

    expect(
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisa: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            agreementJwt: sisaOffering.offeredSisa.agreementJwt,
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianID: dataCustodian.id,
            dataCustodianSig: sisaOffering.offeredSisa.dataCustodianSig,
            iat: Date.now(),
          },
        },
      })
    ).to.be.true;

    expect( JLINC.validateSisaOffering({ sisaOffering }) ).to.be.true;
  });
});
