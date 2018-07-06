'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function validateSisaOffering(sisaOffering) {
  if (typeof sisaOffering !== 'object')
    throw new Error('sisaOffering must be of type object');

  // validating sisaOffering["@context"]
  if (!('@context' in sisaOffering))
    throw new Error('sisaOffering must have key "@context"');

  if (sisaOffering['@context'] !== 'https://context.jlinc.org/v05/jlinc.jsonld')
    throw new Error('sisaOffering["@context"] is invalid');

  // validating sisaOffering.offeredSisa
  if (!('offeredSisa' in sisaOffering))
    throw new Error('sisaOffering must have key "offeredSisa"');

  if (typeof sisaOffering.offeredSisa !== 'object')
    throw new Error('sisaOffering.offeredSisa must be of type object');

  // validating sisaOffering.offeredSisa["@context"]
  if (!('@context' in sisaOffering.offeredSisa))
    throw new Error('sisaOffering.offeredSisa must have key "@context"');

  if (sisaOffering.offeredSisa['@context'] !== 'https://context.jlinc.org/v05/jlinc.jsonld')
    throw new Error('sisaOffering.offeredSisa["@context"] is invalid');

  // validating sisaOffering.offeredSisa.agreementJwt
  if (!('agreementJwt' in sisaOffering.offeredSisa))
    throw new Error('sisaOffering.offeredSisa must have key "agreementJwt"');

  if (typeof sisaOffering.offeredSisa.agreementJwt !== 'string')
    throw new Error('sisaOffering.offeredSisa.agreementJwt must be of type string');

  if (!sisaOffering.offeredSisa.agreementJwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/))
    throw new Error('sisaOffering.offeredSisa.agreementJwt is invalid');

  if (jsonwebtoken.decode(sisaOffering.offeredSisa.agreementJwt) === null)
    throw new Error('sisaOffering.offeredSisa.agreementJwt is invalid');

  // validating sisaOffering.offeredSisa.dataCustodianSigType
  if (!('dataCustodianSigType' in sisaOffering.offeredSisa))
    throw new Error('sisaOffering.offeredSisa must have key "dataCustodianSigType"');

  if (typeof sisaOffering.offeredSisa.dataCustodianSigType !== 'string')
    throw new Error('sisaOffering.offeredSisa.dataCustodianSigType must be of type string');

  if (sisaOffering.offeredSisa.dataCustodianSigType !== 'sha256:ed25519')
    throw new Error('sisaOffering.offeredSisa.dataCustodianSigType is invalid');

  // validating sisaOffering.offeredSisa.dataCustodianID
  if (!('dataCustodianID' in sisaOffering.offeredSisa))
    throw new Error('sisaOffering.offeredSisa must have key "dataCustodianID"');

  if (typeof sisaOffering.offeredSisa.dataCustodianID !== 'string')
    throw new Error('sisaOffering.offeredSisa.dataCustodianID must be of type string');

  // validating sisaOffering.offeredSisa.dataCustodianSig
  if (!('dataCustodianSig' in sisaOffering.offeredSisa))
    throw new Error('sisaOffering.offeredSisa must have key "dataCustodianSig"');

  if (typeof sisaOffering.offeredSisa.dataCustodianSig !== 'string')
    throw new Error('sisaOffering.offeredSisa.dataCustodianSig must be of type string');

  // validating sisaOffering.offeredSisa.iat
  if (!('iat' in sisaOffering.offeredSisa))
    throw new Error('sisaOffering.offeredSisa must have key "iat"');

  if (typeof sisaOffering.offeredSisa.iat !== 'number')
    throw new Error('sisaOffering.offeredSisa.iat must be of type number');

  if (sisaOffering.offeredSisa.iat < 1530903259573)
    throw new Error('sisaOffering.offeredSisa.iat is too old');

  if (sisaOffering.offeredSisa.iat > Date.now())
    throw new Error('sisaOffering.offeredSisa.iat cannot be in the future');

  return true;
};
