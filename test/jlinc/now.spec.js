'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.now', function() {
  it('should return the current datetime in ISO format', function(){
    expect(JLINC.now()).to.be.aRecentDatetimeInISOFormat();
  });
});
