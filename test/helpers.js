'use strict';

const generateISODateStringInTheFuture = function(){
  const date = new Date();
  date.setMinutes(date.getMinutes() + 5);
  return date.toISOString();
};

module.exports = {
  generateISODateStringInTheFuture,
};



