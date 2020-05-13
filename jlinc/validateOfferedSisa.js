'use strict';

const isISODateString = require('./isISODateString');
const isJwt = require('./isJwt');
const isFutureDate = require('./isFutureDate');

module.exports = function validateOfferedSisa({ offeredSisa }) {
  const { InvalidOfferedSisaError, InvalidSignatureError, InvalidSisaAgreementError } = this;

  if (!offeredSisa) throw new Error('offeredSisa is required');

  if (typeof offeredSisa !== 'object')
    throw new InvalidOfferedSisaError('offeredSisa must be of type object');

  // validating offeredSisa["@context"]
  if (!('@context' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "@context"');

  try{
    this.getContextVersion(offeredSisa['@context']);
  }catch(error){
    throw new InvalidOfferedSisaError('offeredSisa["@context"] is invalid');
  }

  // validating offeredSisa.agreementJwt
  if (!('agreementJwt' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "agreementJwt"');

  if (typeof offeredSisa.agreementJwt !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.agreementJwt must be of type string');

  if (!isJwt(offeredSisa.agreementJwt))
    throw new InvalidOfferedSisaError('offeredSisa.agreementJwt is invalid');

  const sisaAgreement = this.decodeJwt({ jwt: offeredSisa.agreementJwt });
  if (sisaAgreement === null)
    throw new InvalidOfferedSisaError('offeredSisa.agreementJwt is invalid');

  try{
    this.validateSisaAgreement({ sisaAgreement });
  }catch(error){
    if (error instanceof InvalidSisaAgreementError){
      error.message = error.message.replace('sisaAgreement', 'acceptedSisa.agreement');
    }
    throw error;
  }

  // validating offeredSisa.dataCustodianSigType
  if (!('dataCustodianSigType' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "dataCustodianSigType"');

  if (typeof offeredSisa.dataCustodianSigType !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianSigType must be of type string');

  if (offeredSisa.dataCustodianSigType !== this.signatureType)
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianSigType is invalid');

  // validating offeredSisa.dataCustodianDid
  if (!('dataCustodianDid' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "dataCustodianDid"');

  if (typeof offeredSisa.dataCustodianDid !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianDid must be of type string');

  // validating offeredSisa.dataCustodianPublicKey
  if (!('dataCustodianPublicKey' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "dataCustodianPublicKey"');

  if (typeof offeredSisa.dataCustodianPublicKey !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianPublicKey must be of type string');

  if (offeredSisa.dataCustodianPublicKey.length !== 43)
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianPublicKey must be of length 43');

  // validating offeredSisa.dataCustodianSig
  if (!('dataCustodianSig' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "dataCustodianSig"');

  if (typeof offeredSisa.dataCustodianSig !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianSig must be of type string');

  try{
    this.verifySignature({
      itemSigned: offeredSisa.agreementJwt,
      signature: offeredSisa.dataCustodianSig,
      publicKey: offeredSisa.dataCustodianPublicKey,
      contextUrl: offeredSisa['@context']
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new InvalidOfferedSisaError('offeredSisa.dataCustodianSig is invalid');
    throw error;
  }

  // validating offeredSisa.createdAt
  if (!('createdAt' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "createdAt"');

  if (typeof offeredSisa.createdAt !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.createdAt must be of type string');

  if (!isISODateString(offeredSisa.createdAt))
    throw new InvalidOfferedSisaError('offeredSisa.createdAt must be an ISO Date String');

  if (isFutureDate(offeredSisa.createdAt))
    throw new InvalidOfferedSisaError('offeredSisa.createdAt cannot be in the future');

  return true;
};
