'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifySisaEventWasSignedByRightsHolder', function() {
  withDidServer();

  context('when given missing arguments', function() {
    it('should throw an error', async function(){
      const { rightsHolder, sisaEvent } = await this.generateSisaEvent();
      const rightsHolderPublicKey = rightsHolder.signingPublicKey;

      expect(()=>{
        JLINC.verifySisaEventWasSignedByRightsHolder({

        });
      }).to.throw('sisaEvent is required');

      expect(()=>{
        JLINC.verifySisaEventWasSignedByRightsHolder({
          sisaEvent,
        });
      }).to.throw('rightsHolderPublicKey is required');

      expect(()=>{
        JLINC.verifySisaEventWasSignedByRightsHolder({
          sisaEvent,
          rightsHolderPublicKey
        });
      }).to.not.throw();

    });
  });

  context('when given a sisaEvent', function() {
    context('that was signed by the given rightsHolder', function() {
      it('should return true', async function(){
        const { rightsHolder, sisaEvent } = await this.generateSisaEvent();
        expect(
          JLINC.verifySisaEventWasSignedByRightsHolder({
            sisaEvent,
            rightsHolderPublicKey: rightsHolder.signingPublicKey,
          })
        ).to.be.true;
      });
    });
    context('that was NOT signed by the given rightsHolder', function() {
      it('should throw the error "sisaEvent was not signed by the given rightsHolder"', async function(){
        const { sisaEvent } = await this.generateSisaEvent();
        const rightsHolder = await JLINC.createDataCustodian();
        expect(() => {
          JLINC.verifySisaEventWasSignedByRightsHolder({
            sisaEvent,
            rightsHolderPublicKey: rightsHolder.signingPublicKey,
          });
        }).to.throw(JLINC.SisaEventVerificationError, 'sisaEvent was not signed by the given rightsHolder');
      });
    });
  });

});
