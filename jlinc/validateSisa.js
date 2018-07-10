'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function validateSisa({ sisa, dataCustodian }){

  if (typeof sisa !== 'object')
    throw new Error('sisa must be of type object');

  // validating sisa['@context']
  if (!('@context' in sisa))
    throw new Error('sisa must have key "@context"');

  if (sisa['@context'] !== 'https://context.jlinc.org/v05/jlinc.jsonld')
    throw new Error('sisa["@context"] is invalid');

  // validating sisa.acceptedSisaJwt
  if (!('acceptedSisaJwt' in sisa))
    throw new Error('sisa must have key "acceptedSisaJwt"');

  if (typeof sisa.acceptedSisaJwt !== 'string')
    throw new Error('sisa.acceptedSisaJwt must be of type string');

  if (!sisa.acceptedSisaJwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/))
    throw new Error('sisa.acceptedSisaJwt is invalid');

  const acceptedSisa = jsonwebtoken.decode(sisa.acceptedSisaJwt);
  if (acceptedSisa === null)
    throw new Error('sisa.acceptedSisaJwt is invalid');

  // validating sisa.sisaID
  if (!('sisaID' in sisa))
    throw new Error('sisa must have key "sisaID"');

  if (typeof sisa.sisaID !== 'string')
    throw new Error('sisa.sisaID must be of type string');

  const expectedSisaID = this.createHash({ itemToHash: sisa.acceptedSisaJwt });
  if (sisa.sisaID !== expectedSisaID)
    throw new Error('sisa.sisaID is not a hash of sisa.acceptedSisaJwt');



  if (typeof acceptedSisa !== 'object')
    throw new Error('sisa.acceptedSisa must be of type object');

  // validating acceptedSisa['@context']
  if (!('@context' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "@context"');

  if (acceptedSisa['@context'] !== 'https://context.jlinc.org/v05/jlinc.jsonld')
    throw new Error('sisa.acceptedSisa["@context"] is invalid');

  // validating acceptedSisa.offeredSisaJwt
  if (!('offeredSisaJwt' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "offeredSisaJwt"');

  if (typeof acceptedSisa.offeredSisaJwt !== 'string')
    throw new Error('sisa.acceptedSisa.offeredSisaJwt must be of type string');

  if (!acceptedSisa.offeredSisaJwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/))
    throw new Error('sisa.acceptedSisa.offeredSisaJwt is invalid');

  const offeredSisa = jsonwebtoken.decode(acceptedSisa.offeredSisaJwt);
  if (offeredSisa === null)
    throw new Error('sisa.acceptedSisa.offeredSisaJwt is invalid');

  try{
    this.validateOfferedSisa({ offeredSisa, dataCustodian });
  }catch(error){
    if (error.message.includes('offeredSisa')){
      error.message = error.message.replace('offeredSisa', 'sisa.acceptedSisa.offeredSisa');
    }
    throw error;
  }

  // validating acceptedSisa.rightsHolderSigType
  if (!('rightsHolderSigType' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "rightsHolderSigType"');

  if (typeof acceptedSisa.rightsHolderSigType !== 'string')
    throw new Error('sisa.acceptedSisa.rightsHolderSigType must be of type string');

  if (acceptedSisa.rightsHolderSigType !== 'sha256:ed25519')
    throw new Error('sisa.acceptedSisa.rightsHolderSigType is invalid');

  // validating acceptedSisa.rightsHolderID
  if (!('rightsHolderID' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "rightsHolderID"');

  if (typeof acceptedSisa.rightsHolderID !== 'string')
    throw new Error('sisa.acceptedSisa.rightsHolderID must be of type string');

  if (acceptedSisa.rightsHolderID.length !== 43)
    throw new Error('sisa.acceptedSisa.rightsHolderID must be of length 43');

  // validating acceptedSisa.rightsHolderSig
  if (!('rightsHolderSig' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "rightsHolderSig"');

  if (typeof acceptedSisa.rightsHolderSig !== 'string')
    throw new Error('sisa.acceptedSisa.rightsHolderSig must be of type string');

  const validSignature = this.validateSignature({
    itemSigned: acceptedSisa.offeredSisaJwt,
    signature: acceptedSisa.rightsHolderSig,
    publicKey: acceptedSisa.rightsHolderID,
  });
  if (!validSignature)
    throw new Error('sisa.acceptedSisa.rightsHolderSig is invalid');

  // validating acceptedSisa.iat
  if (!('iat' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "iat"');

  if (typeof acceptedSisa.iat !== 'number')
    throw new Error('sisa.acceptedSisa.iat must be of type number');

  if (acceptedSisa.iat < 1530903259)
    throw new Error('sisa.acceptedSisa.iat is too old');

  if (acceptedSisa.iat > Date.now())
    throw new Error('sisa.acceptedSisa.iat cannot be in the future');

  return true;
};
