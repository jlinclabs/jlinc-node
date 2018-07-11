'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = function validateRightsHolder({ rightsHolder }){
  const { InvalidRightsHolderError } = this;
  try{
    return this.validateEntity({ entity: rightsHolder });
  }catch(error){
    if (error.message.includes('entity')){
      throw new InvalidRightsHolderError(error.message.replace('entity', 'rightsHolder'));
    }
    throw error;
  }
};
