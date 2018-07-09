'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function validateAcceptedSisa({ acceptedSisa }){
  if (typeof acceptedSisa !== 'object')
    throw new Error('acceptedSisa must be of type object');

  // validating acceptedSisa['@context']
  if (!('@context' in acceptedSisa))
    throw new Error('acceptedSisa must have key "@context"');

  if (acceptedSisa['@context'] !== 'https://context.jlinc.org/v05/jlinc.jsonld')
    throw new Error('acceptedSisa["@context"] is invalid');

  // validating acceptedSisa.offeredSisaJwt
  if (!('offeredSisaJwt' in acceptedSisa))
    throw new Error('acceptedSisa must have key "offeredSisaJwt"');

  if (typeof acceptedSisa.offeredSisaJwt !== 'string')
    throw new Error('acceptedSisa.offeredSisaJwt must be of type string');

  if (!acceptedSisa.offeredSisaJwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/))
    throw new Error('acceptedSisa.offeredSisaJwt is invalid');

  if (jsonwebtoken.decode(acceptedSisa.offeredSisaJwt) === null)
    throw new Error('acceptedSisa.offeredSisaJwt is invalid');

  // validating acceptedSisa.rightsHolderSigType
  if (!('rightsHolderSigType' in acceptedSisa))
    throw new Error('acceptedSisa must have key "rightsHolderSigType"');

  if (typeof acceptedSisa.rightsHolderSigType !== 'string')
    throw new Error('acceptedSisa.rightsHolderSigType must be of type string');

  if (acceptedSisa.rightsHolderSigType !== 'sha256:ed25519')
    throw new Error('acceptedSisa.rightsHolderSigType is invalid');

  // validating acceptedSisa.rightsHolderID
  if (!('rightsHolderID' in acceptedSisa))
    throw new Error('acceptedSisa must have key "rightsHolderID"');

  if (typeof acceptedSisa.rightsHolderID !== 'string')
    throw new Error('acceptedSisa.rightsHolderID must be of type string');

  // validating acceptedSisa.rightsHolderSig
  if (!('rightsHolderSig' in acceptedSisa))
    throw new Error('acceptedSisa must have key "rightsHolderSig"');

  if (typeof acceptedSisa.rightsHolderSig !== 'string')
    throw new Error('acceptedSisa.rightsHolderSig must be of type string');

  // validating acceptedSisa.iat
  if (!('iat' in acceptedSisa))
    throw new Error('acceptedSisa must have key "iat"');

  if (typeof acceptedSisa.iat !== 'number')
    throw new Error('acceptedSisa.iat must be of type number');

  if (acceptedSisa.iat < 1530903259573)
    throw new Error('acceptedSisa.iat is too old');

  if (acceptedSisa.iat > Date.now())
    throw new Error('acceptedSisa.iat cannot be in the future');

  return true;
};
