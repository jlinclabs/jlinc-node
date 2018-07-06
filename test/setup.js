'use strict';

process.env.NODE_ENV = 'test';
const chai = require('chai');
global.expect = chai.expect;
global.JLINC = require('../jlinc');
