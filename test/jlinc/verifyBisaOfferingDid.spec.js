'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');
const withSinon = require('../helpers/withSinon');

describe('JLINC.verifyBisaOfferingDid', function() {
  withDidServer();
  withSinon();

  context('when missing required arguments', function() {
    it('should throw an error', async function(){
      await expect(
        JLINC.verifyBisaOfferingDid({

        })
      ).to.be.rejectedWith(Error, 'bisaOffering is required');
    });
  });

  context('when given all required arguments', function(){
    context('when a valid bisaOffering', function(){
      it('should call resolve with true', async function(){
        const { bisaOffering } = await this.generateBisaOffering();
        await expect(
          await JLINC.verifyBisaOfferingDid({ bisaOffering })
        ).to.be.true;
      });
      it('should call JLINC.verifyOfferedBisaDataCustodianDid', async function(){
        this.sinon.stub(JLINC, 'validateBisaOffering');
        this.sinon.stub(JLINC, 'verifyPublicKeyIsOwnedByDID');

        const bisaOffering = {
          offeredBisa: {
            offerorDid: 'FAKE_offerorDid',
            offerorPublicKey: 'FAKE_offerorPublicKey',
          }
        };

        await expect(
          await JLINC.verifyBisaOfferingDid({ bisaOffering })
        ).to.be.true;

        expect(JLINC.validateBisaOffering).to.have.been.calledOnce;
        expect(JLINC.validateBisaOffering).to.have.been.calledWith({ bisaOffering});
        expect(JLINC.verifyPublicKeyIsOwnedByDID).to.have.been.calledOnce;
        expect(JLINC.verifyPublicKeyIsOwnedByDID).to.have.been.calledWith({
          did: 'FAKE_offerorDid',
          publicKey: 'FAKE_offerorPublicKey',
        });
      });
    });
    context('when the bisaOffering did is invalid', function(){
      it('should throw an error', async function(){
        const { bisaOffering } = await this.generateBisaOffering();
        bisaOffering.offeredBisa.offerorDid = 'did:jlinc:IcUIumA04iGgLOllGBsk03CcPlw5NfYvBWN1KqDELyk';
        await expect(
          JLINC.verifyBisaOfferingDid({ bisaOffering })
        ).to.be.rejectedWith(JLINC.OfferedBisaVerificationError, 'bisaOffering did is not valid');
      });
    });
  });

});
