'use strict';

module.exports = function expandSisa({ sisa }){
  if (!sisa) throw new Error('sisa is required');

  const expandedSisa = Object.assign({}, sisa);

  expandedSisa.acceptedSisa = this.decodeJwt({ jwt: expandedSisa.acceptedSisaJwt });
  delete expandedSisa.acceptedSisaJwt;

  expandedSisa.acceptedSisa.offeredSisa = this.decodeJwt({ jwt: expandedSisa.acceptedSisa.offeredSisaJwt });
  delete expandedSisa.acceptedSisa.offeredSisaJwt;

  expandedSisa.acceptedSisa.offeredSisa.agreement = this.decodeJwt({ jwt: expandedSisa.acceptedSisa.offeredSisa.agreementJwt });
  delete expandedSisa.acceptedSisa.offeredSisa.agreementJwt;

  return expandedSisa;
};
