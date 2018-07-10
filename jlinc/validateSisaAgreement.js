'use strict';

module.exports = function validateSisaAgreement({ sisaAgreement }) {
  if (typeof sisaAgreement !== 'object')
    throw new Error('sisaAgreement must be of type object');

  // sisaAgreement["@context"]
  if (!('@context' in sisaAgreement))
    throw new Error('sisaAgreement must have key "@context"');

  if (sisaAgreement['@context'] !== 'https://context.jlinc.org/v05/jlinc.jsonld')
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

  if (sisaAgreement.agreementURI !== 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4')
    throw new Error('sisaAgreement.agreementURI is invalid');

  // sisaAgreement.iat
  if (!('iat' in sisaAgreement))
    throw new Error('sisaAgreement must have key "iat"');

  if (typeof sisaAgreement.iat !== 'number')
    throw new Error('sisaAgreement.iat must be of type number');

  if (sisaAgreement.iat < 1530903259)
    throw new Error('sisaAgreement.iat is too old');

  if (sisaAgreement.iat > Date.now())
    throw new Error('sisaAgreement.iat cannot be in the future');

  return true;
};
