'use strict';

module.exports = function validateAcknowledgedSisaEvent({ sisaEvent, acknowledgedSisaEvent }){
  const { AcknowledgedSisaEventVerificationError, InvalidAcknowledgedSisaEventError } = this;

  if (!sisaEvent) throw new Error('sisaEvent is required');
  if (!acknowledgedSisaEvent) throw new Error('acknowledgedSisaEvent is required');

  this.validateSisaEvent({ sisaEvent });
  try{
    this.validateSisaEvent({ sisaEvent: acknowledgedSisaEvent });
  }catch(error){
    if (error.message.includes('sisaEvent')){
      error.message = error.message.replace('sisaEvent', 'acknowledgedSisaEvent');
    }
    throw error;
  }

  if (acknowledgedSisaEvent['@context'] !== sisaEvent['@context'])
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent["@context"] does not match sisaEvent["@context"]');

  if (acknowledgedSisaEvent.audit.eventId !== sisaEvent.audit.eventId)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.eventId does not match sisaEvent.audit.eventId');

  if (acknowledgedSisaEvent.audit.eventType !== sisaEvent.audit.eventType)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.eventType does not match sisaEvent.audit.eventType');

  if (acknowledgedSisaEvent.audit.timestamp !== sisaEvent.audit.timestamp)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.timestamp does not match sisaEvent.audit.timestamp');

  if (!acknowledgedSisaEvent.audit.dataCustodianId)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.dataCustodianId is missing');

  if (!acknowledgedSisaEvent.audit.dataCustodianSigType)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.dataCustodianSigType is missing');

  if (!acknowledgedSisaEvent.audit.dataCustodianSig)
    throw new InvalidAcknowledgedSisaEventError('acknowledgedSisaEvent.audit.dataCustodianSig is missing');

  try{
    this.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
      acknowledgedSisaEvent,
      dataCustodianId: acknowledgedSisaEvent.audit.dataCustodianId,
    });
  }catch(error){
    if (error instanceof AcknowledgedSisaEventVerificationError)
      throw new InvalidAcknowledgedSisaEventError('sisaEvent.audit.dataCustodianSig is invalid');
    throw error;
  }

  return true;
};
