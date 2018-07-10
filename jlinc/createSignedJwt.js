'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function createSignedJwt({ itemToSign, secret }) {
  return jsonwebtoken.sign(itemToSign, secret);
};
