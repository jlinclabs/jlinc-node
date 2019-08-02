'use strict';

module.exports = function isDid(did) {
  return !!(
    typeof did === 'string' &&
    did.match(/^did:\S+$/)
  );
};
