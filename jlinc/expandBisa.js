'use strict';

module.exports = function expandBisa({ bisa }){
  const { InvalidBisaError } = this;
  if (!bisa) throw new Error('bisa is required');

  const expandedBisa = Object.assign({}, bisa);

  expandedBisa.acceptedBisa = this.decodeJwt({
    jwt: expandedBisa.acceptedBisaJwt,
  });
  if (!expandedBisa.acceptedBisa)
    throw new InvalidBisaError(`failed to expand bisa: could not decode bisa.acceptedBisaJwt`);
  delete expandedBisa.acceptedBisaJwt;

  expandedBisa.acceptedBisa.offeredBisa = this.decodeJwt({
    jwt: expandedBisa.acceptedBisa.offeredBisaJwt,
  });
  if (!expandedBisa.acceptedBisa.offeredBisa)
    throw new InvalidBisaError(`failed to expand bisa: could not decode bisa.acceptedBisa.offeredBisaJwt`);
  delete expandedBisa.acceptedBisa.offeredBisaJwt;

  expandedBisa.acceptedBisa.offeredBisa.agreement = this.decodeJwt({
    jwt: expandedBisa.acceptedBisa.offeredBisa.agreementJwt
  });
  if (!expandedBisa.acceptedBisa.offeredBisa.agreement)
    throw new InvalidBisaError(`failed to expand bisa: could not decode bisa.acceptedBisa.offeredBisa.agreementJwt`);
  delete expandedBisa.acceptedBisa.offeredBisa.agreementJwt;

  return expandedBisa;
};
