'use strict';

module.exports =  {
  version: require('../package.json').version,
  contextUrl: 'https://context.jlinc.org/v05/jlinc.jsonld',
  defaultAgreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',

  now: require('./now'),
  createNonce: require('./createNonce'),
  createHash: require('./createHash'),

  signItem: require('./signItem'),
  validateSignature: require('./validateSignature'),

  createEntity: require('./createEntity'),
  validateEntity: require('./validateEntity'),
  validateDataCustodian: require('./validateDataCustodian'),
  validateRightsHolder: require('./validateRightsHolder'),

  createSisaAgreement: require('./createSisaAgreement'),
  validateSisaAgreement: require('./validateSisaAgreement'),

  createSisaOffering: require('./createSisaOffering'),
  validateOfferedSisa: require('./validateOfferedSisa'),

  acceptSisa: require('./acceptSisa'),
  validateSisa: require('./validateSisa'),

  expandSisa: require('./expandSisa'),
};
