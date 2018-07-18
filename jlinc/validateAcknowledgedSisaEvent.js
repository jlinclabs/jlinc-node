'use strict';

module.exports = function validateAcknowledgedSisaEvent({ sisaEvent, acknowledgedSisaEvent }){
  const { InvalidSignatureError, InvalidAcknowledgedSisaEventError } = this;

  if (!sisaEvent) throw new Error('sisaEvent is required');
  if (!acknowledgedSisaEvent) throw new Error('acknowledgedSisaEvent is required');

  this.validateSisaEvent({ sisaEvent });

  if (acknowledgedSisaEvent.eventJwt !== sisaEvent.eventJwt)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.eventJwt does not match sisaEvent.eventJwt');

  if (acknowledgedSisaEvent.audit.eventType !== sisaEvent.audit.eventType)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.eventType does not match sisaEvent.audit.eventType');

  if (acknowledgedSisaEvent.audit.sisaId !== sisaEvent.audit.sisaId)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.sisaId does not match sisaEvent.audit.sisaId');

  if (acknowledgedSisaEvent.audit.eventId !== sisaEvent.audit.eventId)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.eventId does not match sisaEvent.audit.eventId');

  if (acknowledgedSisaEvent.audit.timestamp !== sisaEvent.audit.timestamp)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.timestamp does not match sisaEvent.audit.timestamp');

  if (acknowledgedSisaEvent.audit.previousId !== sisaEvent.audit.previousId)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.previousId does not match sisaEvent.audit.previousId');

  if (acknowledgedSisaEvent.audit.rightsHolderSigType !== sisaEvent.audit.rightsHolderSigType)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.rightsHolderSigType does not match sisaEvent.audit.rightsHolderSigType');

  if (acknowledgedSisaEvent.audit.rightsHolderId !== sisaEvent.audit.rightsHolderId)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.rightsHolderId does not match sisaEvent.audit.rightsHolderId');

  if (acknowledgedSisaEvent.audit.rightsHolderSig !== sisaEvent.audit.rightsHolderSig)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.rightsHolderSig does not match sisaEvent.audit.rightsHolderSig');

  if (!acknowledgedSisaEvent.audit.dataCustodianId)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.dataCustodianId is missing');

  if (!acknowledgedSisaEvent.audit.dataCustodianSigType)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.dataCustodianSigType is missing');

  if (!acknowledgedSisaEvent.audit.dataCustodianSig)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.dataCustodianSig is missing');

  try{
    this.verifySignature({
      itemSigned: acknowledgedSisaEvent.eventJwt,
      signature: acknowledgedSisaEvent.audit.dataCustodianSig,
      publicKey: acknowledgedSisaEvent.audit.dataCustodianId,
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new InvalidAcknowledgedSisaEventError('sisaEvent.audit.dataCustodianSig is invalid');
    throw error;
  }

  return true;
};
