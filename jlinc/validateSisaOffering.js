'use strict';

module.exports = function validateSisaOffering({ sisaOffering }) {
  const { InvalidSisaOfferingError, InvalidOfferedSisaError } = this;

  if (!sisaOffering) throw new Error('sisaOffering is required');

  if (typeof sisaOffering !== 'object')
    throw new InvalidSisaOfferingError('sisaOffering must be of type object');

  // validating sisaOffering["@context"]
  if (!('@context' in sisaOffering))
    throw new InvalidSisaOfferingError('sisaOffering must have key "@context"');

  if (sisaOffering['@context'] !== this.contextUrl)
    throw new InvalidSisaOfferingError('sisaOffering["@context"] is invalid');

  // validating sisaOffering.agreementJwt
  if (!('offeredSisa' in sisaOffering))
    throw new InvalidSisaOfferingError('sisaOffering must have key "offeredSisa"');

  try{
    this.validateOfferedSisa({
      offeredSisa: sisaOffering.offeredSisa
    });
  }catch(error){
    if (error instanceof InvalidOfferedSisaError){
      error.message = error.message.replace('offeredSisa', 'sisaOffering.offeredSisa');
    }
    throw error;
  }

  return true;
};
