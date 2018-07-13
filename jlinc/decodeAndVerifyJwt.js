'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function decodeAndVerifyJwt({ jwt, secret }) {
  const { JWTVerificationError } = this;
  try{
    return jsonwebtoken.verify(jwt, secret, { algorithms: ['HS256'] });
  }catch(error){
    if (error.message === 'invalid signature'){
      throw new JWTVerificationError('unable to verify jsonwebtoken');
    }
    throw error;
  }
};
