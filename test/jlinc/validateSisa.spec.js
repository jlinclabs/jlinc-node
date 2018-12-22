'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');
const { generateISODateStringInTheFuture } = require('../helpers');

describe('JLINC.validateSisa', function() {
  withDidServer();

  beforeEach(async function() {
    this.our = await this.generateSisa();
    this.other = await this.generateSisa();
  });

  it('should validate the given acceptedSisa', function() {

    expect( JLINC.validateSisa({ sisa: this.our.sisa }) ).to.be.true;

    expect(()=>{
      JLINC.validateSisa({});
    }).to.throw(JLINC.InvalidSisaError, 'sisa must be of type object');

    expect(()=>{
      JLINC.validateSisa({
        sisa: {},
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa must have key "@context"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
        },
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa must have key "acceptedSisaJwt"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: 89,
        },
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisaJwt must be of type string');

    expect(()=>{
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: 'foobarskeyz',
        },
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisaJwt is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: this.our.sisa.acceptedSisaJwt,
        },
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa must have key "sisaId"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: this.our.sisa.acceptedSisaJwt,
          sisaId: 45,
        },
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.sisaId must be of type string');

    expect(()=>{
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: this.our.sisa.acceptedSisaJwt,
          sisaId: 'love',
        },
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.sisaId is not a hash of sisa.acceptedSisaJwt');

    expect(
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: this.our.sisa.acceptedSisaJwt,
          sisaId: this.our.sisa.sisaId,
        }
      })
    ).to.be.true;

    const constructSisa = ({ acceptedSisa }) => {
      const acceptedSisaJwt = JLINC.createSignedJwt({
        itemToSign: acceptedSisa,
        secret: this.our.rightsHolder.secret,
      });
      return {
        '@context': JLINC.contextUrl,
        acceptedSisaJwt,
        sisaId: JLINC.createHash({ itemToHash: acceptedSisaJwt }),
      };
    };

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {},
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa must have key "@context"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': 'xxx',
          },
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa["@context"] is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
          },
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa must have key "offeredSisaJwt"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: 55,
          },
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.offeredSisaJwt must be of type string');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: 'boooshatron5000',
          },
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.offeredSisaJwt is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: 'xxx'+this.our.offeredSisaJwt,
          },
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.offeredSisaJwt is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: 'xxxxx',
          },
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.offeredSisaJwt is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
          },
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa must have key "rightsHolderSigType"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 89,
          }
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderSigType must be of type string');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'flowers',
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderSigType is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: JLINC.signatureType,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa must have key "rightsHolderDid"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderDid: 22,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderDid must be of type string');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderDid: this.our.rightsHolder.did,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa must have key "rightsHolderPublicKey"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: {},
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderPublicKey must be of length 43');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa must have key "rightsHolderSig"');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: 0,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderSig must be of type string');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: 'signatureatron',
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderSig is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa must have key "createdAt"');


    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
            createdAt: Date.now()
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.createdAt must be of type string');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
            createdAt: 'now',
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.createdAt must be an ISO Date String');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
            createdAt: generateISODateStringInTheFuture(),
          },
        })
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.createdAt cannot be in the future');

    expect(
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
            createdAt: this.our.acceptedSisa.createdAt,
          },
        }),
      })
    ).to.be.true;

    expect(
      JLINC.validateSisa({ sisa: this.our.sisa })
    ).to.be.true;


    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.other.acceptedSisa.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
            createdAt: this.our.acceptedSisa.createdAt,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderSig is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.other.rightsHolder.did,
            rightsHolderPublicKey: this.other.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
            createdAt: this.our.acceptedSisa.createdAt,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderSig is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.other.acceptedSisa.rightsHolderSig,
            createdAt: this.our.acceptedSisa.createdAt,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.rightsHolderSig is invalid');

    expect(()=>{
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: JLINC.createSignedJwt({
              itemToSign: {
                dataCustodianDid: this.our.dataCustodian.did,
              },
              secret: 'trees',
            }),
            rightsHolderDid: this.our.rightsHolder.did,
            rightsHolderPublicKey: this.our.rightsHolder.signingPublicKey,
            rightsHolderSigType: JLINC.signatureType,
            rightsHolderSig: this.other.acceptedSisa.rightsHolderSig,
            createdAt: this.our.acceptedSisa.createdAt,
          },
        }),
      });
    }).to.throw(JLINC.InvalidSisaError, 'sisa.acceptedSisa.offeredSisa must have key "@context"');

    expect(
      JLINC.validateSisa({ sisa: this.our.sisa })
    ).to.be.true;

  });
});
