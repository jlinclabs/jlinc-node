'use strict';

const jsonwebtoken = require('jsonwebtoken');

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.validateSisa', function() {

  beforeEach(function() {
    this.our = this.generateSisa();
    this.other = this.generateSisa();
  });

  it('should validate the given acceptedSisa', function() {

    expect( JLINC.validateSisa({ sisa: this.our.sisa }) ).to.be.true;

    expect(() => {
      JLINC.validateSisa({});
    }).to.throw('sisa must be of type object');

    expect(() => {
      JLINC.validateSisa({
        sisa: {},
      });
    }).to.throw('sisa must have key "@context"');

    expect(() => {
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
        },
      });
    }).to.throw('sisa must have key "acceptedSisaJwt"');

    expect(() => {
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: 89,
        },
      });
    }).to.throw('sisa.acceptedSisaJwt must be of type string');

    expect(() => {
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: 'foobarskeyz',
        },
      });
    }).to.throw('sisa.acceptedSisaJwt is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: this.our.sisa.acceptedSisaJwt,
        },
      });
    }).to.throw('sisa must have key "sisaId"');

    expect(() => {
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: this.our.sisa.acceptedSisaJwt,
          sisaId: 45,
        },
      });
    }).to.throw('sisa.sisaId must be of type string');

    expect(() => {
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: this.our.sisa.acceptedSisaJwt,
          sisaId: 'love',
        },
      });
    }).to.throw('sisa.sisaId is not a hash of sisa.acceptedSisaJwt');

    expect(() => {
      JLINC.validateSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: this.our.sisa.acceptedSisaJwt,
          sisaId: this.our.sisa.sisaId,
        }
      });
    }).to.not.throw();

    const constructSisa = ({ acceptedSisa }) => {
      const acceptedSisaJwt = jsonwebtoken.sign(acceptedSisa, this.our.rightsHolder.privateKey);
      return {
        '@context': JLINC.contextUrl,
        acceptedSisaJwt,
        sisaId: JLINC.createHash({ itemToHash: acceptedSisaJwt }),
      };
    };

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {},
        })
      });
    }).to.throw('sisa.acceptedSisa must have key "@context"');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': 'xxx',
          },
        })
      });
    }).to.throw('sisa.acceptedSisa["@context"] is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
          },
        })
      });
    }).to.throw('sisa.acceptedSisa must have key "offeredSisaJwt"');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: 55,
          },
        })
      });
    }).to.throw('sisa.acceptedSisa.offeredSisaJwt must be of type string');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: 'boooshatron5000',
          },
        })
      });
    }).to.throw('sisa.acceptedSisa.offeredSisaJwt is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: 'xxx'+this.our.offeredSisaJwt,
          },
        })
      });
    }).to.throw('sisa.acceptedSisa.offeredSisaJwt is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: 'xxxxx',
          },
        })
      });
    }).to.throw('sisa.acceptedSisa.offeredSisaJwt is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
          },
        })
      });
    }).to.throw('sisa.acceptedSisa must have key "rightsHolderSigType"');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 89,
          }
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderSigType must be of type string');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'flowers',
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderSigType is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa must have key "rightsHolderId"');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: 89.
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderId must be of type string');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: 'fourtytwo',
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderId must be of length 43');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: this.our.rightsHolder.publicKey,
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa must have key "rightsHolderSig"');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: this.our.rightsHolder.publicKey,
            rightsHolderSig: 0,
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderSig must be of type string');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: this.our.rightsHolder.publicKey,
            rightsHolderSig: 'signatureatron',
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderSig is invalid');

    // we cannot do this expecation where iat is missing because
    // jsonwebtoken.sign adds it
    //    expect(() => {
    //      JLINC.validateSisa({
    //        sisa: constructSisa({
    //          acceptedSisa: {
    //            '@context': JLINC.contextUrl,
    //            offeredSisaJwt: this.our.offeredSisaJwt,
    //            rightsHolderSigType: 'sha256:ed25519',
    //            rightsHolderId: this.our.rightsHolder.publicKey,
    //            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
    //          },
    //        }),
    //      });
    //    }).to.throw('sisa.acceptedSisa must have key "iat"');
    //
    //    expect(() => {
    //      JLINC.validateSisa({
    //        sisa: constructSisa({
    //          acceptedSisa: {
    //            '@context': JLINC.contextUrl,
    //            offeredSisaJwt: this.our.offeredSisaJwt,
    //            rightsHolderSigType: 'sha256:ed25519',
    //            rightsHolderId: this.our.rightsHolder.publicKey,
    //            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
    //            iat: 'now',
    //          },
    //        }),
    //      });
    //    }).to.throw('sisa.acceptedSisa.iat must be of type number');
    //
    //    expect(() => {
    //      JLINC.validateSisa({
    //        acceptedSisa: {
    //          '@context': JLINC.contextUrl,
    //          offeredSisaJwt: this.our.offeredSisaJwt,
    //          rightsHolderSigType: 'sha256:ed25519',
    //          rightsHolderId: this.our.rightsHolder.publicKey,
    //          rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
    //          iat: 12,
    //        },
    //      });
    //    }).to.throw('sisa.acceptedSisa.iat is too old');
    //
    //    expect(() => {
    //      JLINC.validateSisa({
    //        acceptedSisa: {
    //          '@context': JLINC.contextUrl,
    //          offeredSisaJwt: this.our.offeredSisaJwt,
    //          rightsHolderSigType: 'sha256:ed25519',
    //          rightsHolderId: this.our.rightsHolder.publicKey,
    //          rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
    //          iat: 23487328473289473892,
    //        },
    //      });
    //    }).to.throw('sisa.acceptedSisa.iat cannot be in the future');

    expect(
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: this.our.rightsHolder.publicKey,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
          },
        }),
      })
    ).to.be.true;

    expect(
      JLINC.validateSisa({ sisa: this.our.sisa })
    ).to.be.true;


    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.other.acceptedSisa.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: this.our.rightsHolder.publicKey,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
            iat: Date.now(),
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderSig is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: this.other.acceptedSisa.rightsHolderId,
            rightsHolderSig: this.our.acceptedSisa.rightsHolderSig,
            iat: Date.now(),
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderSig is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: this.our.offeredSisaJwt,
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: this.our.rightsHolder.publicKey,
            rightsHolderSig: this.other.acceptedSisa.rightsHolderSig,
            iat: Date.now(),
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderSig is invalid');

    expect(() => {
      JLINC.validateSisa({
        sisa: constructSisa({
          acceptedSisa: {
            '@context': JLINC.contextUrl,
            offeredSisaJwt: jsonwebtoken.sign({}, 'xx'),
            rightsHolderSigType: 'sha256:ed25519',
            rightsHolderId: this.our.rightsHolder.publicKey,
            rightsHolderSig: this.other.acceptedSisa.rightsHolderSig,
            iat: Date.now(),
          },
        }),
      });
    }).to.throw('sisa.acceptedSisa.offeredSisa must have key "@context"');

    expect(
      JLINC.validateSisa({ sisa: this.our.sisa })
    ).to.be.true;


    // when bob is checking that the acceptedSisa is from him, and it is
    expect(() => {
      JLINC.validateSisa({
        sisa: this.our.sisa,
        dataCustodian: this.our.dataCustodian,
      });
    }).to.not.throw();

    // when bob is checking that the acceptedSisa is from him, and it is not
    expect(() => {
      JLINC.validateSisa({
        sisa: this.other.sisa,
        dataCustodian: this.our.dataCustodian,
      });
    }).to.throw('sisa.acceptedSisa.offeredSisa.agreementJwt was not signed by the given dataCustodian');

    // when alice is checking that the acceptedSisa is from her, and it is
    expect(() => {
      JLINC.validateSisa({
        sisa: this.our.sisa,
        rightsHolder: this.our.rightsHolder,
      });
    }).to.not.throw();

    // when alice is checking that the acceptedSisa is from her, and it is not
    expect(() => {
      JLINC.validateSisa({
        sisa: this.other.sisa,
        rightsHolder: this.our.rightsHolder,
      });
    }).to.throw('sisa.acceptedSisa.rightsHolderId does not match given rightsHolder');
  });
});
