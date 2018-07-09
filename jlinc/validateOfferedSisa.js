'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function validateOfferedSisa({ offeredSisa }) {
  if (typeof offeredSisa !== 'object')
    throw new Error('offeredSisa must be of type object');

  // validating offeredSisa["@context"]
  if (!('@context' in offeredSisa))
    throw new Error('offeredSisa must have key "@context"');

  if (offeredSisa['@context'] !== 'https://context.jlinc.org/v05/jlinc.jsonld')
    throw new Error('offeredSisa["@context"] is invalid');

  // validating offeredSisa.agreementJwt
  if (!('agreementJwt' in offeredSisa))
    throw new Error('offeredSisa must have key "agreementJwt"');

  if (typeof offeredSisa.agreementJwt !== 'string')
    throw new Error('offeredSisa.agreementJwt must be of type string');

  if (!offeredSisa.agreementJwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/))
    throw new Error('offeredSisa.agreementJwt is invalid');

  if (jsonwebtoken.decode(offeredSisa.agreementJwt) === null)
    throw new Error('offeredSisa.agreementJwt is invalid');

  // validating offeredSisa.dataCustodianSigType
  if (!('dataCustodianSigType' in offeredSisa))
    throw new Error('offeredSisa must have key "dataCustodianSigType"');

  if (typeof offeredSisa.dataCustodianSigType !== 'string')
    throw new Error('offeredSisa.dataCustodianSigType must be of type string');

  if (offeredSisa.dataCustodianSigType !== 'sha256:ed25519')
    throw new Error('offeredSisa.dataCustodianSigType is invalid');

  // validating offeredSisa.dataCustodianID
  if (!('dataCustodianID' in offeredSisa))
    throw new Error('offeredSisa must have key "dataCustodianID"');

  if (typeof offeredSisa.dataCustodianID !== 'string')
    throw new Error('offeredSisa.dataCustodianID must be of type string');

  // validating offeredSisa.dataCustodianSig
  if (!('dataCustodianSig' in offeredSisa))
    throw new Error('offeredSisa must have key "dataCustodianSig"');

  if (typeof offeredSisa.dataCustodianSig !== 'string')
    throw new Error('offeredSisa.dataCustodianSig must be of type string');

  // validating offeredSisa.iat
  if (!('iat' in offeredSisa))
    throw new Error('offeredSisa must have key "iat"');

  if (typeof offeredSisa.iat !== 'number')
    throw new Error('offeredSisa.iat must be of type number');

  if (offeredSisa.iat < 1530903259573)
    throw new Error('offeredSisa.iat is too old');

  if (offeredSisa.iat > Date.now())
    throw new Error('offeredSisa.iat cannot be in the future');

  return true;
};
