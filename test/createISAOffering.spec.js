'use strict';

require('./setup');

describe('JLINC.createISAOffering', function() {
  it('should do all the magic sauce', function(){
    const isaOffering = JLINC.createISAOffering({});
    expect(isaOffering).to.be.an('object');
  });
});
