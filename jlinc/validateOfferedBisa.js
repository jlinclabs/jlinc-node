'use strict';

const isISODateString = require('./isISODateString');
const isJwt = require('./isJwt');

module.exports = function validateOfferedBisa({ offeredBisa }) {
  const { InvalidOfferedBisaError, InvalidSignatureError, InvalidBisaAgreementError } = this;

  if (!offeredBisa) throw new Error('offeredBisa is required');

  if (typeof offeredBisa !== 'object')
    throw new InvalidOfferedBisaError('offeredBisa must be of type object');

  // validating offeredBisa["@context"]
  if (!('@context' in offeredBisa))
    throw new InvalidOfferedBisaError('offeredBisa must have key "@context"');

  try{
    this.getContextVersion(offeredBisa['@context']);
  }catch(error){
    throw new InvalidOfferedBisaError('offeredBisa["@context"] is invalid');
  }

  // validating offeredBisa.agreementJwt
  if (!('agreementJwt' in offeredBisa))
    throw new InvalidOfferedBisaError('offeredBisa must have key "agreementJwt"');

  if (typeof offeredBisa.agreementJwt !== 'string')
    throw new InvalidOfferedBisaError('offeredBisa.agreementJwt must be of type string');

  if (!isJwt(offeredBisa.agreementJwt))
    throw new InvalidOfferedBisaError('offeredBisa.agreementJwt is invalid');

  const bisaAgreement = this.decodeJwt({ jwt: offeredBisa.agreementJwt });
  if (bisaAgreement === null)
    throw new InvalidOfferedBisaError('offeredBisa.agreementJwt is invalid');

  try{
    this.validateBisaAgreement({ bisaAgreement });
  }catch(error){
    if (error instanceof InvalidBisaAgreementError){
      error.message = error.message.replace('bisaAgreement', 'acceptedBisa.agreement');
    }
    throw error;
  }

  // validating offeredBisa.offerorSigType
  if (!('offerorSigType' in offeredBisa))
    throw new InvalidOfferedBisaError('offeredBisa must have key "offerorSigType"');

  if (typeof offeredBisa.offerorSigType !== 'string')
    throw new InvalidOfferedBisaError('offeredBisa.offerorSigType must be of type string');

  if (offeredBisa.offerorSigType !== this.signatureType)
    throw new InvalidOfferedBisaError('offeredBisa.offerorSigType is invalid');

  // validating offeredBisa.offerorDid
  if (!('offerorDid' in offeredBisa))
    throw new InvalidOfferedBisaError('offeredBisa must have key "offerorDid"');

  if (typeof offeredBisa.offerorDid !== 'string')
    throw new InvalidOfferedBisaError('offeredBisa.offerorDid must be of type string');

  // validating offeredBisa.offerorPublicKey
  if (!('offerorPublicKey' in offeredBisa))
    throw new InvalidOfferedBisaError('offeredBisa must have key "offerorPublicKey"');

  if (typeof offeredBisa.offerorPublicKey !== 'string')
    throw new InvalidOfferedBisaError('offeredBisa.offerorPublicKey must be of type string');

  if (offeredBisa.offerorPublicKey.length !== 43)
    throw new InvalidOfferedBisaError('offeredBisa.offerorPublicKey must be of length 43');

  // validating offeredBisa.offerorSig
  if (!('offerorSig' in offeredBisa))
    throw new InvalidOfferedBisaError('offeredBisa must have key "offerorSig"');

  if (typeof offeredBisa.offerorSig !== 'string')
    throw new InvalidOfferedBisaError('offeredBisa.offerorSig must be of type string');

  try{
    this.verifySignature({
      itemSigned: offeredBisa.agreementJwt,
      signature: offeredBisa.offerorSig,
      publicKey: offeredBisa.offerorPublicKey,
      contextUrl: offeredBisa['@context']
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new InvalidOfferedBisaError('offeredBisa.offerorSig is invalid');
    throw error;
  }

  // validating offeredBisa.createdAt
  if (!('createdAt' in offeredBisa))
    throw new InvalidOfferedBisaError('offeredBisa must have key "createdAt"');

  if (typeof offeredBisa.createdAt !== 'string')
    throw new InvalidOfferedBisaError('offeredBisa.createdAt must be of type string');

  if (!isISODateString(offeredBisa.createdAt))
    throw new InvalidOfferedBisaError('offeredBisa.createdAt must be an ISO Date String');

  if (new Date(offeredBisa.createdAt).getTime() > Date.now())
    throw new InvalidOfferedBisaError('offeredBisa.createdAt cannot be in the future');

  return true;
};
