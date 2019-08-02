'use strict';

const path = require('path');
const request = require('request-promise');
const { spawn, execSync } = require('child_process');
const JLINC = require('../../jlinc');
const PUBLIC_KEY = 'xRliWWNCToxApYwfRFf8hIUf2x7E6sn2MmIfwAJzokI';
const PRIVATE_KEY = '8hwb4iOJ05LqzuhAi4r8sHccPh_HgkOd_ugbAGhZE74';
const DATABASE_HOST = process.env.DATABASE_HOST || 'postgres://localhost';

const didServerHelpers = {
  DID_SERVER_PUBLIC_KEY: PUBLIC_KEY,
  DID_SERVER_PRIVATE_KEY: PRIVATE_KEY,

  async getDidServerIndex() {
    return await didServer.request('get', '/');
  },

  async generateSisaOffering() {
    const dataCustodian = await JLINC.createDataCustodian();
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
    const { offeredSisa } = sisaOffering;
    return {
      dataCustodian,
      sisaOffering,
      offeredSisa,
    };
  },

  async generateSisa() {
    const {
      dataCustodian,
      sisaOffering,
      offeredSisa,
    } = await this.generateSisaOffering();
    const agreement = JLINC.decodeJwt({ jwt: sisaOffering.offeredSisa.agreementJwt });
    const rightsHolder = await JLINC.createRightsHolder();
    const sisa = JLINC.acceptSisa({ sisaOffering, rightsHolder });
    const acceptedSisa = JLINC.decodeJwt({ jwt: sisa.acceptedSisaJwt });
    const { offeredSisaJwt } = acceptedSisa;
    return {
      dataCustodian,
      agreement,
      offeredSisa,
      sisaOffering,
      acceptedSisa,
      offeredSisaJwt,
      rightsHolder,
      sisa,
    };
  },

  async generateSisaEvent() {
    const {
      dataCustodian,
      agreement,
      offeredSisa,
      sisaOffering,
      acceptedSisa,
      offeredSisaJwt,
      rightsHolder,
      sisa,
    } = await this.generateSisa();

    const event = {
      personal_data: {
        firstname: 'Larry',
        lastname: 'David',
      },
    };

    const sisaEvent = JLINC.createSisaEvent({
      eventType: 'dataEvent',
      event,
      sisa: sisa,
      latestSisaEvent: null,
      rightsHolder,
    });

    return {
      dataCustodian,
      agreement,
      offeredSisa,
      sisaOffering,
      acceptedSisa,
      offeredSisaJwt,
      rightsHolder,
      sisa,
      sisaEvent,
      event,
    };
  },

  async generateAcknowledgedSisaEvent() {
    const {
      dataCustodian,
      agreement,
      offeredSisa,
      sisaOffering,
      acceptedSisa,
      offeredSisaJwt,
      rightsHolder,
      sisa,
      sisaEvent,
      event,
    } = await this.generateSisaEvent();

    const acknowledgedSisaEvent = JLINC.acknowledgeSisaEvent({
      sisa,
      dataCustodian,
      sisaEvent,
    });

    return {
      dataCustodian,
      agreement,
      offeredSisa,
      sisaOffering,
      acceptedSisa,
      offeredSisaJwt,
      rightsHolder,
      sisa,
      sisaEvent,
      event,
      acknowledgedSisaEvent,
    };
  },







  async generateBisaOffering() {
    const offeror = await JLINC.createDataCustodian();
    const target = await JLINC.createDataCustodian();
    const bisaOffering = JLINC.createBisaOffering({
      dataCustodian: offeror,
      targetAcceptorDid: target.did,
    });
    const { offeredBisa } = bisaOffering;
    return {
      offeror,
      target,
      bisaOffering,
      offeredBisa,
    };
  },

  async generateBisa() {
    const {
      offeror,
      target,
      bisaOffering,
      offeredBisa,
    } = await this.generateBisaOffering();
    const agreement = JLINC.decodeJwt({ jwt: bisaOffering.offeredBisa.agreementJwt });
    const bisa = JLINC.acceptBisa({
      bisaOffering,
      dataCustodian: target,
    });
    const expandedBisa = JLINC.expandBisa({ bisa });
    const acceptedBisa = JLINC.decodeJwt({ jwt: bisa.acceptedBisaJwt });
    return {
      offeror,
      target,
      bisaOffering,
      offeredBisa,
      agreement,
      bisa,
      expandedBisa,
      acceptedBisa,
    };
  },

  async generateBisaEvent(){
    const {
      offeror,
      target,
      bisaOffering,
      offeredBisa,
      agreement,
      bisa,
      expandedBisa,
      acceptedBisa,
    } = await this.generateBisa();

    const event = {
      canShowRelationshipPublicly: true,
    };

    const bisaEvent = JLINC.createBisaEvent({
      eventType: 'permissionEvent',
      event,
      bisa,
      latestBisaEvent: null,
      dataCustodian: offeror,
    });

    return {
      offeror,
      target,
      bisaOffering,
      offeredBisa,
      agreement,
      bisa,
      expandedBisa,
      acceptedBisa,
      bisaEvent,
      event,
    };
  },

  async generateAcknowledgedBisaEvent(){
    const {
      offeror,
      target,
      bisaOffering,
      offeredBisa,
      agreement,
      bisa,
      expandedBisa,
      acceptedBisa,
      bisaEvent,
      event,
    } = await this.generateBisaEvent();

    const acknowledgedBisaEvent = JLINC.acknowledgeBisaEvent({
      bisa,
      bisaEvent,
      dataCustodian: target,
    });

    return {
      offeror,
      target,
      bisaOffering,
      offeredBisa,
      agreement,
      bisa,
      expandedBisa,
      acceptedBisa,
      bisaEvent,
      event,
      acknowledgedBisaEvent,
    };
  },

};

module.exports = function withDidServer(){

  before(async function() {
    Object.assign(this, didServerHelpers);
    await didServer.start();
    JLINC.DIDClient.didServerUrl = didServer.url+'/'; // FML
  });

  beforeEach(async function(){
    await didServer.reset();
  });

};

const didServer = {
  port: 3044,
  url: 'http://localhost:3044',
  db: 'jlinc_did_server_test',
  path: path.resolve(__dirname, '../../didserver'),

  execOptions(){
    return {
      shell: true,
      cwd: this.path,
      stdio: ['ignore', 'ignore', 'inherit'],
      env: {
        ...process.env,
        DATABASE_URL: `${DATABASE_HOST}/${this.db}?sslmode=disable`,
        URL: this.url,
        PORT: `${this.port}`,
        PUBLIC_KEY,
        PRIVATE_KEY,
        CONTEXT: 'https://w3id.org/did/v1',
      },
    };
  },

  execScript(script){
    return execSync(`${this.path}/scripts/${script}`, this.execOptions());
  },

  async setup(){
    this.execScript('db-setup');
  },

  async start(){
    if (this.childProcess) return;
    await this.setup();
    this.childProcess = spawn(`${this.path}/scripts/start`, [], this.execOptions());
    await tryForXMilliseconds(() => this.getMasterPublicKey());
  },

  async reset(){
    this.execScript('db-reset');
  },

  async stop(){
    if (this.childProcess) this.childProcess.kill('SIGINT');
  },

  async request(method, path){
    return await request.get({
      method,
      uri: `${this.url}${path}`,
      json: true,
    });
  },

  async getMasterPublicKey(){
    const { masterPublicKey } = await this.request('get', '/');
    return masterPublicKey;
  }
};

function onExit(){ didServer.stop(); }
process.on('exit', onExit);
process.on('SIGINT', onExit);
process.on('SIGUSR1', onExit);
process.on('SIGUSR2', onExit);

const now = () => (new Date()).getTime();

async function tryForXMilliseconds(functionToTry, timeLimit = 100) {
  const start = now();
  const trier = async function(){
    try {
      return await functionToTry();
    } catch (error) {
      const timeElapsed = now() - start;
      if (timeElapsed >= timeLimit) throw error;
      return await trier();
    }
  };
  return await trier();
}
