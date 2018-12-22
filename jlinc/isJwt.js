'use strict';

module.exports = function isJwt(jwt) {
  return (
    typeof jwt === 'string' &&
    !!jwt.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
  );
};
