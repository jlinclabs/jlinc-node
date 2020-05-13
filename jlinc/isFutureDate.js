'use strict';

module.exports = function isFutureDate(date, tolerance = 1000) {
  return new Date(date).getTime() > (Date.now() + tolerance);
};
