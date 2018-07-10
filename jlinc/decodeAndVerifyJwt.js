'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function decodeAndVerifyJwt({ jwt, secret }) {
  try{
    return jsonwebtoken.verify(jwt, secret);
  }catch(error){
    if (error.message === 'invalid signature'){
      throw new Error('unable to verify jsonwebtoken');
    }
    throw error;
  }
};
