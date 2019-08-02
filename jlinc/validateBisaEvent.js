'use strict';

const isISODateString = require('./isISODateString');

module.exports = function validateBisaEvent({ bisa, bisaEvent }) {
  const {
    InvalidBisaEventError,
    BisaEventVerificationError,
    BisaVerificationError,
  } = this;

  if (!bisa) throw new Error('bisa is required');
  if (!bisaEvent) throw new Error('bisaEvent is required');

  this.validateBisa({ bisa });

  if (typeof bisaEvent !== 'object')
    throw new InvalidBisaEventError('bisaEvent must be of type object');

  // bisaEvent["@context"]
  if (!('@context' in bisaEvent))
    throw new InvalidBisaEventError('bisaEvent must have key "@context"');

  try{
    this.getContextVersion(bisaEvent['@context']);
  }catch(error){
    throw new InvalidBisaEventError('bisaEvent["@context"] is invalid');
  }

  // bisaEvent.eventJwt
  if (!('eventJwt' in bisaEvent))
    throw new InvalidBisaEventError('bisaEvent must have key "eventJwt"');

  if (!bisaEvent.eventJwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/))
    throw new InvalidBisaEventError('bisaEvent.eventJwt is invalid');


  // bisaEvent["@context"]
  if (!('audit' in bisaEvent))
    throw new InvalidBisaEventError('bisaEvent must have key "audit"');

  if (typeof bisaEvent.audit !== 'object')
    throw new InvalidBisaEventError('bisaEvent.audit must be of type object');


  // bisaEvent.audit.eventType
  if (!('eventType' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "eventType"');

  if (!this.bisaEventTypes.includes(bisaEvent.audit.eventType))
    throw new InvalidBisaEventError('bisaEvent.audit.eventType is invalid');

  // bisaEvent.audit.bisaId
  if (!('bisaId' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "bisaId"');

  // bisaEvent.audit.createdAt
  if (!('createdAt' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "createdAt"');

  if (typeof bisaEvent.audit.createdAt !== 'string')
    throw new InvalidBisaEventError('bisaEvent.audit.createdAt must be of type string');

  if (!isISODateString(bisaEvent.audit.createdAt))
    throw new InvalidBisaEventError('bisaEvent.audit.createdAt must be an ISO Date String');

  if (new Date(bisaEvent.audit.createdAt).getTime() > Date.now())
    throw new InvalidBisaEventError('bisaEvent.audit.createdAt cannot be in the future');

  // bisaEvent.audit.previousId
  if (!('previousId' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "previousId"');

  // bisaEvent.audit.eventId
  if (!('eventId' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "eventId"');

  const expectedEventId = this.createHash({
    itemToHash: `${bisaEvent.audit.bisaId}.${bisaEvent.eventJwt}.${bisaEvent.audit.previousId}.${bisaEvent.audit.createdAt}`
  });
  if (bisaEvent.audit.eventId !== expectedEventId)
    throw new InvalidBisaEventError('bisaEvent.audit.eventId is invalid');

  // bisaEvent.audit.initiatorSigType
  if (!('initiatorSigType' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "initiatorSigType"');

  if (bisaEvent.audit.initiatorSigType !== this.signatureType)
    throw new InvalidBisaEventError('bisaEvent.audit.initiatorSigType is invalid');

  // bisaEvent.audit.initiatorDid
  if (!('initiatorDid' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "initiatorDid"');

  if (typeof bisaEvent.audit.initiatorDid !== 'string')
    throw new InvalidBisaEventError('bisaEvent.audit.initiatorDid must be of type string');

  // bisaEvent.audit.initiatorPublicKey
  if (!('initiatorPublicKey' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "initiatorPublicKey"');

  if (typeof bisaEvent.audit.initiatorPublicKey !== 'string')
    throw new InvalidBisaEventError('bisaEvent.audit.initiatorPublicKey must be of type string');

  if (bisaEvent.audit.initiatorPublicKey.length !== 43)
    throw new InvalidBisaEventError('bisaEvent.audit.initiatorPublicKey must be of length 43');

  try{
    this.verifyBisaWasSignedBy({
      bisa,
      dataCustodian: {
        did: bisaEvent.audit.initiatorDid,
        signingPublicKey: bisaEvent.audit.initiatorPublicKey,
      },
    });
  }catch(error){
    if (error instanceof BisaVerificationError)
      throw new InvalidBisaEventError('bisaEvent.audit.initiatorDid did not sign given bisa');
    throw error;
  }

  // bisaEvent.audit.initiatorSig
  if (!('initiatorSig' in bisaEvent.audit))
    throw new InvalidBisaEventError('bisaEvent.audit must have key "initiatorSig"');

  try{
    this.verifyBisaEventSignature({
      bisaEvent,
      dataCustodianPublicKey: bisaEvent.audit.initiatorPublicKey,
    });
  }catch(error){
    if (error instanceof BisaEventVerificationError)
      throw new InvalidBisaEventError('bisaEvent.audit.initiatorSig is invalid');
    throw error;
  }

  const event = this.decodeJwt({ jwt: bisaEvent.eventJwt });
  if (event === null)
    throw new InvalidBisaEventError('bisaEvent.eventJwt is invalid');

  return true;
};
