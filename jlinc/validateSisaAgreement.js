'use strict';

module.exports = function validateSisaAgreement({ sisaAgreement }) {
  const { InvalidSisaAgreementError } = this;

  if (typeof sisaAgreement !== 'object')
    throw new InvalidSisaAgreementError('sisaAgreement must be of type object');

  // sisaAgreement["@context"]
  if (!('@context' in sisaAgreement))
    throw new InvalidSisaAgreementError('sisaAgreement must have key "@context"');

  if (sisaAgreement['@context'] !== this.contextUrl)
    throw new InvalidSisaAgreementError('sisaAgreement["@context"] is invalid');

  // sisaAgreement.jlincId
  if (!('jlincId' in sisaAgreement))
    throw new InvalidSisaAgreementError('sisaAgreement must have key "jlincId"');

  if (typeof sisaAgreement.jlincId !== 'string')
    throw new InvalidSisaAgreementError('sisaAgreement.jlincId must be of type string');

  if (!sisaAgreement.jlincId.match(/^[0-9a-f]{64}$/))
    throw new InvalidSisaAgreementError('sisaAgreement.jlincId is invalid');

  // sisaAgreement.agreementURI
  if (!('agreementURI' in sisaAgreement))
    throw new InvalidSisaAgreementError('sisaAgreement must have key "agreementURI"');

  if (typeof sisaAgreement.agreementURI !== 'string')
    throw new InvalidSisaAgreementError('sisaAgreement.agreementURI must be of type string');

  if (!sisaAgreement.agreementURI.match(/^https?:\/\//))
    throw new InvalidSisaAgreementError('sisaAgreement.agreementURI must be a url');

  return true;
};
