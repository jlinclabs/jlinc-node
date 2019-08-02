'use strict';

const isDid = require('./isDid');

module.exports = function validateAcknowledgedBisaEvent({ bisa, bisaEvent, acknowledgedBisaEvent }){
  const { AcknowledgedBisaEventVerificationError, InvalidAcknowledgedBisaEventError } = this;

  this.validateBisaEvent({ bisa, bisaEvent });

  if (!acknowledgedBisaEvent) throw new Error('acknowledgedBisaEvent is required');

  if (acknowledgedBisaEvent['@context'] !== bisaEvent['@context'])
    throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent["@context"] does not match bisaEvent["@context"]');

  if (acknowledgedBisaEvent.eventJwt !== bisaEvent.eventJwt)
    throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent.eventJwt does not match bisaEvent.eventJwt');

  for (const key of ([
    'eventType','bisaId','eventId','createdAt','previousId','initiatorDid',
    'initiatorPublicKey','initiatorSigType','initiatorSig'
  ])){
    if (acknowledgedBisaEvent.audit[key] !== bisaEvent.audit[key])
      throw new InvalidAcknowledgedBisaEventError(`acknowledgedBisaEvent.audit.${key} does not match bisaEvent.audit.${key}`);
  }

  // bisaEvent.audit.acceptorSigType
  if (!('acceptorSigType' in acknowledgedBisaEvent.audit))
    throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent.audit must have key "acceptorSigType"');

  if (acknowledgedBisaEvent.audit.acceptorSigType !== this.signatureType)
    throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent.audit.acceptorSigType is invalid');

  // acknowledgedBisaEvent.audit.acceptorDid
  if (!isDid(acknowledgedBisaEvent.audit.acceptorDid))
    throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent.audit.acceptorDid must be a did');

  // acknowledgedBisaEvent.audit.acceptorPublicKey
  if (typeof acknowledgedBisaEvent.audit.acceptorPublicKey !== 'string')
    throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent.audit.acceptorPublicKey must be of type string');

  if (acknowledgedBisaEvent.audit.acceptorPublicKey.length !== 43)
    throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent.audit.acceptorPublicKey must be of length 43');

  try{
    this.verifyBisaWasSignedBy({
      bisa,
      dataCustodian: {
        did: acknowledgedBisaEvent.audit.acceptorDid,
        signingPublicKey: acknowledgedBisaEvent.audit.acceptorPublicKey,
      }
    });
  }catch(error){
    if (error instanceof this.BisaVerificationError){
      throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent.audit.acceptor did not sign the given bisa');
    }
    throw error;
  }

  try{
    this.verifyAcknowledgedBisaEventWasSignedBy({
      bisa,
      bisaEvent,
      acknowledgedBisaEvent,
      dataCustodianPublicKey: acknowledgedBisaEvent.audit.acceptorPublicKey,
    });
  }catch(error){
    if (error instanceof AcknowledgedBisaEventVerificationError)
      throw new InvalidAcknowledgedBisaEventError('acknowledgedBisaEvent.audit.acceptorSig is invalid');
    throw error;
  }

  return true;
};
