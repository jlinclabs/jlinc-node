'use strict';

module.exports = function validateOfferedSisa({ offeredSisa }) {
  const { InvalidOfferedSisaError, InvalidSignatureError, InvalidSisaAgreementError } = this;

  if (!offeredSisa) throw new Error('offeredSisa is required');

  if (typeof offeredSisa !== 'object')
    throw new InvalidOfferedSisaError('offeredSisa must be of type object');

  // validating offeredSisa["@context"]
  if (!('@context' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "@context"');

  if (offeredSisa['@context'] !== this.contextUrl)
    throw new InvalidOfferedSisaError('offeredSisa["@context"] is invalid');

  // validating offeredSisa.agreementJwt
  if (!('agreementJwt' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "agreementJwt"');

  if (typeof offeredSisa.agreementJwt !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.agreementJwt must be of type string');

  if (!offeredSisa.agreementJwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/))
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

  if (offeredSisa.dataCustodianSigType !== 'sha256:ed25519')
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianSigType is invalid');

  // validating offeredSisa.dataCustodianId
  if (!('dataCustodianId' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "dataCustodianId"');

  if (typeof offeredSisa.dataCustodianId !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianId must be of type string');

  if (offeredSisa.dataCustodianId.length !== 43)
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianId must be of length 43');

  // validating offeredSisa.dataCustodianSig
  if (!('dataCustodianSig' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "dataCustodianSig"');

  if (typeof offeredSisa.dataCustodianSig !== 'string')
    throw new InvalidOfferedSisaError('offeredSisa.dataCustodianSig must be of type string');

  try{
    this.verifySignature({
      itemSigned: offeredSisa.agreementJwt,
      signature: offeredSisa.dataCustodianSig,
      publicKey: offeredSisa.dataCustodianId,
    });
  }catch(error){
    if (error instanceof InvalidSignatureError)
      throw new InvalidOfferedSisaError('offeredSisa.dataCustodianSig is invalid');
    throw error;
  }

  // validating offeredSisa.iat
  if (!('iat' in offeredSisa))
    throw new InvalidOfferedSisaError('offeredSisa must have key "iat"');

  if (typeof offeredSisa.iat !== 'number')
    throw new InvalidOfferedSisaError('offeredSisa.iat must be of type number');

  if (offeredSisa.iat < 1530903259)
    throw new InvalidOfferedSisaError('offeredSisa.iat is too old');

  if (offeredSisa.iat > this.now())
    throw new InvalidOfferedSisaError('offeredSisa.iat cannot be in the future');

  return true;
};
