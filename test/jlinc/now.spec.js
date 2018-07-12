'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.now', function() {
  it('should return seconds from epoch', function() {
    expect( JLINC.now() ).to.be.aRecentSecondsFromEpochInteger();
  });
});
