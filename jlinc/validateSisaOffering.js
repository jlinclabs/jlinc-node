'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function validateSisaOffering({ sisaOffering }) {
  if (typeof sisaOffering !== 'object')
    throw new Error('sisaOffering must be of type object');

  // validating sisaOffering["@context"]
  if (!('@context' in sisaOffering))
    throw new Error('sisaOffering must have key "@context"');

  if (sisaOffering['@context'] !== 'https://context.jlinc.org/v05/jlinc.jsonld')
    throw new Error('sisaOffering["@context"] is invalid');

  // validating sisaOffering.offeredSisa
  if (!('offeredSisa' in sisaOffering))
    throw new Error('sisaOffering must have key "offeredSisa"');

  try{
    this.validateOfferedSisa({ offeredSisa: sisaOffering.offeredSisa });
  }catch(error){
    if (error.message.includes('offeredSisa')){
      error.message = error.message.replace('offeredSisa', 'sisaOffering.offeredSisa');
    }
    throw error;
  }

  return true;
};
