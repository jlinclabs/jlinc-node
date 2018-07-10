'use strict';

const jsonwebtoken = require('jsonwebtoken');

module.exports = function validateSisa({ sisa, dataCustodian, rightsHolder }){

  if (typeof sisa !== 'object')
    throw new Error('sisa must be of type object');

  // validating sisa['@context']
  if (!('@context' in sisa))
    throw new Error('sisa must have key "@context"');

  if (sisa['@context'] !== this.contextUrl)
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

  // validating sisa.sisaId
  if (!('sisaId' in sisa))
    throw new Error('sisa must have key "sisaId"');

  if (typeof sisa.sisaId !== 'string')
    throw new Error('sisa.sisaId must be of type string');

  const expectedSisaId = this.createHash({ itemToHash: sisa.acceptedSisaJwt });
  if (sisa.sisaId !== expectedSisaId)
    throw new Error('sisa.sisaId is not a hash of sisa.acceptedSisaJwt');



  if (typeof acceptedSisa !== 'object')
    throw new Error('sisa.acceptedSisa must be of type object');

  // validating acceptedSisa['@context']
  if (!('@context' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "@context"');

  if (acceptedSisa['@context'] !== this.contextUrl)
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

  // validating acceptedSisa.rightsHolderId
  if (!('rightsHolderId' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "rightsHolderId"');

  if (typeof acceptedSisa.rightsHolderId !== 'string')
    throw new Error('sisa.acceptedSisa.rightsHolderId must be of type string');

  if (acceptedSisa.rightsHolderId.length !== 43)
    throw new Error('sisa.acceptedSisa.rightsHolderId must be of length 43');

  if (rightsHolder && rightsHolder.id){
    if (acceptedSisa.rightsHolderId !== rightsHolder.id)
      throw new Error('sisa.acceptedSisa.rightsHolderId does not match given rightsHolder');
  }

  // validating acceptedSisa.rightsHolderSig
  if (!('rightsHolderSig' in acceptedSisa))
    throw new Error('sisa.acceptedSisa must have key "rightsHolderSig"');

  if (typeof acceptedSisa.rightsHolderSig !== 'string')
    throw new Error('sisa.acceptedSisa.rightsHolderSig must be of type string');

  const validSignature = this.validateSignature({
    itemSigned: acceptedSisa.offeredSisaJwt,
    signature: acceptedSisa.rightsHolderSig,
    publicKey: acceptedSisa.rightsHolderId,
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

  if (acceptedSisa.iat > this.now())
    throw new Error('sisa.acceptedSisa.iat cannot be in the future');

  return true;
};
