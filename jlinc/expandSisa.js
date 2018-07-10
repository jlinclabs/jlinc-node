'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function expandSisa({ sisa }){
  const expandedSisa = { ...sisa };

  expandedSisa.acceptedSisa = jsonwebtoken.decode(expandedSisa.acceptedSisaJwt);
  delete expandedSisa.acceptedSisaJwt;

  expandedSisa.acceptedSisa.offeredSisa = jsonwebtoken.decode(expandedSisa.acceptedSisa.offeredSisaJwt);
  delete expandedSisa.acceptedSisa.offeredSisaJwt;

  expandedSisa.acceptedSisa.offeredSisa.agreement = jsonwebtoken.decode(expandedSisa.acceptedSisa.offeredSisa.agreementJwt);
  delete expandedSisa.acceptedSisa.offeredSisa.agreementJwt;

  return expandedSisa;
};
