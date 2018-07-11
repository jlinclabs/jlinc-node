'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function decodeAndVerifyJwt({ jwt, secret }) {
  const { JWTVerificationError } = this;
  try{
    return jsonwebtoken.verify(jwt, secret);
  }catch(error){
    if (error.message === 'invalid signature'){
      throw new JWTVerificationError('unable to verify jsonwebtoken');
    }
    throw error;
  }
};
