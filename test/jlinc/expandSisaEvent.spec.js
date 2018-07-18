'use strict';

require('../setup');
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
});
