'use strict';

module.exports = function validateSisaEvent({ sisaEvent }) {
  const { InvalidSisaEventError, JWTVerificationError, InvalidSignatureError } = this;

  // if (!sisa) throw new Error('sisa is required');
  if (!sisaEvent) throw new Error('sisaEvent is required');

  if (typeof sisaEvent !== 'object')
    throw new InvalidSisaEventError('sisaEvent must be of type object');

  // sisaEvent["@context"]
  if (!('@context' in sisaEvent))
    throw new InvalidSisaEventError('sisaEvent must have key "@context"');

  if (sisaEvent['@context'] !== this.contextUrl)
    throw new InvalidSisaEventError('sisaEvent["@context"] is invalid');

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

  if (typeof sisaEvent.audit.createdAt !== 'number')
    throw new InvalidSisaEventError('sisaEvent.audit.createdAt must be of type number');

  if (sisaEvent.audit.createdAt > Date.now())
    throw new InvalidSisaEventError('sisaEvent.audit.createdAt cannot be in the future');

  // sisaEvent.audit.previousId
  if (!('previousId' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "previousId"');

  // sisaEvent.audit.eventId
  if (!('eventId' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "eventId"');

  if (sisaEvent.audit.eventId !== this.createHash({ itemToHash: `${sisaEvent.eventJwt}.${sisaEvent.audit.previousId}.${sisaEvent.audit.createdAt}` }))
    throw new InvalidSisaEventError('sisaEvent.audit.eventId is invalid');

  // sisaEvent.audit.rightsHolderSigType
  if (!('rightsHolderSigType' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "rightsHolderSigType"');

  if (sisaEvent.audit.rightsHolderSigType !== this.signatureType)
    throw new InvalidSisaEventError('sisaEvent.audit.rightsHolderSigType is invalid');

  // sisaEvent.audit.rightsHolderId
  if (!('rightsHolderId' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "rightsHolderId"');

  if (sisaEvent.audit.rightsHolderId.length !== 43)
    throw new InvalidSisaEventError('sisaEvent.audit.rightsHolderId must be of length 43');

  // sisaEvent.audit.rightsHolderSig
  if (!('rightsHolderSig' in sisaEvent.audit))
    throw new InvalidSisaEventError('sisaEvent.audit must have key "rightsHolderSig"');

  try{
    this.verifySignature({
      itemSigned: sisaEvent.eventJwt,
      signature: sisaEvent.audit.rightsHolderSig,
      publicKey: sisaEvent.audit.rightsHolderId,
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new InvalidSisaEventError('sisaEvent.audit.rightsHolderSig is invalid');
    throw error;
  }

  const event = this.decodeJwt({ jwt: sisaEvent.eventJwt });
  if (event === null)
    throw new InvalidSisaEventError('sisaEvent.eventJwt is invalid');

  return true;
};
