'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function expandAcceptedSisa({ acceptedSisa }){
  const expandedAcceptedSisa = { ...acceptedSisa };

  expandedAcceptedSisa.offeredSisa = jsonwebtoken.decode(expandedAcceptedSisa.offeredSisaJwt);
  delete expandedAcceptedSisa.offeredSisaJwt;

  expandedAcceptedSisa.offeredSisa.agreement = jsonwebtoken.decode(expandedAcceptedSisa.offeredSisa.agreementJwt);
  delete expandedAcceptedSisa.offeredSisa.agreementJwt;

  return expandedAcceptedSisa;
};
