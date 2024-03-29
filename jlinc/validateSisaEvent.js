'use strict';

const isISODateString = require('./isISODateString');
const isFutureDate = require('./isFutureDate');

module.exports = function validateSisaEvent({ sisaEvent }) {
  const { InvalidSisaEventError, SisaEventVerificationError } = this;

  // if (!sisa) throw new Error('sisa is required');
  if (!sisaEvent) throw new Error('sisaEvent is required');

  if (typeof sisaEvent !== 'object')
    throw new InvalidSisaEventError('sisaEvent must be of type object');

  // sisaEvent["@context"]
  if (!('@context' in sisaEvent))
    throw new InvalidSisaEventError('sisaEvent must have key "@context"');

  try{
    this.getContextVersion(sisaEvent['@context']);
  }catch(error){
    throw new InvalidSisaEventError('sisaEvent["@context"] is invalid');
  }

  // sisaEvent.eventJwt
  if (!('eventJwt' in sisaEvent))
    throw new InvalidSisaEventError('sisaEvent must have key "eventJwt"');

  if (!sisaEvent.eventJwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/))
    throw new InvalidSisaEventError('sisaEvent.eventJwt is invalid');


  // sisaEvent["@context"]
  if (!('audit' in sisaEvent))
    throw new InvalidSisaEventError('sisaEvent must have key "audit"');

  if (typeof sisaEvent.audit !== 'object')
    throw new InvalidSisaEventError('sisaEvent.audit must be of type object');


  // sisaEvent.audit.eventType
  if (!('eventType' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "eventType"');

  if (!this.sisaEventTypes.includes(sisaEvent.audit.eventType))
    throw new InvalidSisaEventError('sisaEvent.audit.eventType is invalid');

  // sisaEvent.audit.sisaId
  if (!('sisaId' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "sisaId"');

  // sisaEvent.audit.createdAt
  if (!('createdAt' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "createdAt"');

  if (typeof sisaEvent.audit.createdAt !== 'string')
    throw new InvalidSisaEventError('sisaEvent.audit.createdAt must be of type string');

  if (!isISODateString(sisaEvent.audit.createdAt))
    throw new InvalidSisaEventError('sisaEvent.audit.createdAt must be an ISO Date String');

  if (isFutureDate(sisaEvent.audit.createdAt))
    throw new InvalidSisaEventError('sisaEvent.audit.createdAt cannot be in the future');

  // sisaEvent.audit.previousId
  if (!('previousId' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "previousId"');

  // sisaEvent.audit.eventId
  if (!('eventId' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "eventId"');

  const expectedEventId = this.createHash({
    itemToHash: `${sisaEvent.audit.sisaId}.${sisaEvent.eventJwt}.${sisaEvent.audit.previousId}.${sisaEvent.audit.createdAt}`
  });
  if (sisaEvent.audit.eventId !== expectedEventId)
    throw new InvalidSisaEventError('sisaEvent.audit.eventId is invalid');

  // sisaEvent.audit.rightsHolderSigType
  if (!('rightsHolderSigType' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "rightsHolderSigType"');

  if (sisaEvent.audit.rightsHolderSigType !== this.signatureType)
    throw new InvalidSisaEventError('sisaEvent.audit.rightsHolderSigType is invalid');

  // sisaEvent.audit.rightsHolderDid
  if (!('rightsHolderDid' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "rightsHolderDid"');

  if (typeof sisaEvent.audit.rightsHolderDid !== 'string')
    throw new InvalidSisaEventError('sisaEvent.audit.rightsHolderDid must be of type string');

  // sisaEvent.audit.rightsHolderPublicKey
  if (!('rightsHolderPublicKey' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "rightsHolderPublicKey"');

  if (typeof sisaEvent.audit.rightsHolderPublicKey !== 'string')
    throw new InvalidSisaEventError('sisaEvent.audit.rightsHolderPublicKey must be of type string');

  if (sisaEvent.audit.rightsHolderPublicKey.length !== 43)
    throw new InvalidSisaEventError('sisaEvent.audit.rightsHolderPublicKey must be of length 43');

  // sisaEvent.audit.rightsHolderSig
  if (!('rightsHolderSig' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "rightsHolderSig"');

  try{
    this.verifySisaEventWasSignedByRightsHolder({
      sisaEvent,
      rightsHolderPublicKey: sisaEvent.audit.rightsHolderPublicKey,
    });
  }catch(error){
    if (error instanceof SisaEventVerificationError)
      throw new InvalidSisaEventError('sisaEvent.audit.rightsHolderSig is invalid');
    throw error;
  }

  const event = this.decodeJwt({ jwt: sisaEvent.eventJwt });
  if (event === null)
    throw new InvalidSisaEventError('sisaEvent.eventJwt is invalid');

  return true;
};
