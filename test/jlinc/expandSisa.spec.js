'use strict';

const JLINC = require('../../jlinc');
const { generateSisa } = require('../helpers');

describe('JLINC.expandSisa', function() {

  context('when given no arguments', function() {
    it('should throw the error "sisa is required"', function() {
      expect(() => {
        JLINC.expandSisa({});
      }).to.throw('sisa is required');
    });
  });

  context('when given a valid sisa', function() {
    it('should expand the given sisa', function() {
      const { agreement, offeredSisa, sisa, acceptedSisa } = generateSisa();

      expect( JLINC.expandSisa({ sisa }) ).to.deep.equal({
        '@context': sisa['@context'],
        sisaId: sisa.sisaId,
        acceptedSisa: {
          '@context': acceptedSisa['@context'],
          rightsHolderSigType: acceptedSisa.rightsHolderSigType,
          rightsHolderId: acceptedSisa.rightsHolderId,
          rightsHolderSig: acceptedSisa.rightsHolderSig,
          createdAt: acceptedSisa.createdAt,
          offeredSisa: {
            '@context': offeredSisa['@context'],
            dataCustodianSigType: offeredSisa.dataCustodianSigType,
            dataCustodianId: offeredSisa.dataCustodianId,
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
