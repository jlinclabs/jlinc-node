'use strict';

const isISODateString = require('./isISODateString');
const isJwt = require('./isJwt');
const isDid = require('./isDid');

module.exports = function validateBisa({ bisa }){
  const { InvalidBisaError, InvalidOfferedBisaError, InvalidSignatureError } = this;

  if (typeof bisa !== 'object')
    throw new InvalidBisaError('bisa must be of type object');

  // validating bisa['@context']
  if (!('@context' in bisa))
    throw new InvalidBisaError('bisa must have key "@context"');

  try{
    this.getContextVersion(bisa['@context']);
  }catch(error){
    throw new InvalidBisaError('bisa["@context"] is invalid');
  }

  // validating bisa.acceptedBisaJwt
  if (!('acceptedBisaJwt' in bisa))
    throw new InvalidBisaError('bisa must have key "acceptedBisaJwt"');

  if (typeof bisa.acceptedBisaJwt !== 'string')
    throw new InvalidBisaError('bisa.acceptedBisaJwt must be of type string');

  if (!isJwt(bisa.acceptedBisaJwt))
    throw new InvalidBisaError('bisa.acceptedBisaJwt is invalid');

  const acceptedBisa = this.decodeJwt({ jwt: bisa.acceptedBisaJwt });
  if (acceptedBisa === null)
    throw new InvalidBisaError('bisa.acceptedBisaJwt is invalid');

  // validating bisa.bisaId
  if (!('bisaId' in bisa))
    throw new InvalidBisaError('bisa must have key "bisaId"');

  if (typeof bisa.bisaId !== 'string')
    throw new InvalidBisaError('bisa.bisaId must be of type string');

  const expectedBisaId = this.createHash({ itemToHash: bisa.acceptedBisaJwt });
  if (bisa.bisaId !== expectedBisaId)
    throw new InvalidBisaError('bisa.bisaId is not a hash of bisa.acceptedBisaJwt');

  // validating acceptedBisa['@context']
  if (!('@context' in acceptedBisa))
    throw new InvalidBisaError('bisa.acceptedBisa must have key "@context"');

  try{
    this.getContextVersion(acceptedBisa['@context']);
  }catch(error){
    throw new InvalidBisaError('bisa.acceptedBisa["@context"] is invalid');
  }

  // validating acceptedBisa.offeredBisaJwt
  if (!('offeredBisaJwt' in acceptedBisa))
    throw new InvalidBisaError('bisa.acceptedBisa must have key "offeredBisaJwt"');

  if (typeof acceptedBisa.offeredBisaJwt !== 'string')
    throw new InvalidBisaError('bisa.acceptedBisa.offeredBisaJwt must be of type string');

  if (!isJwt(acceptedBisa.offeredBisaJwt))
    throw new InvalidBisaError('bisa.acceptedBisa.offeredBisaJwt is invalid');

  const offeredBisa = this.decodeJwt({ jwt: acceptedBisa.offeredBisaJwt });
  if (offeredBisa === null)
    throw new InvalidBisaError('bisa.acceptedBisa.offeredBisaJwt is invalid');

  try{
    this.validateOfferedBisa({ offeredBisa });
  }catch(error){
    if (error instanceof InvalidOfferedBisaError){
      throw new InvalidBisaError(error.message.replace('offeredBisa', 'bisa.acceptedBisa.offeredBisa'));
    }
    throw error;
  }

  // validating acceptedBisa.acceptorSigType
  if (!('acceptorSigType' in acceptedBisa))
    throw new InvalidBisaError('bisa.acceptedBisa must have key "acceptorSigType"');

  if (typeof acceptedBisa.acceptorSigType !== 'string')
    throw new InvalidBisaError('bisa.acceptedBisa.acceptorSigType must be of type string');

  if (acceptedBisa.acceptorSigType !== this.signatureType)
    throw new InvalidBisaError('bisa.acceptedBisa.acceptorSigType is invalid');

  // validating acceptedBisa.acceptorDid
  if (!('acceptorDid' in acceptedBisa))
    throw new InvalidBisaError('bisa.acceptedBisa must have key "acceptorDid"');

  if (!isDid(acceptedBisa.acceptorDid))
    throw new InvalidBisaError('bisa.acceptedBisa.acceptorDid must be a DID');

  // validating acceptedBisa.acceptorPublicKey
  if (!('acceptorPublicKey' in acceptedBisa))
    throw new InvalidBisaError('bisa.acceptedBisa must have key "acceptorPublicKey"');

  if (acceptedBisa.acceptorPublicKey.length !== 43)
    throw new InvalidBisaError('bisa.acceptedBisa.acceptorPublicKey must be of length 43');

  // validating acceptedBisa.acceptorSig
  if (!('acceptorSig' in acceptedBisa))
    throw new InvalidBisaError('bisa.acceptedBisa must have key "acceptorSig"');

  if (typeof acceptedBisa.acceptorSig !== 'string')
    throw new InvalidBisaError('bisa.acceptedBisa.acceptorSig must be of type string');

  try{
    this.verifySignature({
      itemSigned: acceptedBisa.offeredBisaJwt,
      signature: acceptedBisa.acceptorSig,
      publicKey: acceptedBisa.acceptorPublicKey,
      contextUrl: acceptedBisa['@context']
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new InvalidBisaError('bisa.acceptedBisa.acceptorSig is invalid');
    throw error;
  }

  // validating acceptedBisa.createdAt
  if (!('createdAt' in acceptedBisa))
    throw new InvalidBisaError('bisa.acceptedBisa must have key "createdAt"');

  if (typeof acceptedBisa.createdAt !== 'string')
    throw new InvalidBisaError('bisa.acceptedBisa.createdAt must be of type string');

  if (!isISODateString(acceptedBisa.createdAt))
    throw new InvalidBisaError('bisa.acceptedBisa.createdAt must be an ISO Date String');

  if (new Date(acceptedBisa.createdAt).getTime() > Date.now())
    throw new InvalidBisaError('bisa.acceptedBisa.createdAt cannot be in the future');

  return true;
};
