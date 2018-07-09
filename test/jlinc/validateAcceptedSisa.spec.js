'use strict';

require('../setup');

describe('JLINC.validateAcceptedSisa', function() {
  beforeEach(function() {
    const dataCustodian = JLINC.createEntity();
    const sisaAgreement = JLINC.createSisaAgreement();
    const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });
    const { offeredSisa } = sisaOffering;
    const rightsHolder = JLINC.createEntity();
    const acceptedSisa = JLINC.acceptSisa({ offeredSisa, rightsHolder });
    this.acceptedSisa = acceptedSisa;
  });

  it('should validate the given acceptedSisa', function() {
    expect(() => {
      JLINC.validateAcceptedSisa({});
    }).to.throw('acceptedSisa must be of type object');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {},
      });
    }).to.throw('acceptedSisa must have key "@context"');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'xxx',
        },
      });
    }).to.throw('acceptedSisa["@context"] is invalid');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        },
      });
    }).to.throw('acceptedSisa must have key "offeredSisaJwt"');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: 55,
        },
      });
    }).to.throw('acceptedSisa.offeredSisaJwt must be of type string');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: 'boooshatron5000',
        },
      });
    }).to.throw('acceptedSisa.offeredSisaJwt is invalid');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: 'xxx'+this.acceptedSisa.offeredSisaJwt,
        },
      });
    }).to.throw('acceptedSisa.offeredSisaJwt is invalid');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
        },
      });
    }).to.throw('acceptedSisa must have key "rightsHolderSigType"');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 89,
        },
      });
    }).to.throw('acceptedSisa.rightsHolderSigType must be of type string');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'flowers',
        },
      });
    }).to.throw('acceptedSisa.rightsHolderSigType is invalid');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
        },
      });
    }).to.throw('acceptedSisa must have key "rightsHolderID"');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: 89.
        },
      });
    }).to.throw('acceptedSisa.rightsHolderID must be of type string');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: 'fourtytwo',
        },
      });
    }).to.throw('acceptedSisa.rightsHolderID must be of length 43');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: this.acceptedSisa.rightsHolderID,
        },
      });
    }).to.throw('acceptedSisa must have key "rightsHolderSig"');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: this.acceptedSisa.rightsHolderID,
          rightsHolderSig: 0,
        },
      });
    }).to.throw('acceptedSisa.rightsHolderSig must be of type string');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: this.acceptedSisa.rightsHolderID,
          rightsHolderSig: 'signatureatron',
        },
      });
    }).to.throw('acceptedSisa.rightsHolderSig is invalid');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: this.acceptedSisa.rightsHolderID,
          rightsHolderSig: this.acceptedSisa.rightsHolderSig,
        },
      });
    }).to.throw('acceptedSisa must have key "iat"');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: this.acceptedSisa.rightsHolderID,
          rightsHolderSig: this.acceptedSisa.rightsHolderSig,
          iat: 'now',
        },
      });
    }).to.throw('acceptedSisa.iat must be of type number');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: this.acceptedSisa.rightsHolderID,
          rightsHolderSig: this.acceptedSisa.rightsHolderSig,
          iat: 12,
        },
      });
    }).to.throw('acceptedSisa.iat is too old');

    expect(() => {
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: this.acceptedSisa.rightsHolderID,
          rightsHolderSig: this.acceptedSisa.rightsHolderSig,
          iat: 23487328473289473892,
        },
      });
    }).to.throw('acceptedSisa.iat cannot be in the future');

    expect(
      JLINC.validateAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: this.acceptedSisa.offeredSisaJwt,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: this.acceptedSisa.rightsHolderID,
          rightsHolderSig: this.acceptedSisa.rightsHolderSig,
          iat: Date.now(),
        },
      })
    ).to.be.true;

    expect(
      JLINC.validateAcceptedSisa({ acceptedSisa: this.acceptedSisa })
    ).to.be.true;
  });
});
