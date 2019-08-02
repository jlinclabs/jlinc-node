'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.verifyBisaAcceptorDid', function() {
  withDidServer();

  context('when missing required arguments', function() {
    it('should throw an error', async function(){
      await expect(
        JLINC.verifyBisaAcceptorDid({

        })
      ).to.be.rejectedWith('bisa is required');
    });
  });

  context('when the acceptor did is verifiable', function(){
    beforeEach(async function(){
      const { bisa } = await this.generateBisa();
      Object.assign(this, { bisa });
    });
    it('should resolve with true', async function(){
      const { bisa } = this;
      await expect(
        JLINC.verifyBisaAcceptorDid({ bisa })
      ).to.eventually.be.true;
    });
  });

  context('when the acceptor did is not verifiable', function(){
    beforeEach(async function(){
      const { bisa, target } = await this.generateBisa();
      const other = await JLINC.createDataCustodian();
      const acceptedBisa = JLINC.decodeJwt({ jwt: bisa.acceptedBisaJwt });
      const badBisa = {
        ...bisa,
        acceptedBisaJwt: JLINC.createSignedJwt({
          itemToSign: {
            ...acceptedBisa,
            acceptorDid: target.did,
            acceptorPublicKey: other.signingPublicKey,
          },
          secret: target.secret,
        }),
      };
      Object.assign(this, { bisa: badBisa });
    });
    it('should reject a JLINC.BisaVerificationError', async function(){
      const { bisa } = this;
      await expect(
        JLINC.verifyBisaAcceptorDid({ bisa })
      ).to.be.rejectedWith(JLINC.BisaVerificationError, 'bisa.acceptedBisa.acceptorDid is not the owner of bisa.acceptedBisa.acceptorPublicKey');
    });
  });

});
