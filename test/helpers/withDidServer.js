'use strict';

const debug = require('debug')('withDidServer');
const path = require('path');
const request = require('request-promise');
const { spawn, execSync } = require('child_process');
const JLINC = require('../../jlinc');

const didServerHelpers = {

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
      env: {
        DATABASE_URL: `postgres://root@localhost:26257/${this.db}?sslmode=disable`,
        URL: this.url,
        PORT: `${this.port}`,
        PUBLIC_KEY:  'xRliWWNCToxApYwfRFf8hIUf2x7E6sn2MmIfwAJzokI',
        PRIVATE_KEY: '8hwb4iOJ05LqzuhAi4r8sHccPh_HgkOd_ugbAGhZE74',
        CONTEXT: 'https://w3id.org/did/v1',
      },
    };
  },

  async setup(){
    execSync('./scripts/db-reset', {
      ...this.execOptions(),
      silent: true,
    });
  },

  async start(){
    if (this.childProcess) return;
    await this.setup();
    this.childProcess = spawn('./scripts/start', [], {
      ...this.execOptions(),
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    this.childProcess.stdout.on('data', chunk => { debug(`${chunk}`); });
    this.childProcess.stderr.on('data', chunk => { debug(`${chunk}`); });
    await tryForXMilliseconds(() => this.getMasterPublicKey());
  },

  async reset(){
    execSync(
      `cockroach sql --insecure --execute="SET database = ${this.db}; TRUNCATE didstore"`
    );
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
  },

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
