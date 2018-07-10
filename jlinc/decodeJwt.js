'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function decodeJwt({ jwt }) {
  return jsonwebtoken.decode(jwt);
};
