'use strict';

const VALID_JLINC_CONTEXT_URL_VERSIONS = Object.freeze([5,6]);
const CONTEXT_REG_EXP = /^https:\/\/protocol\.jlinc\.org\/context\/jlinc\-v([\d]+)\.jsonld$/;

module.exports = function getContextVersion(context) {
  if (typeof context !== 'string') throw new Error('@context must be of type string');
  const match = context.match(CONTEXT_REG_EXP);
  if (!match) throw new Error('invalid @context');
  const version = parseInt(match[1], 10);
  if (VALID_JLINC_CONTEXT_URL_VERSIONS.includes(version)) return version;
  throw new Error(`invalid @context version number: ${version}`);
};
