'use strict';

const isDid = require('./isDid');

module.exports = function validateBisaAgreement({ bisaAgreement }) {
  const { InvalidBisaAgreementError } = this;

  if (typeof bisaAgreement !== 'object')
    throw new InvalidBisaAgreementError('bisaAgreement must be of type object');

  // bisaAgreement["@context"]
  if (!('@context' in bisaAgreement))
    throw new InvalidBisaAgreementError('bisaAgreement must have key "@context"');

  try{
    this.getContextVersion(bisaAgreement['@context']);
  }catch(error){
    throw new InvalidBisaAgreementError('bisaAgreement["@context"] is invalid');
  }

  // bisaAgreement.jlincId
  if (!('jlincId' in bisaAgreement))
    throw new InvalidBisaAgreementError('bisaAgreement must have key "jlincId"');

  if (typeof bisaAgreement.jlincId !== 'string')
    throw new InvalidBisaAgreementError('bisaAgreement.jlincId must be of type string');

  if (!bisaAgreement.jlincId.match(/^[0-9a-f]{64}$/))
    throw new InvalidBisaAgreementError('bisaAgreement.jlincId is invalid');

  // bisaAgreement.agreementURI
  if (!('agreementURI' in bisaAgreement))
    throw new InvalidBisaAgreementError('bisaAgreement must have key "agreementURI"');

  if (typeof bisaAgreement.agreementURI !== 'string')
    throw new InvalidBisaAgreementError('bisaAgreement.agreementURI must be of type string');

  if (!bisaAgreement.agreementURI.match(/^https?:\/\//))
    throw new InvalidBisaAgreementError('bisaAgreement.agreementURI must be a url');

  // bisaAgreement.targetAcceptorDid
  if (!('targetAcceptorDid' in bisaAgreement))
    throw new InvalidBisaAgreementError('bisaAgreement must have key "targetAcceptorDid"');

  if (!isDid(bisaAgreement.targetAcceptorDid))
    throw new InvalidBisaAgreementError('bisaAgreement.targetAcceptorDid must be a did');

  return true;
};
