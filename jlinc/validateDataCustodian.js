'use strict';

const b64 = require('urlsafe-base64');
const sodium = require('sodium').api;

module.exports = function validateDataCustodian({ dataCustodian }){
  const { InvalidDataCustodianError } = this;
  try{
    return this.validateEntity({ entity: dataCustodian });
  }catch(error){
    if (error.message.includes('entity')){
      throw new InvalidDataCustodianError(error.message.replace('entity', 'dataCustodian'));
    }
    throw error;
  }
};
