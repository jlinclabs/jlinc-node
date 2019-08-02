'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('signing a BISA', function(){
  withDidServer();
  it('should work', async function() {
    /******************
     * ALL On the B Server
     ******************/

    const dataCustodianA = await JLINC.createDataCustodian();
    const dataCustodianB = await JLINC.createDataCustodian();
    const dataCustodianC = await JLINC.createDataCustodian();

    const bisaOfferings = {};
    const bisas = {};
    const bisaEvents = {};
    const acknowledgedBisaEvents = {};
    /*
     * dataCustodianA wants to connect to dataCustodianB
     */
    bisaOfferings.a_b = JLINC.createBisaOffering({
      dataCustodian: dataCustodianA,
      targetAcceptorDid: dataCustodianB.did,
    });

    expect(bisaOfferings.a_b).to.matchPattern({
      '@context': JLINC.contextUrl,
      id: _.isAJlincId,
      offeredBisa: {
        '@context': JLINC.contextUrl, // JLINC.bisaContextUrl
        agreementJwt: _.isAJwtMatchingPattern({
          '@context': JLINC.contextUrl,
          agreementURI: JLINC.defaultAgreementURI,
          jlincId: _.isAJlincId,
          targetAcceptorDid: dataCustodianB.did,
        }),
        offerorSigType: JLINC.signatureType,
        offerorDid: dataCustodianA.did,
        offerorPublicKey: dataCustodianA.signingPublicKey,
        offerorSig: _.isString,
        createdAt: _.isDateString,
      },
    });

    expect(bisaOfferings.a_b.offeredBisa.agreementJwt)
      .to.be.aJwtSignedWith(dataCustodianA.secret);

    /*
     * dataCustodianB wants to connect to dataCustodianC
     */
    bisaOfferings.b_c = JLINC.createBisaOffering({
      dataCustodian: dataCustodianB,
      targetAcceptorDid: dataCustodianC.did,
    });

    expect(bisaOfferings.b_c).to.matchPattern({
      '@context': JLINC.contextUrl,
      id: _.isAJlincId,
      offeredBisa: {
        '@context': JLINC.contextUrl,
        agreementJwt: _.isAJwtMatchingPattern({
          '@context': JLINC.contextUrl,
          agreementURI: JLINC.defaultAgreementURI,
          jlincId: _.isAJlincId,
          targetAcceptorDid: dataCustodianC.did,
        }),
        offerorSigType: JLINC.signatureType,
        offerorDid: dataCustodianB.did,
        offerorPublicKey: dataCustodianB.signingPublicKey,
        offerorSig: _.isString,
        createdAt: _.isDateString,
      },
    });

    /*
     * dataCustodianB wants to accept the bisa with dataCustodianA
     */

    expect(bisaOfferings.a_b).to.be.serializable();

    JLINC.validateBisaOffering({
      bisaOffering: bisaOfferings.a_b,
    });

    await JLINC.verifyBisaOfferingDid({
      bisaOffering: bisaOfferings.a_b,
    });

    expect(() => {
      JLINC.acceptBisa({
        bisaOffering: bisaOfferings.a_b,
        dataCustodian: dataCustodianC,
      });
    }).to.throw(
      JLINC.InvalidBisaError,
      'bisaOffering.offeredBisa.agreement.targetAcceptorDid does not match given dataCustodian.did',
    );

    bisas.a_b = JLINC.acceptBisa({
      bisaOffering: bisaOfferings.a_b,
      dataCustodian: dataCustodianB,
    });

    expect(bisas.a_b).to.matchPattern({
      '@context': JLINC.contextUrl,
      bisaId: _.isString,
      acceptedBisaJwt: _.isAJwtMatchingPattern({
        '@context': JLINC.contextUrl,
        acceptorSigType: JLINC.signatureType,
        acceptorDid: dataCustodianB.did,
        acceptorPublicKey: dataCustodianB.signingPublicKey,
        acceptorSig: _.isString,
        createdAt: _.isRecentDatetimeInISOFormat,
        offeredBisaJwt: _.isAJwtMatchingPattern({
          '@context': JLINC.contextUrl,
          offerorSigType: JLINC.signatureType,
          offerorDid: dataCustodianA.did,
          offerorPublicKey: dataCustodianA.signingPublicKey,
          offerorSig: _.isString,
          createdAt: _.isRecentDatetimeInISOFormat,
          agreementJwt: _.isAJwtMatchingPattern({
            '@context': JLINC.contextUrl,
            jlincId: _.isString,
            agreementURI: JLINC.defaultAgreementURI,
            targetAcceptorDid: dataCustodianB.did,
          }),
        }),
      }),
    });


    bisas.b_c = JLINC.acceptBisa({
      bisaOffering: bisaOfferings.b_c,
      dataCustodian: dataCustodianC,
    });

    JLINC.validateBisa({ bisa: bisas.b_c });

    // the reasons this is not built into validateSisa is because no one
    // actor has both
    JLINC.verifyBisaWasSignedBy({
      bisa: bisas.a_b,
      dataCustodian: dataCustodianA,
    });

    JLINC.verifyBisaWasSignedBy({
      bisa: bisas.a_b,
      dataCustodian: dataCustodianB,
    });

    expect(() => {
      JLINC.verifyBisaWasSignedBy({
        bisa: bisas.a_b,
        dataCustodian: dataCustodianC,
      });
    }).to.throw(
      JLINC.BisaVerificationError,
      'bisa was not signed by the given dataCustodian'
    );

    expect(bisas.a_b).to.matchPattern({
      '@context': JLINC.contextUrl,
      bisaId: _.isString,
      acceptedBisaJwt: _.isAJwtMatchingPattern({
        '@context': JLINC.contextUrl,
        acceptorSigType: JLINC.signatureType,
        acceptorDid: dataCustodianB.did,
        acceptorPublicKey: dataCustodianB.signingPublicKey,
        acceptorSig: _.isString,
        createdAt: _.isRecentDatetimeInISOFormat,
        offeredBisaJwt: _.isAJwtMatchingPattern({
          '@context': JLINC.contextUrl,
          offerorSigType: JLINC.signatureType,
          offerorDid: dataCustodianA.did,
          offerorPublicKey: dataCustodianA.signingPublicKey,
          offerorSig: _.isString,
          createdAt: _.isRecentDatetimeInISOFormat,
          agreementJwt:_.isAJwtMatchingPattern({
            '@context': JLINC.contextUrl,
            jlincId: _.isString,
            agreementURI: JLINC.defaultAgreementURI,
            targetAcceptorDid: dataCustodianB.did,
          }),
        }),
      }),
    });
    expect(bisas.a_b.acceptedBisaJwt).to.be.aJwtSignedWith(dataCustodianB.secret);

    expect(JLINC.expandBisa({ bisa: bisas.a_b })).to.matchPattern({
      '@context': JLINC.contextUrl,
      bisaId: _.isString,
      acceptedBisa: {
        '@context': JLINC.contextUrl,
        acceptorSigType: JLINC.signatureType,
        acceptorDid: dataCustodianB.did,
        acceptorPublicKey: dataCustodianB.signingPublicKey,
        acceptorSig: _.isString,
        createdAt: _.isRecentDatetimeInISOFormat,
        offeredBisa: {
          '@context': JLINC.contextUrl,
          offerorSigType: JLINC.signatureType,
          offerorDid: dataCustodianA.did,
          offerorPublicKey: dataCustodianA.signingPublicKey,
          offerorSig: _.isString,
          createdAt: _.isRecentDatetimeInISOFormat,
          agreement: {
            '@context': JLINC.contextUrl,
            jlincId: _.isString,
            agreementURI: JLINC.defaultAgreementURI,
            targetAcceptorDid: dataCustodianB.did,
          },
        },
      },
    });

    // simulate sending bisa across an HTTP request
    expect(bisas.a_b).to.be.serializable();

    JLINC.validateBisa({ bisa: bisas.a_b });

    await JLINC.verifyBisaAcceptorDid({
      bisa: bisas.a_b,
    });


    /*
     * Data Custodian B allows Data Custodian A to
     * show this relationship publically
     */

    bisaEvents.a_b = [];

    bisaEvents.a_b[0] = JLINC.createBisaEvent({
      eventType: 'permissionEvent',
      event: {
        canShowRelationshipPublicly: true,
      },
      bisa: bisas.a_b,
      latestBisaEvent: null,
      dataCustodian: dataCustodianA,
    });

    expect(bisaEvents.a_b[0]).to.matchPattern({
      '@context': JLINC.contextUrl,
      audit: {
        eventType: 'permissionEvent',
        bisaId: bisas.a_b.bisaId,
        eventId: _.isString,
        createdAt:  _.isRecentDatetimeInISOFormat,
        previousId: null,
        initiatorDid: dataCustodianA.did,
        initiatorPublicKey: dataCustodianA.signingPublicKey,
        initiatorSigType: JLINC.signatureType,
        initiatorSig: _.isString,
      },
      eventJwt: _.isAJwtMatchingPattern({
        canShowRelationshipPublicly: true,
      }),
    });

    expect(
      JLINC.expandBisaEvent({ bisaEvent: bisaEvents.a_b[0] })
    ).to.matchPattern({
      '@context': JLINC.contextUrl,
      audit: {
        eventType: 'permissionEvent',
        bisaId: bisas.a_b.bisaId,
        eventId: bisaEvents.a_b[0].audit.eventId,
        createdAt: bisaEvents.a_b[0].audit.createdAt,
        previousId: null,
        initiatorDid: dataCustodianA.did,
        initiatorPublicKey: dataCustodianA.signingPublicKey,
        initiatorSigType: JLINC.signatureType,
        initiatorSig: bisaEvents.a_b[0].audit.initiatorSig,
      },
      event: {
        canShowRelationshipPublicly: true,
      },
    });

    expect(() => {
      JLINC.validateBisaEvent({
        bisa: bisas.b_c,
        bisaEvent: bisaEvents.a_b[0],
      });
    }).to.throw(JLINC.InvalidBisaEventError, 'bisaEvent.audit.initiatorDid did not sign given bisa');

    JLINC.validateBisaEvent({
      bisa: bisas.a_b,
      bisaEvent: bisaEvents.a_b[0],
    });

    JLINC.verifyBisaEventSignature({
      bisaEvent: bisaEvents.a_b[0],
      dataCustodianPublicKey: dataCustodianA.signingPublicKey,
    });

    expect(() => {
      JLINC.acknowledgeBisaEvent({
        bisa: bisas.a_b,
        bisaEvent: bisaEvents.a_b[0],
        dataCustodian: dataCustodianC,
      });
    }).to.throw(JLINC.BisaVerificationError, 'bisa was not signed by the given dataCustodian');

    expect(() => {
      JLINC.acknowledgeBisaEvent({
        bisa: bisas.a_b,
        bisaEvent: bisaEvents.a_b[0],
        dataCustodian: dataCustodianA,
      });
    }).to.throw('bisaEvent cannot be acknowledged by the initiator');

    acknowledgedBisaEvents.a_b = [];
    acknowledgedBisaEvents.a_b[0] = JLINC.acknowledgeBisaEvent({
      bisa: bisas.a_b,
      bisaEvent: bisaEvents.a_b[0],
      dataCustodian: dataCustodianB,
    });

    expect(acknowledgedBisaEvents.a_b[0]).to.matchPattern({
      '@context': JLINC.contextUrl,
      audit: {
        eventType: 'permissionEvent',
        bisaId: bisas.a_b.bisaId,
        eventId: bisaEvents.a_b[0].audit.eventId,
        createdAt: bisaEvents.a_b[0].audit.createdAt,
        previousId: null,
        initiatorDid: dataCustodianA.did,
        initiatorPublicKey: dataCustodianA.signingPublicKey,
        initiatorSigType: JLINC.signatureType,
        initiatorSig: bisaEvents.a_b[0].audit.initiatorSig,
        acceptorSigType: JLINC.signatureType,
        acceptorDid: dataCustodianB.did,
        acceptorPublicKey: dataCustodianB.signingPublicKey,
        acceptorSig: _.isString,
      },
      eventJwt: _.isAJwtMatchingPattern({
        canShowRelationshipPublicly: true,
      }),
    });

    JLINC.validateAcknowledgedBisaEvent({
      bisa: bisas.a_b,
      bisaEvent: bisaEvents.a_b[0],
      acknowledgedBisaEvent: acknowledgedBisaEvents.a_b[0],
    });

  });
});
