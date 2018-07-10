'use strict';

const chai = require('chai');
const jsonwebtoken = require('jsonwebtoken');

require('./setup');

chai.Assertion.addMethod('aJWT', function(){
  expect(this._obj).to.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/);
});

chai.Assertion.addMethod('aJWTSignedWith', function(secretOrPrivateKey){
  expect(this._obj).to.be.aJWT();
  jsonwebtoken.verify(this._obj, secretOrPrivateKey);
});

chai.Assertion.addMethod('aJWTEncodingOf', function(expectedObject){
  expect(this._obj).to.be.aJWT();
  expect( jsonwebtoken.decode(this._obj) ).to.deep.equal(expectedObject);
});

chai.Assertion.addMethod('aBase64EncodedString', function(){
  expect(this._obj).to.be.a('string');
  // taken from https://github.com/RGBboy/urlsafe-base64/blob/master/lib/urlsafe-base64.js#L75
  expect(this._obj).to.match(/^[A-Za-z0-9\-_]+$/);
});

chai.Assertion.addMethod('aRecentSecondsFromEpochInteger', function(){
  const now = Math.floor(Date.now() / 1000);
  expect(this._obj).to.be.within(now - 1, now);
});

chai.Assertion.addMethod('aNonce', function(){
  expect(this._obj).to.match(/^[0-9a-f]{64}$/);
});
