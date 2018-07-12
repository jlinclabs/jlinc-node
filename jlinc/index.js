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
  contextUrl: 'https://context.jlinc.org/v05/jlinc.jsonld',
  defaultAgreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',

  sisaEventTypes: Object.freeze([
    'dataEvent',
    'permissionEvent',
    'statusEvent',
  ]),

  // Custom Errors
  JWTVerificationError: class JWTVerificationError extends CustomError {},
  InvalidEntityError: class InvalidEntityError extends CustomError {},
  InvalidDataCustodianError: class InvalidDataCustodianError extends CustomError {},
  InvalidRightsHolderError: class InvalidRightsHolderError extends CustomError {},
  InvalidSignatureError: class InvalidSignatureError extends CustomError {},
  InvalidSisaAgreementError: class InvalidSisaAgreementError extends CustomError {},
  InvalidOfferedSisaError: class InvalidOfferedSisaError extends CustomError {},
  InvalidSisaError: class InvalidSisaError extends CustomError {},
  InvalidSisaEventError: class InvalidSisaEventError extends CustomError {},
  InvalidAcknowledgedSisaEventError: class InvalidAcknowledgedSisaEventError extends CustomError {},

  now: require('./now'),
  createNonce: require('./createNonce'),
  createHash: require('./createHash'),

  createSignedJwt: require('./createSignedJwt'),
  decodeJwt: require('./decodeJwt'),
  decodeAndVerifyJwt: require('./decodeAndVerifyJwt'),

  signItem: require('./signItem'),
  validateSignature: require('./validateSignature'),

  createEntity: require('./createEntity'),
  validateEntity: require('./validateEntity'),
  validateDataCustodian: require('./validateDataCustodian'),
  validateRightsHolder: require('./validateRightsHolder'),

  createSisaAgreement: require('./createSisaAgreement'),
  validateSisaAgreement: require('./validateSisaAgreement'),
  createDataCustodian: require('./createDataCustodian'),
  createRightsHolder: require('./createRightsHolder'),

  createSisaOffering: require('./createSisaOffering'),
  validateOfferedSisa: require('./validateOfferedSisa'),

  acceptSisa: require('./acceptSisa'),
  validateSisa: require('./validateSisa'),

  expandSisa: require('./expandSisa'),
};
