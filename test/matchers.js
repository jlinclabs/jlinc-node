'use strict';

const { inspect } = require('util');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiMatchPattern = require('chai-match-pattern');
const sinonChai = require('sinon-chai');
const jsonwebtoken = require('jsonwebtoken');
const sodium = require('sodium').api;
const b64 = require('urlsafe-base64');

chai.use(chaiAsPromised);
chai.use(chaiMatchPattern);
chai.use(sinonChai);

global.expect = chai.expect;
global._ = chaiMatchPattern.getLodashModule();

global.console.inspect = function(...args){
  return global.console.log(...args.map(arg => inspect(arg, { showHidden: true, depth: null })));
};

global.console.json = function(...args) {
  return global.console.log(args.map(o => JSON.stringify(o, null, 2)).join("\n"));
};


chai.Assertion.addMethod('aJwt', function(){
  expect(this._obj).to.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/);
});

chai.Assertion.addMethod('aJwtSignedWith', function(secretOrPrivateKey){
  expect(this._obj).to.be.aJwt();
  jsonwebtoken.verify(this._obj, secretOrPrivateKey);
});

chai.Assertion.addMethod('aJwtEncodingOf', function(expectedObject){
  expect(this._obj).to.be.aJwt();
  const decoded = jsonwebtoken.decode(this._obj);
  if (!('iat' in expectedObject)) delete decoded.iat;
  expect( decoded ).to.deep.equal(expectedObject);
});

chai.Assertion.addMethod('aBase64EncodedString', function(){
  expect(this._obj).to.be.a('string');
  // taken from https://github.com/RGBboy/urlsafe-base64/blob/master/lib/urlsafe-base64.js#L75
  expect(this._obj).to.match(/^[A-Za-z0-9\-_]+$/);
});

chai.Assertion.addMethod('aRecentDatetimeInISOFormat', function(){
  const date = new Date(this._obj);
  expect(this._obj).to.equal(date.toISOString());
  const now = Date.now();
  expect(date.getTime()).to.be.within(now - 100, now);
});

chai.Assertion.addMethod('aNonce', function(){
  expect(this._obj).to.match(/^[0-9a-f]{64}$/);
});

chai.Assertion.addMethod('serializable', function(){
  expect(
    JSON.parse(JSON.stringify(this._obj))
  ).to.deep.equal(this._obj);
});

chai.Assertion.addMethod('anEncryptingPublicKey', function(){
  expect(this._obj).to.be.aBase64EncodedString();
  expect(this._obj).to.have.lengthOf(43);
});

chai.Assertion.addMethod('anEncryptingPrivateKey', function(){
  expect(this._obj).to.be.aBase64EncodedString();
  expect(this._obj).to.have.lengthOf(43);
});

chai.Assertion.addMethod('aSigningPublicKey', function(){
  expect(this._obj).to.be.aBase64EncodedString();
  expect(this._obj).to.have.lengthOf(43);
});

chai.Assertion.addMethod('aSigningPrivateKey', function(){
  expect(this._obj).to.be.aBase64EncodedString();
  expect(this._obj).to.have.lengthOf(86);
});

// TODO remove helper?
chai.Assertion.addMethod('aSecret', function(){
  expect(this._obj).to.be.aBase64EncodedString();
  expect(this._obj).to.have.lengthOf(32);
});

chai.Assertion.addMethod('aRegistrationSecret', function(){
  expect(this._obj).to.be.aBase64EncodedString();
  expect(this._obj).to.have.lengthOf(64);
});

chai.Assertion.addMethod('aSigningKeypair', function(){
  const { publicKey, privateKey } = this._obj;
  expect(publicKey ).to.be.aSigningPublicKey();
  expect(privateKey).to.be.aSigningPrivateKey();
  const itemToSign = `${Math.random()} is my favorite number`;
  expect(
    sodium.crypto_sign_open(
      sodium.crypto_sign(
        Buffer.from(itemToSign, 'utf8'),
        b64.decode(privateKey),
      ),
      b64.decode(publicKey)
    ).toString()
  ).to.equal(itemToSign);
});

chai.Assertion.addMethod('anEncryptinKeypair', function(){
  const { publicKey, privateKey } = this._obj;
  expect(publicKey ).to.be.anEncryptingPublicKey();
  expect(privateKey).to.be.anEncryptingPrivateKey();
});

chai.Assertion.addMethod('aJlincDid', function(){
  expect(this._obj).to.match(/^did:jlinc:.*$/);
});

chai.Assertion.addMethod('aJlincEntity', function(){
  const entity = this._obj;
  expect(entity).to.have.all.keys([
    'did',
    'signingPublicKey',
    'signingPrivateKey',
    'encryptingPublicKey',
    'encryptingPrivateKey',
    'secret',
    'registrationSecret',
  ]);
  expect(entity.did).to.be.a('string');
  expect(entity.did).to.be.aJlincDid();
  expect(entity.secret).to.be.aSecret();
  expect(entity.registrationSecret).to.be.aRegistrationSecret();
  expect({
    publicKey:  entity.signingPublicKey,
    privateKey: entity.signingPrivateKey,
  }).to.be.aSigningKeypair();
  expect({
    publicKey:  entity.encryptingPublicKey,
    privateKey: entity.encryptingPrivateKey,
  }).to.be.anEncryptinKeypair();
});


_.mixin({

  isDateString(target){
    return _.isString(target) && target.match(/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/);
  },

  isRecentDatetimeInISOFormat(target){
    expect(target).to.be.aRecentDatetimeInISOFormat();
    return true;
  },

  isJwt(jwt){
    expect(jwt).to.be.aJwt();
    return true;
  },

  isJwtSignedWith(secret){
    return jwt => {
      expect(jwt).to.be.aJwtSignedWith(secret);
      return true;
    };
  },

  isJlincDid(target){
    expect(target).to.be.aJlincDid();
    return true;
  },

  isSigningPublicKey(target){
    expect(target).to.be.aSigningPublicKey();
    return true;
  },

  isSigningPrivateKey(target){
    expect(target).to.be.aSigningPrivateKey();
    return true;
  },

  isEncryptingPublicKey(target){
    expect(target).to.be.anEncryptingPublicKey();
    return true;
  },

  isEncryptingPrivateKey(target){
    expect(target).to.be.anEncryptingPrivateKey();
    return true;
  },

  isNonce(target){
    expect(target).to.be.aNonce();
    return true;
  }

});
