'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = function validateRightsHolder({ rightsHolder }){
  try{
    return this.validateEntity({ entity: rightsHolder });
  }catch(error){
    if (error.message.includes('entity')){
      error.message = error.message.replace('entity', 'rightsHolder');
    }
    throw error;
  }
};
