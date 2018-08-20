'use strict';

module.exports = function getContextVersion(contextString) {
  try {
    return parseInt(contextString.match(this.contextRegExp)[1]);
  } catch (e) {
    return 0;
  }
};
