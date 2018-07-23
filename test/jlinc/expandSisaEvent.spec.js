'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.expandSisaEvent', function() {
  context('when given no arguments', function() {
    it('should throw the error "sisa is required"', function() {
      expect(() => {
        JLINC.expandSisaEvent({});
      }).to.throw('sisaEvent is required');
    });
  });
  context('when given a valid sisaEvent', function() {
    it('should expand the given sisa', function() {
      expect(
        JLINC.expandSisaEvent({
          sisaEvent: {
            '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
            audit: {
              eventType: 'dataEvent',
              sisaId: '-fnw80PsQrQjuHkhLQiDkpDA0UMpMU3yLWqR2ddydig',
              eventId: '2xZZWwbSI0UNNTRfYMxQFuHlo8Mr-wR48OO1K5ovgIs',
              timestamp: 1531872606,
              previousId: null,
              rightsHolderSigType: JLINC.signatureType,
              rightsHolderId: '0nhZp7v2rAa2huo5cIur-KkpB5yTgB64D-p6aKS8EqU',
              rightsHolderSig: 'iTPjBBdpQqz5RG7jb90VG7Z6BM0R9vIaHtK_eH-ttlolfAWEO-FL6vS8MdlMQKa8iQzyYrF0HbtuRyujAgdYANsWWVsG0iNFDTU0X2DMUBbh5aPDK_sEePDjtSuaL4CL',
            },
            eventJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hbF9kYXRhIjp7ImZpcnN0bmFtZSI6IkFsaWNlIiwibGFzdG5hbWUiOiJNY0VuZHVzZXIifSwiaWF0IjoxNTMxODcyNjA2fQ.VR9Fdmv88keOGxrwu5_yOdw0-GkLGkG6FBQeNrTaB2Q',
          },
        })
      ).to.deep.equal({
        "@context": 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        audit: {
          eventId: '2xZZWwbSI0UNNTRfYMxQFuHlo8Mr-wR48OO1K5ovgIs',
          eventType: 'dataEvent',
          previousId: null,
          rightsHolderId: '0nhZp7v2rAa2huo5cIur-KkpB5yTgB64D-p6aKS8EqU',
          rightsHolderSig: 'iTPjBBdpQqz5RG7jb90VG7Z6BM0R9vIaHtK_eH-ttlolfAWEO-FL6vS8MdlMQKa8iQzyYrF0HbtuRyujAgdYANsWWVsG0iNFDTU0X2DMUBbh5aPDK_sEePDjtSuaL4CL',
          rightsHolderSigType: JLINC.signatureType,
          sisaId: '-fnw80PsQrQjuHkhLQiDkpDA0UMpMU3yLWqR2ddydig',
          timestamp: 1531872606,
        },
        event: {
          iat: 1531872606,
          personal_data: {
            firstname: 'Alice',
            lastname: 'McEnduser',
          },
        },
      });
    });
  });
  context('when given a valid acknowledgedSisaEvent', function() {
    it('should expand the given sisa', function() {
      expect(
        JLINC.expandSisaEvent({
          sisaEvent: {
            '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
            audit: {
              eventType: 'dataEvent',
              sisaId: 'INe_nvaG1ChPvnRkEpZ7uErvPyMGdn0mmQWSp9QGD_o',
              eventId: 'jGepv3eBBp4bQp_0nGvgV-S54lVAh_OPeFSDYy7vffE',
              timestamp: 1532367780,
              previousId: null,
              rightsHolderSigType: 'sha256:ed25519',
              rightsHolderId: 'UdZ5ajjYe1YNCxqy89l5GU34SKprWUtz1bEEHj1GlVo',
              rightsHolderSig: 'CakNlzFnSI8oPWJUcG92y-nFyEw2zxhF_ThiG3QD5D5JKt5do4wAPObycRlpjlEPN-tqTQGiSAKu5O0N1NKIAIxnqb93gQaeG0Kf9Jxr4FfkueJVQIfzj3hUg2Mu733x',
              dataCustodianSigType: 'sha256:ed25519',
              dataCustodianId: 'ArZSJnfRbMXs_lXECmARtyTQoeEQCPoYVvOYHXP9cQc',
              dataCustodianSig: '3oddqwev18whbUVLivkjjTyh8DL-obopOp7etTH-B8y65nyjnVYStBSfEb7mMukNLT93d4_nqIDFksHY1ekFDYxnqb93gQaeG0Kf9Jxr4FfkueJVQIfzj3hUg2Mu733x',
            },
            eventJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hbF9kYXRhIjp7ImZpcnN0bmFtZSI6IkFsaWNlIiwibGFzdG5hbWUiOiJNY0VuZHVzZXIifSwiaWF0IjoxNTMyMzY3NzgwfQ.OzVEHRM3GKW1A_V4qzzI2flS_jaqdsE2nDsQsUYDHeI',
          },
        })
      ).to.deep.equal({
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        audit: {
          eventType: 'dataEvent',
          sisaId: 'INe_nvaG1ChPvnRkEpZ7uErvPyMGdn0mmQWSp9QGD_o',
          eventId: 'jGepv3eBBp4bQp_0nGvgV-S54lVAh_OPeFSDYy7vffE',
          timestamp: 1532367780,
          previousId: null,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderId: 'UdZ5ajjYe1YNCxqy89l5GU34SKprWUtz1bEEHj1GlVo',
          rightsHolderSig: 'CakNlzFnSI8oPWJUcG92y-nFyEw2zxhF_ThiG3QD5D5JKt5do4wAPObycRlpjlEPN-tqTQGiSAKu5O0N1NKIAIxnqb93gQaeG0Kf9Jxr4FfkueJVQIfzj3hUg2Mu733x',
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: 'ArZSJnfRbMXs_lXECmARtyTQoeEQCPoYVvOYHXP9cQc',
          dataCustodianSig: '3oddqwev18whbUVLivkjjTyh8DL-obopOp7etTH-B8y65nyjnVYStBSfEb7mMukNLT93d4_nqIDFksHY1ekFDYxnqb93gQaeG0Kf9Jxr4FfkueJVQIfzj3hUg2Mu733x',
        },
        event: {
          personal_data: {
            firstname: 'Alice',
            lastname: 'McEnduser',
          },
          iat: 1532367780,
        },
      });
    });
  });
});
