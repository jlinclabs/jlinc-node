'use strict';

module.exports = function isISODateString(createdAt) {
  return createdAt.match(/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/);
};
