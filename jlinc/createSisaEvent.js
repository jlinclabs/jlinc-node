'use strict';

const isPlainObject = require('is-plain-object');
const jsonwebtoken = require('jsonwebtoken');

module.exports = function createSisaEvent({ eventType, event, sisa, latestSisaEvent, rightsHolder }) {

  if (!eventType) throw new Error('eventType is required');
  if (!event) throw new Error('event is required');
  if (!sisa) throw new Error('sisa is required');
  if (!latestSisaEvent && latestSisaEvent !== null) throw new Error('latestSisaEvent is required');
  if (!rightsHolder) throw new Error('rightsHolder is required');

  this.validateSisa({ sisa });
  this.verifySisaWasSignedByRightsHolder({ sisa, rightsHolder });

  if (!this.sisaEventTypes.includes(eventType))
    throw new Error(`invalid sisa eventType "${eventType}"`);

  if (!isPlainObject(event))
    throw new Error('event must be a plain object');

  if (latestSisaEvent !== null)
    this.validateSisaEvent({ sisaEvent: latestSisaEvent });

  const eventJwt = jsonwebtoken.sign(event, rightsHolder.secret);
  const eventId = this.createHash({ itemToHash: eventJwt });
  const rightsHolderSig = this.signItem({
    itemToSign: eventJwt,
    privateKey: rightsHolder.privateKey,
  });

  return {
    "@context": this.contextUrl,
    audit: {
      eventType,
      sisaId: sisa.sisaId,
      eventId,
      timestamp: this.now(),
      previousId: latestSisaEvent ? latestSisaEvent.audit.eventId : null,
      rightsHolderSigType: this.signatureType,
      rightsHolderId: rightsHolder.publicKey,
      rightsHolderSig,
    },
    eventJwt,
  };
};
