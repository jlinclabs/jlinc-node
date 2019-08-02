'use strict';

const isPlainObject = require('is-plain-object');

module.exports = function createBisaEvent({ eventType, event, bisa, latestBisaEvent, dataCustodian }) {

  if (!eventType) throw new Error('eventType is required');
  if (!event) throw new Error('event is required');
  if (!bisa) throw new Error('bisa is required');
  if (!latestBisaEvent && latestBisaEvent !== null) throw new Error('latestBisaEvent is required');
  if (!dataCustodian)                   throw new Error('dataCustodian is required');
  if (!dataCustodian.did)               throw new Error('dataCustodian.did is required');
  if (!dataCustodian.secret)            throw new Error('dataCustodian.secret is required');
  if (!dataCustodian.signingPrivateKey) throw new Error('dataCustodian.signingPrivateKey is required');
  if (!dataCustodian.signingPublicKey)  throw new Error('dataCustodian.signingPublicKey is required');

  this.validateBisa({ bisa });

  this.verifyBisaWasSignedBy({ bisa, dataCustodian });

  if (!this.bisaEventTypes.includes(eventType))
    throw new Error(`invalid bisa eventType "${eventType}"`);

  if (!isPlainObject(event))
    throw new Error('event must be a plain object');

  if (latestBisaEvent !== null)
    this.validateBisaEvent({ bisa, bisaEvent: latestBisaEvent });

  const { bisaId } = bisa;
  const createdAt = this.now();
  const previousId = latestBisaEvent ? latestBisaEvent.audit.eventId : null;

  const eventJwt = this.createSignedJwt({
    itemToSign: event,
    secret: dataCustodian.secret,
  });

  const eventId = this.createHash({
    itemToHash: `${bisaId}.${eventJwt}.${previousId}.${createdAt}`
  });

  const initiatorSig = this.signHash({
    hashToSign: eventId,
    privateKey: dataCustodian.signingPrivateKey,
  });

  return {
    '@context': this.contextUrl,
    audit: {
      eventType,
      bisaId: bisa.bisaId,
      eventId,
      createdAt,
      previousId,
      initiatorDid: dataCustodian.did,
      initiatorPublicKey: dataCustodian.signingPublicKey,
      initiatorSigType: this.signatureType,
      initiatorSig,
    },
    eventJwt,
  };
};
