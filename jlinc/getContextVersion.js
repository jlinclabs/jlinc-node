'use strict';

module.exports = function getContextVersion(contextString) {
  try {
    let version =  parseInt(contextString.match(this.contextRegExp)[1]);
    if ([5,6].indexOf(version) >= 0) {
      return version;
    } else {
      return 0;
    }
  } catch (e) {
    return 0;
  }
};
