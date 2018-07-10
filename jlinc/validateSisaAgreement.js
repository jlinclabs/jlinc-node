'use strict';

module.exports = function validateSisaAgreement({ sisaAgreement }) {
  if (typeof sisaAgreement !== 'object')
    throw new Error('sisaAgreement must be of type object');

  // sisaAgreement["@context"]
  if (!('@context' in sisaAgreement))
    throw new Error('sisaAgreement must have key "@context"');

  if (sisaAgreement['@context'] !== this.contextUrl)
    throw new Error('sisaAgreement["@context"] is invalid');

  // sisaAgreement.jlincId
  if (!('jlincId' in sisaAgreement))
    throw new Error('sisaAgreement must have key "jlincId"');

  if (typeof sisaAgreement.jlincId !== 'string')
    throw new Error('sisaAgreement.jlincId must be of type string');

  if (!sisaAgreement.jlincId.match(/^[0-9a-f]{64}$/))
    throw new Error('sisaAgreement.jlincId is invalid');

  // sisaAgreement.agreementURI
  if (!('agreementURI' in sisaAgreement))
    throw new Error('sisaAgreement must have key "agreementURI"');

  if (typeof sisaAgreement.agreementURI !== 'string')
    throw new Error('sisaAgreement.agreementURI must be of type string');

  if (!sisaAgreement.agreementURI.match(/^https?:\/\//))
    throw new Error('sisaAgreement.agreementURI must be a url');

  // sisaAgreement.iat
  if (!('iat' in sisaAgreement))
    throw new Error('sisaAgreement must have key "iat"');

  if (typeof sisaAgreement.iat !== 'number')
    throw new Error('sisaAgreement.iat must be of type number');

  if (sisaAgreement.iat < 1530903259)
    throw new Error('sisaAgreement.iat is too old');

  if (sisaAgreement.iat > this.now())
    throw new Error('sisaAgreement.iat cannot be in the future');

  return true;
};
