'use strict';

module.exports.version = require('../package.json').version;

module.exports.createNonce = require('./createNonce');

module.exports.signItem = require('./signItem');
module.exports.validateSignature = require('./validateSignature');

module.exports.createEntity = require('./createEntity');
module.exports.validateEntity = require('./validateEntity');
module.exports.validateDataCustodian = require('./validateDataCustodian');
// module.exports.validateRightsHolder = require('./validateRightsHolder');

module.exports.createSisaAgreement = require('./createSisaAgreement');
module.exports.validateSisaAgreement = require('./validateSisaAgreement');

module.exports.createSisaOffering = require('./createSisaOffering');
module.exports.validateSisaOffering = require('./validateSisaOffering');
