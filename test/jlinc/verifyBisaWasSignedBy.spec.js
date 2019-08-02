'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');
const withSinon = require('../helpers/withSinon');

describe('JLINC.verifyBisaWasSignedBy', function() {
  withDidServer();
  withSinon();

  context('when missing required arguments', function() {
    it('should throw an error', async function(){
      expect(()=>{
        JLINC.verifyBisaWasSignedBy({

        });
      }).to.throw(Error, 'bisa is required');

      expect(()=>{
        JLINC.verifyBisaWasSignedBy({
          bisa: {},
        });
      }).to.throw(Error, 'dataCustodian is required');

      expect(()=>{
        JLINC.verifyBisaWasSignedBy({
          bisa: {},
          dataCustodian: {},
        });
      }).to.throw(Error, 'dataCustodian.did is required');

      expect(()=>{
        JLINC.verifyBisaWasSignedBy({
          bisa: {},
          dataCustodian: {
            did: 'xxx',
          },
        });
      }).to.throw(Error, 'dataCustodian.signingPublicKey is required');
    });
  });

  context('when given all required arguments', function(){
    beforeEach(async function(){
      const { offeror, target, bisa } = await this.generateBisa();
      const other = await JLINC.createDataCustodian();
      Object.assign(this, { other, offeror, target, bisa });
    });

    context('when the given dataCustodian is the offeror', function(){
      it('should return true', async function(){
        const { offeror, bisa } = this;
        expect(
          JLINC.verifyBisaWasSignedBy({
            bisa,
            dataCustodian: offeror,
          })
        ).to.be.true;
      });
      context('but their signingPublicKey does not match the bisa signature', function() {
        it('should throw an error', async function(){
          const { offeror, other, bisa } = this;
          expect(()=>{
            JLINC.verifyBisaWasSignedBy({
              bisa,
              dataCustodian: {
                did: offeror.did,
                signingPublicKey: other.signingPublicKey,
              },
            });
          }).to.throw(JLINC.BisaVerificationError, 'bisa was not signed by the given dataCustodian');
        });
      });
    });

    context('when the given dataCustodian is the acceptor', function(){
      it('should return true', async function(){
        const { target, bisa } = this;
        expect(
          JLINC.verifyBisaWasSignedBy({
            bisa,
            dataCustodian: target,
          })
        ).to.be.true;
      });
      context('but their signingPublicKey does not match the bisa signature', function() {
        it('should throw an error', async function(){
          const { target, other, bisa } = this;
          expect(()=>{
            JLINC.verifyBisaWasSignedBy({
              bisa,
              dataCustodian: {
                did: target.did,
                signingPublicKey: other.signingPublicKey,
              },
            });
          }).to.throw(JLINC.BisaVerificationError, 'bisa was not signed by the given dataCustodian');
        });
      });
    });

    context('when the given dataCustodian did NOT sign the bisa', function(){
      it('should throw an error', async function(){
        const { other, bisa } = this;
        expect(()=>{
          JLINC.verifyBisaWasSignedBy({
            bisa,
            dataCustodian: other,
          });
        }).to.throw(JLINC.BisaVerificationError, 'bisa was not signed by the given dataCustodian');
      });
    });
  });

});
