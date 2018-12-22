'use strict';

const DIDClient = require('jlinc-did-client');

class CustomError extends Error {
  constructor(message){
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
};

module.exports =  {
  version: require('../package.json').version,

  DIDClient,

  contextUrl: 'https://protocol.jlinc.org/context/jlinc-v6.jsonld',
  defaultAgreementURI: 'https://sisa.jlinc.org/v1/3b39160c2b9ae7b2ef81c3311c7924f1c4d4fa9ca47cfe7c840c9852b50d68d5',
  signatureType: 'sha256:ed25519',

  sisaEventTypes: Object.freeze([
    'dataEvent',
    'permissionEvent',
    'statusEvent',
  ]),

  // Custom Errors
  JWTVerificationError: class JWTVerificationError extends CustomError {},
  DIDVerificationError: class DIDVerificationError extends CustomError {},
  InvalidSignatureError: class InvalidSignatureError extends CustomError {},
  InvalidPublicKeyError: class InvalidPublicKeyError extends CustomError {},
  InvalidSisaAgreementError: class InvalidSisaAgreementError extends CustomError {},
  InvalidOfferedSisaError: class InvalidOfferedSisaError extends CustomError {},
  InvalidSisaOfferingError: class InvalidSisaOfferingError extends CustomError {},
  InvalidSisaError: class InvalidSisaError extends CustomError {},
  InvalidSisaEventError: class InvalidSisaEventError extends CustomError {},
  InvalidAcknowledgedSisaEventError: class InvalidAcknowledgedSisaEventError extends CustomError {},

  OfferedSisaVerificationError: class OfferedSisaVerificationError extends CustomError {},
  SisaVerificationError: class SisaVerificationError extends CustomError {},
  SisaEventVerificationError: class SisaEventVerificationError extends CustomError {},
  AcknowledgedSisaEventVerificationError: class AcknowledgedSisaEventVerificationError extends CustomError {},

  // utilities
  now: require('./now'),
  createNonce: require('./createNonce'),
  createHash: require('./createHash'),
  createSignedJwt: require('./createSignedJwt'),
  decodeJwt: require('./decodeJwt'),
  decodeAndVerifyJwt: require('./decodeAndVerifyJwt'),
  getContextVersion: require('./getContextVersion'),

  signItem: require('./signItem'),
  signHash: require('./signHash'),
  verifySignature: require('./verifySignature'),
  verifyHashSignature: require('./verifyHashSignature'),

  // creating entities
  createEntity: require('./createEntity'),
  createDataCustodian: require('./createDataCustodian'),
  createRightsHolder: require('./createRightsHolder'),

  // verifying DIDs
  verifyPublicKeyIsOwnedByDID: require('./verifyPublicKeyIsOwnedByDID'),

  // creating and signing a sisa
  createSisaOffering: require('./createSisaOffering'),
  validateSisaOffering: require('./validateSisaOffering'),
  validateOfferedSisa: require('./validateOfferedSisa'),
  validateSisaAgreement: require('./validateSisaAgreement'),
  verifySisaOfferingDataCustodianDid: require('./verifySisaOfferingDataCustodianDid'),
  verifyOfferedSisaDataCustodianDid: require('./verifyOfferedSisaDataCustodianDid'),
  acceptSisa: require('./acceptSisa'),
  validateSisa: require('./validateSisa'),
  verifySisaWasOfferedByDataCustodian: require('./verifySisaWasOfferedByDataCustodian'),
  verifySisaWasSignedByRightsHolder: require('./verifySisaWasSignedByRightsHolder'),
  verifySisaRightsHolderDid: require('./verifySisaRightsHolderDid'),

  expandSisa: require('./expandSisa'),

  // Sisa Events
  createSisaEvent: require('./createSisaEvent'),
  verifySisaEventWasSignedByRightsHolder: require('./verifySisaEventWasSignedByRightsHolder'),
  validateSisaEvent: require('./validateSisaEvent'),
  expandSisaEvent: require('./expandSisaEvent'),
  verifySisaEventRightsHolderDid: require('./verifySisaEventRightsHolderDid'),

  acknowledgeSisaEvent: require('./acknowledgeSisaEvent'),
  validateAcknowledgedSisaEvent: require('./validateAcknowledgedSisaEvent'),
  verifyAcknowledgedSisaEventWasSignedByDataCustodian: require('./verifyAcknowledgedSisaEventWasSignedByDataCustodian'),
  verifyAcknowledgedSisaEventDataCustodianDid: require('./verifyAcknowledgedSisaEventDataCustodianDid'),
};
