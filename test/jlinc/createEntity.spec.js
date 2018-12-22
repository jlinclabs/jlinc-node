'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.createEntity', function() {

  withDidServer();

  it('should generate an entity', async function(){
    const entity = await JLINC.createEntity();
    expect(entity).to.be.aJlincEntity();
  });

});
