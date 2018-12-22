'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('changing personal data', function() {
  withDidServer();
  it('should work', async function(){
    const { dataCustodian, rightsHolder, sisa } = await this.generateSisa();

    /******************
     * On the A Server
     ******************/

    // Alice wantes to update the personal data she shares with bob
    const sisaEvent = JLINC.createSisaEvent({
      eventType: 'dataEvent',
      event: {
        personal_data: {
          firstname: 'Alice',
          lastname: 'McEnduser',
        },
      },
      sisa,
      latestSisaEvent: null,
      rightsHolder,
    });

    expect(sisaEvent).to.matchPattern({
      '@context': JLINC.contextUrl,
      audit: {
        eventType: 'dataEvent',
        sisaId: sisa.sisaId,
        eventId: _.isString,
        createdAt:  _.isRecentDatetimeInISOFormat,
        previousId: null,
        rightsHolderDid: rightsHolder.did,
        rightsHolderPublicKey: rightsHolder.signingPublicKey,
        rightsHolderSigType: JLINC.signatureType,
        rightsHolderSig: _.isString,
      },
      eventJwt: _.isString,
    });

    // alice sends the sisaEvent to bob
    const copyOfSisaEvent = JSON.parse(JSON.stringify(sisaEvent));


    /******************
     * On the B Server
     ******************/
    JLINC.validateSisaEvent({
      sisaEvent: copyOfSisaEvent,
      sisaId: sisa.sisaId,
      rightsHolderDid: rightsHolder.did,
    });

    await JLINC.verifySisaEventRightsHolderDid({
      sisaEvent: copyOfSisaEvent,
      rightsHolderDid: rightsHolder.did,
    });

    // JLINC.verifySisaEventWasSignedByRightsHolder({
    //   sisaEvent: copyOfSisaEvent,
    //   rightsHolderPublicKey: rightsHolder.signingPublicKey,
    // });

    const acknowledgedSisaEvent = JLINC.acknowledgeSisaEvent({
      sisa,
      sisaEvent: copyOfSisaEvent,
      dataCustodian,
    });
    expect(acknowledgedSisaEvent).to.matchPattern({
      '@context': JLINC.contextUrl,
      audit: {
        eventType: 'dataEvent',
        sisaId: sisa.sisaId,
        eventId: _.isString,
        createdAt: _.isRecentDatetimeInISOFormat,
        previousId: null,
        rightsHolderDid: rightsHolder.did,
        rightsHolderPublicKey: rightsHolder.signingPublicKey,
        rightsHolderSigType: JLINC.signatureType,
        rightsHolderSig: _.isString,
        dataCustodianDid: dataCustodian.did,
        dataCustodianPublicKey: dataCustodian.signingPublicKey,
        dataCustodianSigType: JLINC.signatureType,
        dataCustodianSig: _.isString,
      },
      eventJwt: _.isString,
    });

    // bob should save this acknowledged sisa event in the database

    // bob sends the acknowledge Sisa Event back to alice
    const copyOfAcknowledgedSisaEvent = JSON.parse(JSON.stringify(acknowledgedSisaEvent));

    /******************
     * On the A Server
     ******************/
    // alice validates the acknowledged sisa event
    JLINC.validateAcknowledgedSisaEvent({
      sisaEvent: sisaEvent,
      acknowledgedSisaEvent: copyOfAcknowledgedSisaEvent,
    });

    JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
      acknowledgedSisaEvent: copyOfAcknowledgedSisaEvent,
      dataCustodianPublicKey: dataCustodian.signingPublicKey,
    });

    await JLINC.verifyAcknowledgedSisaEventDataCustodianDid({
      acknowledgedSisaEvent: copyOfAcknowledgedSisaEvent,
      dataCustodianDid: dataCustodian.did,
    });

    // alice should save this acknowledged sisa event in the database
  });
});
