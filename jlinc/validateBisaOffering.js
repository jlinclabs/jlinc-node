'use strict';

module.exports = function validateBisaOffering({ bisaOffering }) {
  const { InvalidBisaOfferingError, InvalidOfferedBisaError } = this;

  if (!bisaOffering) throw new Error('bisaOffering is required');

  if (typeof bisaOffering !== 'object')
    throw new InvalidBisaOfferingError('bisaOffering must be of type object');

  // validating bisaOffering["@context"]
  if (!('@context' in bisaOffering))
    throw new InvalidBisaOfferingError('bisaOffering must have key "@context"');

  try{
    this.getContextVersion(bisaOffering['@context']);
  }catch(error){
    throw new InvalidBisaOfferingError('bisaOffering["@context"] is invalid');
  }

  // validating bisaOffering.id
  if (!('id' in bisaOffering))
    throw new InvalidBisaOfferingError('bisaOffering must have key "id"');

  if (typeof bisaOffering.id !== 'string')
    throw new InvalidBisaOfferingError('bisaOffering.id must of type string');

  if (!('offeredBisa' in bisaOffering))
    throw new InvalidBisaOfferingError('bisaOffering must have key "offeredBisa"');

  try{
    this.validateOfferedBisa({
      offeredBisa: bisaOffering.offeredBisa,
    });
  }catch(error){
    if (error instanceof InvalidOfferedBisaError){
      throw new InvalidBisaOfferingError(
        error.message.replace('offeredBisa', 'bisaOffering.offeredBisa')
      );
    }
    throw error;
  }

  return true;
};
