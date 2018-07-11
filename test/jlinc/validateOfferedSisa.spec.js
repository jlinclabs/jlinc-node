'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.validateOfferedSisa', function() {
  it('should validate a sisaOffering', function() {
    const dataCustodian = JLINC.createEntity();
    const sisaAgreement = JLINC.createSisaAgreement();
    const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });
    const { offeredSisa } = sisaOffering;

    expect(() => {
      JLINC.validateOfferedSisa({});
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must be of type object');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {},
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "@context"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': 'xxx',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa["@context"] is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "agreementJwt"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: 'jay dubyah tea',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.agreementJwt is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: 'jay dubyah tea',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.agreementJwt is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianSigType"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 4,
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSigType must be of type string');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'alpha:numeric:awesome',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSigType is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianId"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: 44,
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianId must be of type string');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: 'fake dataCustodian id here',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianId must be of length 43');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: '0123456789012345678901234567890123456789012',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "dataCustodianSig"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: dataCustodian.publicKey,
          dataCustodianSig: 123,
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSig must be of type string');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: dataCustodian.publicKey,
          dataCustodianSig: 'jsdhfjkdshfjkdsfhdjkshfdsjkfhdsjkfhjk',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.dataCustodianSig is invalid');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: dataCustodian.publicKey,
          dataCustodianSig: offeredSisa.dataCustodianSig,
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa must have key "iat"');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: dataCustodian.publicKey,
          dataCustodianSig: offeredSisa.dataCustodianSig,
          iat: 123,
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.iat is too old');

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: dataCustodian.publicKey,
          dataCustodianSig: offeredSisa.dataCustodianSig,
          iat: Math.floor(Date.now() / 1000) + 10,
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.iat cannot be in the future');

    expect(
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: offeredSisa.agreementJwt,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: dataCustodian.publicKey,
          dataCustodianSig: offeredSisa.dataCustodianSig,
          iat: Math.floor(Date.now() / 1000),
        },
      })
    ).to.be.true;

    expect( JLINC.validateOfferedSisa({ offeredSisa }) ).to.be.true;

    // when given an invalid agreementJwt
    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa: {
          '@context': JLINC.contextUrl,
          agreementJwt: JLINC.createSignedJwt({ itemToSign: {}, secret: 'xx' }),
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: dataCustodian.publicKey,
          dataCustodianSig: offeredSisa.dataCustodianSig,
          iat: Math.floor(Date.now() / 1000),
        },
      });
    }).to.throw(JLINC.InvalidSisaAgreementError, 'acceptedSisa.agreement must have key "@context"');

    // when alice is checking that the offeredSisa is from the correct dataCustodian
    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa,
        dataCustodian: {
          publicKey: 'bad dataCustodian publicKey',
        }
      });
    }).to.throw();

    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa,
        dataCustodian: {
          publicKey: dataCustodian.publicKey,
        }
      });
    }).to.not.throw();

    // when bob is checking that the offeredSisa is from him, and it is
    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa,
        dataCustodian,
      });
    }).to.not.throw();

    // when bob is checking that the offeredSisa is from him, and it is not
    expect(() => {
      JLINC.validateOfferedSisa({
        offeredSisa,
        dataCustodian: {
          publicKey: dataCustodian.publicKey,
          secret: 'bad dataCustodian secret',
        },
      });
    }).to.throw(JLINC.InvalidOfferedSisaError, 'offeredSisa.agreementJwt was not signed by the given dataCustodian');

  });
});
