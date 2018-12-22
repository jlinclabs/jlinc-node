'use strict';

const JLINC = require('../../jlinc');
const withDidServer = require('../helpers/withDidServer');

describe('JLINC.expandSisa', function() {
  withDidServer();

  context('when given no arguments', function() {
    it('should throw the error "sisa is required"', function() {
      expect(() => {
        JLINC.expandSisa({});
      }).to.throw('sisa is required');
    });
  });

  context('when given a valid sisa', function() {
    before(async function() {
      const { agreement, offeredSisa, sisa, acceptedSisa } = await this.generateSisa();
      Object.assign(this, { agreement, offeredSisa, sisa, acceptedSisa });
    });

    it('should expand the given sisa', function() {
      const { agreement, offeredSisa, sisa, acceptedSisa } = this;
      expect( JLINC.expandSisa({ sisa }) ).to.deep.equal({
        '@context': sisa['@context'],
        sisaId: sisa.sisaId,
        acceptedSisa: {
          '@context': acceptedSisa['@context'],
          rightsHolderSigType: acceptedSisa.rightsHolderSigType,
          rightsHolderDid: acceptedSisa.rightsHolderDid,
          rightsHolderPublicKey: acceptedSisa.rightsHolderPublicKey,
          rightsHolderSig: acceptedSisa.rightsHolderSig,
          createdAt: acceptedSisa.createdAt,
          offeredSisa: {
            '@context': offeredSisa['@context'],
            dataCustodianSigType: offeredSisa.dataCustodianSigType,
            dataCustodianDid: offeredSisa.dataCustodianDid,
            dataCustodianPublicKey: offeredSisa.dataCustodianPublicKey,
            dataCustodianSig: offeredSisa.dataCustodianSig,
            createdAt: offeredSisa.createdAt,
            agreement: {
              '@context': agreement['@context'],
              jlincId: agreement.jlincId,
              agreementURI: agreement.agreementURI,
            }
          }
        }
      });
    });
  });

});
