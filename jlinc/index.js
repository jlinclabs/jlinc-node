'use strict';

class CustomError extends Error {
  constructor(message){
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};

module.exports =  {
  version: require('../package.json').version,
  contextUrl: 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
  defaultAgreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
  signatureType: 'sha256:ed25519',

  sisaEventTypes: Object.freeze([
    'dataEvent',
    'permissionEvent',
    'statusEvent',
  ]),

  // Custom Errors
  JWTVerificationError: class JWTVerificationError extends CustomError {},
  InvalidSignatureError: class InvalidSignatureError extends CustomError {},
  InvalidSisaAgreementError: class InvalidSisaAgreementError extends CustomError {},
  InvalidOfferedSisaError: class InvalidOfferedSisaError extends CustomError {},
  InvalidSisaOfferingError: class InvalidSisaOfferingError extends CustomError {},
  InvalidSisaError: class InvalidSisaError extends CustomError {},
  InvalidSisaEventError: class InvalidSisaEventError extends CustomError {},
  InvalidAcknowledgedSisaEventError: class InvalidAcknowledgedSisaEventError extends CustomError {},

  SisaOfferingVerificationError: class SisaOfferingVerificationError extends CustomError {},
  SisaVerificationError: class SisaVerificationError extends CustomError {},
  SisaEventVerificationError: class SisaEventVerificationError extends CustomError {},
  AcknowledgedSisaEventVerificationError: class AcknowledgedSisaEventVerificationError extends CustomError {},

  EncryptError: class EncryptError extends CustomError {},
  DecryptError: class DecryptError extends CustomError {},

  // utilities
  now: require('./now'),
  createNonce: require('./createNonce'),
  createHash: require('./createHash'),

  createSignedJwt: require('./createSignedJwt'),
  decodeJwt: require('./decodeJwt'),
  decodeAndVerifyJwt: require('./decodeAndVerifyJwt'),

  signItem: require('./signItem'),
  verifySignature: require('./verifySignature'),

  createEntity: require('./createEntity'),

  createDataCustodian: require('./createDataCustodian'),
  createRightsHolder: require('./createRightsHolder'),

  pubkeyEncrypt: require('./pubkeyEncrypt'),
  pubkeyDecrypt: require('./pubkeyDecrypt'),

  // creating and signing a sisa
  createSisaOffering: require('./createSisaOffering'),
  validateSisaOffering: require('./validateSisaOffering'),
  validateOfferedSisa: require('./validateOfferedSisa'),
  validateSisaAgreement: require('./validateSisaAgreement'),
  verifySisaOfferingIsFromDataCustodian: require('./verifySisaOfferingIsFromDataCustodian'),

  acceptSisa: require('./acceptSisa'),
  validateSisa: require('./validateSisa'),
  verifySisaWasOfferedByDataCustodian: require('./verifySisaWasOfferedByDataCustodian'),
  verifySisaWasSignedByRightsHolder: require('./verifySisaWasSignedByRightsHolder'),

  expandSisa: require('./expandSisa'),

  // Sisa Events
  createSisaEvent: require('./createSisaEvent'),
  validateSisaEvent: require('./validateSisaEvent'),
  expandSisaEvent: require('./expandSisaEvent'),
  verifySisaEventWasSignedByRightsHolder: require('./verifySisaEventWasSignedByRightsHolder'),

  acknowledgeSisaEvent: require('./acknowledgeSisaEvent'),
  validateAcknowledgedSisaEvent: require('./validateAcknowledgedSisaEvent'),
  verifyAcknowledgedSisaEventWasSignedByDataCustodian: require('./verifyAcknowledgedSisaEventWasSignedByDataCustodian'),
};
