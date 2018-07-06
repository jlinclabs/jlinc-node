'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = function validateDataCustodian({ dataCustodian }){
  try{
    return this.validateEntity({ entity: dataCustodian });
  }catch(error){
    if (error.message.includes('entity')){
      error.message = error.message.replace('entity', 'dataCustodian');
    }
    throw error;
  }
};
