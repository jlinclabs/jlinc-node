'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');
const { generateISODateStringInTheFuture } = require('../helpers');

describe('JLINC.validateBisa', function() {
  withDidServer();

  beforeEach(async function() {
    this.our = await this.generateBisa();
    this.other = await this.generateBisa();
  });

  it('should validate the given acceptedBisa', function() {

    expect( JLINC.validateBisa({ bisa: this.our.bisa }) ).to.be.true;

    expect(()=>{
      JLINC.validateBisa({});
    }).to.throw(JLINC.InvalidBisaError, 'bisa must be of type object');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {},
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa must have key "@context"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {
          '@context': 'http://iownyou.net',
        },
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa["@context"] is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {
          '@context': JLINC.contextUrl,
        },
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa must have key "acceptedBisaJwt"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {
          '@context': JLINC.contextUrl,
          acceptedBisaJwt: 89,
        },
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisaJwt must be of type string');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {
          '@context': JLINC.contextUrl,
          acceptedBisaJwt: 'foobarskeyz',
        },
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisaJwt is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {
          '@context': JLINC.contextUrl,
          acceptedBisaJwt: 'abc123.abc123.abc123',
        },
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisaJwt is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {
          '@context': JLINC.contextUrl,
          acceptedBisaJwt: this.our.bisa.acceptedBisaJwt,
        },
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa must have key "bisaId"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {
          '@context': JLINC.contextUrl,
          acceptedBisaJwt: this.our.bisa.acceptedBisaJwt,
          bisaId: 45,
        },
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.bisaId must be of type string');

    expect(()=>{
      JLINC.validateBisa({
        bisa: {
          '@context': JLINC.contextUrl,
          acceptedBisaJwt: this.our.bisa.acceptedBisaJwt,
          bisaId: 'love',
        },
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.bisaId is not a hash of bisa.acceptedBisaJwt');

    expect(
      JLINC.validateBisa({
        bisa: {
          '@context': JLINC.contextUrl,
          acceptedBisaJwt: this.our.bisa.acceptedBisaJwt,
          bisaId: this.our.bisa.bisaId,
        }
      })
    ).to.be.true;

    const constructBisa = ({ acceptedBisa }) => {
      const acceptedBisaJwt = JLINC.createSignedJwt({
        itemToSign: acceptedBisa,
        secret: this.our.target.secret,
      });
      return {
        '@context': JLINC.contextUrl,
        acceptedBisaJwt,
        bisaId: JLINC.createHash({ itemToHash: acceptedBisaJwt }),
      };
    };

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {},
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa must have key "@context"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': 'xxx',
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa["@context"] is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa must have key "offeredBisaJwt"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: 55,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.offeredBisaJwt must be of type string');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: 'boooshatron5000',
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.offeredBisaJwt is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: 'xxx'+this.our.acceptedBisa.offeredBisaJwt,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.offeredBisaJwt is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: 'xxxxx',
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.offeredBisaJwt is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: JLINC.createSignedJwt({
              itemToSign: {},
              secret: this.our.offeror.secret,
            }),
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.offeredBisa must have key "@context"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa must have key "acceptorSigType"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: 55,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.acceptorSigType must be of type string');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: 'donkies',
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.acceptorSigType is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa must have key "acceptorDid"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: 'shoes',
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.acceptorDid must be a DID');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa must have key "acceptorPublicKey"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
            acceptorPublicKey: 'xxxx',
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.acceptorPublicKey must be of length 43');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
            acceptorPublicKey: this.our.target.signingPublicKey,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa must have key "acceptorSig"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
            acceptorPublicKey: this.our.target.signingPublicKey,
            acceptorSig: 14,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.acceptorSig must be of type string');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
            acceptorPublicKey: this.our.target.signingPublicKey,
            acceptorSig: 'sigs are fun',
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.acceptorSig is invalid');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
            acceptorPublicKey: this.our.target.signingPublicKey,
            acceptorSig: this.our.acceptedBisa.acceptorSig,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa must have key "createdAt"');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
            acceptorPublicKey: this.our.target.signingPublicKey,
            acceptorSig: this.our.acceptedBisa.acceptorSig,
            createdAt: 9999999,
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.createdAt must be of type string');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
            acceptorPublicKey: this.our.target.signingPublicKey,
            acceptorSig: this.our.acceptedBisa.acceptorSig,
            createdAt: 'somtime tomorrow morning',
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.createdAt must be an ISO Date String');

    expect(()=>{
      JLINC.validateBisa({
        bisa: constructBisa({
          acceptedBisa: {
            '@context': JLINC.contextUrl,
            offeredBisaJwt: this.our.acceptedBisa.offeredBisaJwt,
            acceptorSigType: JLINC.signatureType,
            acceptorDid: this.our.target.did,
            acceptorPublicKey: this.our.target.signingPublicKey,
            acceptorSig: this.our.acceptedBisa.acceptorSig,
            createdAt: generateISODateStringInTheFuture(),
          },
        })
      });
    }).to.throw(JLINC.InvalidBisaError, 'bisa.acceptedBisa.createdAt cannot be in the future');

    expect(
      JLINC.validateBisa({ bisa: this.our.bisa })
    ).to.be.true;

  });
});
