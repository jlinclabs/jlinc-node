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
              sisaId: 'pMpFMB85-l5EONupfkGw7JJSr50WQz9d5tmkHu5HvBs',
              eventId: 'rKU1HAuwB5iOYzHiQh8SU_7lDEbPkW1VWKMZfzm_QRc',
              createdAt: 1532454130878,
              previousId: null,
              rightsHolderSigType: 'sha256:ed25519',
              rightsHolderId: 'zBHx-bmRzkg9zhdYxFA1D-CZhnpRCvOCfCkQfCwp9t8',
              rightsHolderSig: 'cgXiVP8ujkSnMhtlotSUkjNTv-PGO75tMEJn80DMir5Fs4i0hmsp7Gx6Ow9LPhO_Fuqajpr_mOyXtrUFEG85BaylNRwLsAeYjmMx4kIfElP-5QxGz5FtVVijGX85v0EX',
            },
            eventJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hbF9kYXRhIjp7ImZpcnN0bmFtZSI6IkFsaWNlIiwibGFzdG5hbWUiOiJNY0VuZHVzZXIifX0.6auLd1aYLBrpPPqMy9GoM4Q96PybL65pDALZB4RYdHI'
          },
        })
      ).to.deep.equal({
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        audit: {
          eventType: 'dataEvent',
          sisaId: 'pMpFMB85-l5EONupfkGw7JJSr50WQz9d5tmkHu5HvBs',
          eventId: 'rKU1HAuwB5iOYzHiQh8SU_7lDEbPkW1VWKMZfzm_QRc',
          createdAt: 1532454130878,
          previousId: null,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderId: 'zBHx-bmRzkg9zhdYxFA1D-CZhnpRCvOCfCkQfCwp9t8',
          rightsHolderSig: 'cgXiVP8ujkSnMhtlotSUkjNTv-PGO75tMEJn80DMir5Fs4i0hmsp7Gx6Ow9LPhO_Fuqajpr_mOyXtrUFEG85BaylNRwLsAeYjmMx4kIfElP-5QxGz5FtVVijGX85v0EX',
        },
        event: {
          personal_data: {
            firstname: 'Alice',
            lastname: 'McEnduser',
          }
        }
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
              sisaId: 'pMpFMB85-l5EONupfkGw7JJSr50WQz9d5tmkHu5HvBs',
              eventId: 'rKU1HAuwB5iOYzHiQh8SU_7lDEbPkW1VWKMZfzm_QRc',
              createdAt: 1532454130878,
              previousId: null,
              rightsHolderSigType: 'sha256:ed25519',
              rightsHolderId: 'zBHx-bmRzkg9zhdYxFA1D-CZhnpRCvOCfCkQfCwp9t8',
              rightsHolderSig: 'cgXiVP8ujkSnMhtlotSUkjNTv-PGO75tMEJn80DMir5Fs4i0hmsp7Gx6Ow9LPhO_Fuqajpr_mOyXtrUFEG85BaylNRwLsAeYjmMx4kIfElP-5QxGz5FtVVijGX85v0EX',
              dataCustodianSigType: 'sha256:ed25519',
              dataCustodianId: 'K4axfYGDYEMx9gKfjDLQmrRlX2IzY7Wz8sRO_4PFLKY',
              dataCustodianSig: 'uad7eGAGoFZiOkzXSQAVtWs6IHzUB5Sxe4c1SXJ_Kgtsfg8GiRbOGQf-IzmtR-KJBiSB1zbtVzkOpRI0cqQ7AaylNRwLsAeYjmMx4kIfElP-5QxGz5FtVVijGX85v0EX',
            },
            eventJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hbF9kYXRhIjp7ImZpcnN0bmFtZSI6IkFsaWNlIiwibGFzdG5hbWUiOiJNY0VuZHVzZXIifX0.6auLd1aYLBrpPPqMy9GoM4Q96PybL65pDALZB4RYdHI',
          },
        })
      ).to.deep.equal({
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        audit: {
          eventType: 'dataEvent',
          sisaId: 'pMpFMB85-l5EONupfkGw7JJSr50WQz9d5tmkHu5HvBs',
          eventId: 'rKU1HAuwB5iOYzHiQh8SU_7lDEbPkW1VWKMZfzm_QRc',
          createdAt: 1532454130878,
          previousId: null,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderId: 'zBHx-bmRzkg9zhdYxFA1D-CZhnpRCvOCfCkQfCwp9t8',
          rightsHolderSig: 'cgXiVP8ujkSnMhtlotSUkjNTv-PGO75tMEJn80DMir5Fs4i0hmsp7Gx6Ow9LPhO_Fuqajpr_mOyXtrUFEG85BaylNRwLsAeYjmMx4kIfElP-5QxGz5FtVVijGX85v0EX',
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: 'K4axfYGDYEMx9gKfjDLQmrRlX2IzY7Wz8sRO_4PFLKY',
          dataCustodianSig: 'uad7eGAGoFZiOkzXSQAVtWs6IHzUB5Sxe4c1SXJ_Kgtsfg8GiRbOGQf-IzmtR-KJBiSB1zbtVzkOpRI0cqQ7AaylNRwLsAeYjmMx4kIfElP-5QxGz5FtVVijGX85v0EX',
        },
        event: {
          personal_data: {
            firstname: 'Alice',
            lastname: 'McEnduser',
          }
        }
      });
    });
  });
});
