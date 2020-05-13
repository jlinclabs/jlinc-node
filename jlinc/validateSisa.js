'use strict';

const isISODateString = require('./isISODateString');
const isJwt = require('./isJwt');
const isFutureDate = require('./isFutureDate');

module.exports = function validateSisa({ sisa }){
  const { InvalidSisaError, InvalidOfferedSisaError, InvalidSignatureError } = this;

  if (typeof sisa !== 'object')
    throw new InvalidSisaError('sisa must be of type object');

  // validating sisa['@context']
  if (!('@context' in sisa))
    throw new InvalidSisaError('sisa must have key "@context"');

  try{
    this.getContextVersion(sisa['@context']);
  }catch(error){
    throw new InvalidSisaError('sisa["@context"] is invalid');
  }

  // validating sisa.acceptedSisaJwt
  if (!('acceptedSisaJwt' in sisa))
    throw new InvalidSisaError('sisa must have key "acceptedSisaJwt"');

  if (typeof sisa.acceptedSisaJwt !== 'string')
    throw new InvalidSisaError('sisa.acceptedSisaJwt must be of type string');

  if (!isJwt(sisa.acceptedSisaJwt))
    throw new InvalidSisaError('sisa.acceptedSisaJwt is invalid');

  const acceptedSisa = this.decodeJwt({ jwt: sisa.acceptedSisaJwt });
  if (acceptedSisa === null)
    throw new InvalidSisaError('sisa.acceptedSisaJwt is invalid');

  // validating sisa.sisaId
  if (!('sisaId' in sisa))
    throw new InvalidSisaError('sisa must have key "sisaId"');

  if (typeof sisa.sisaId !== 'string')
    throw new InvalidSisaError('sisa.sisaId must be of type string');

  const expectedSisaId = this.createHash({ itemToHash: sisa.acceptedSisaJwt });
  if (sisa.sisaId !== expectedSisaId)
    throw new InvalidSisaError('sisa.sisaId is not a hash of sisa.acceptedSisaJwt');



  if (typeof acceptedSisa !== 'object')
    throw new InvalidSisaError('sisa.acceptedSisa must be of type object');

  // validating acceptedSisa['@context']
  if (!('@context' in acceptedSisa))
    throw new InvalidSisaError('sisa.acceptedSisa must have key "@context"');

  try{
    this.getContextVersion(acceptedSisa['@context']);
  }catch(error){
    throw new InvalidSisaError('sisa.acceptedSisa["@context"] is invalid');
  }

  // validating acceptedSisa.offeredSisaJwt
  if (!('offeredSisaJwt' in acceptedSisa))
    throw new InvalidSisaError('sisa.acceptedSisa must have key "offeredSisaJwt"');

  if (typeof acceptedSisa.offeredSisaJwt !== 'string')
    throw new InvalidSisaError('sisa.acceptedSisa.offeredSisaJwt must be of type string');

  if (!isJwt(acceptedSisa.offeredSisaJwt))
    throw new InvalidSisaError('sisa.acceptedSisa.offeredSisaJwt is invalid');

  const offeredSisa = this.decodeJwt({ jwt: acceptedSisa.offeredSisaJwt });
  if (offeredSisa === null)
    throw new InvalidSisaError('sisa.acceptedSisa.offeredSisaJwt is invalid');

  try{
    this.validateOfferedSisa({
      offeredSisa,
      dataCustodianDid: offeredSisa.dataCustodianDid,
    });
  }catch(error){
    if (error instanceof InvalidOfferedSisaError){
      throw new InvalidSisaError(error.message.replace('offeredSisa', 'sisa.acceptedSisa.offeredSisa'));
    }
    throw error;
  }

  // validating acceptedSisa.rightsHolderSigType
  if (!('rightsHolderSigType' in acceptedSisa))
    throw new InvalidSisaError('sisa.acceptedSisa must have key "rightsHolderSigType"');

  if (typeof acceptedSisa.rightsHolderSigType !== 'string')
    throw new InvalidSisaError('sisa.acceptedSisa.rightsHolderSigType must be of type string');

  if (acceptedSisa.rightsHolderSigType !== this.signatureType)
    throw new InvalidSisaError('sisa.acceptedSisa.rightsHolderSigType is invalid');

  // validating acceptedSisa.rightsHolderDid
  if (!('rightsHolderDid' in acceptedSisa))
    throw new InvalidSisaError('sisa.acceptedSisa must have key "rightsHolderDid"');

  if (typeof acceptedSisa.rightsHolderDid !== 'string')
    throw new InvalidSisaError('sisa.acceptedSisa.rightsHolderDid must be of type string');

  // validating acceptedSisa.rightsHolderPublicKey
  if (!('rightsHolderPublicKey' in acceptedSisa))
    throw new InvalidSisaError('sisa.acceptedSisa must have key "rightsHolderPublicKey"');

  if (acceptedSisa.rightsHolderPublicKey.length !== 43)
    throw new InvalidSisaError('sisa.acceptedSisa.rightsHolderPublicKey must be of length 43');

  // validating acceptedSisa.rightsHolderSig
  if (!('rightsHolderSig' in acceptedSisa))
    throw new InvalidSisaError('sisa.acceptedSisa must have key "rightsHolderSig"');

  if (typeof acceptedSisa.rightsHolderSig !== 'string')
    throw new InvalidSisaError('sisa.acceptedSisa.rightsHolderSig must be of type string');

  try{
    this.verifySignature({
      itemSigned: acceptedSisa.offeredSisaJwt,
      signature: acceptedSisa.rightsHolderSig,
      publicKey: acceptedSisa.rightsHolderPublicKey,
      contextUrl: acceptedSisa['@context']
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new InvalidSisaError('sisa.acceptedSisa.rightsHolderSig is invalid');
    throw error;
  }

  // validating acceptedSisa.createdAt
  if (!('createdAt' in acceptedSisa))
    throw new InvalidSisaError('sisa.acceptedSisa must have key "createdAt"');

  if (typeof acceptedSisa.createdAt !== 'string')
    throw new InvalidSisaError('sisa.acceptedSisa.createdAt must be of type string');

  if (!isISODateString(acceptedSisa.createdAt))
    throw new InvalidSisaError('sisa.acceptedSisa.createdAt must be an ISO Date String');

  if (isFutureDate(acceptedSisa.createdAt))
    throw new InvalidSisaError('sisa.acceptedSisa.createdAt cannot be in the future');

  return true;
};
