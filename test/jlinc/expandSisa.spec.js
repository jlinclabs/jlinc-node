'use strict';

const JLINC = require('../../jlinc');

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
      expect(
        JLINC.expandSisa({
          sisa: {
            '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
            acceptedSisaJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAY29udGV4dCI6Imh0dHBzOi8vcHJvdG9jb2wuamxpbmMub3JnL2NvbnRleHQvamxpbmMtdjUuanNvbmxkIiwib2ZmZXJlZFNpc2FKd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmNISnZkRzlqYjJ3dWFteHBibU11YjNKbkwyTnZiblJsZUhRdmFteHBibU10ZGpVdWFuTnZibXhrSWl3aVlXZHlaV1Z0Wlc1MFNuZDBJam9pWlhsS2FHSkhZMmxQYVVwSlZYcEpNVTVwU1hOSmJsSTFZME5KTmtscmNGaFdRMG81TG1WNVNrRlpNamwxWkVkV05HUkRTVFpKYldnd1pFaENlazlwT0haalNFcDJaRWM1YW1JeWQzVmhiWGh3WW0xTmRXSXpTbTVNTWs1MlltNVNiR1ZJVVhaaGJYaHdZbTFOZEdScVZYVmhiazUyWW0xNGEwbHBkMmxoYlhod1ltMU9TbHBEU1RaSmJVVTFXWHBhYVZwcVJUSk9WR2Q2VDFkSmVWcEViR3haVkZVeVdrZFZlVTVVUlhwT1YwWm9UbFJCTWxsNlFYaE9SMDB5VGxSR2JWbHFXbXhhYlZVMFdtcEZkMDVxV1RKTlJFSnFUMFJqTlU1dFNUVlpiVmxwVEVOS2FGb3pTbXhhVnpGc1ltNVNWbFZyYTJsUGFVcHZaRWhTZDJONmIzWk1NMDV3WXpKRmRXRnRlSEJpYlUxMVlqTktia3d6V1hoTU1taE9aREJTZGxWWVNteFVNMHBVVVZaS01HRlZPVWhQUm1oNFpEQTVlazR6Y0haaVIzUmhWVzVDUkZSSFNrdE5WVkp0V1c1Wk5XRjZVV2xtVVM1cVJuUnpjMDlWVVRCcGVqaHRVVk5ZVFhRNVh6VnNabHB4UjFkbk5XdEtRVVEwVmxKVU5UZEljRVpySWl3aVpHRjBZVU4xYzNSdlpHbGhibE5wWjFSNWNHVWlPaUp6YUdFeU5UWTZaV1F5TlRVeE9TSXNJbVJoZEdGRGRYTjBiMlJwWVc1SlpDSTZJbWRpVlZCTFVWSTNlR2RXYzFob05qRkVhWHBYTjE5TVYycDRWMEpWV2xOclh5MURabmN6TkVseU1EUWlMQ0prWVhSaFEzVnpkRzlrYVdGdVUybG5Jam9pTkd0WWNIZEpTbTV4VjNJNVN6WktMVGRuZWs1Mk5IbExPSGRWYmtkaGNqSjRZelJMTWxaalRreE9WRUZpTUdkTFFtZDJSemxwUW5CMVNHbExjbDlXY1hSTExXVnNYMDh4ZWpZeVMwbEVXalZ4UzNSbVFWVkJObTFhZW5GcVZVMUhaVEZ5TVc5aVluSktUaTFzUW14dVZrcHVhVFJsYVU5YVVXRjNiMHBLY3pRaUxDSnZabVpsY21Wa1FYUWlPakUxTXpJME5USTRNalV3T1RSOS45Y0R1bkM4WFp1X0ZIV0hjWUg1cENlUkZQbHNaN2ROR2l4bm9SRFNmZzhRIiwicmlnaHRzSG9sZGVyU2lnVHlwZSI6InNoYTI1NjplZDI1NTE5IiwicmlnaHRzSG9sZGVySWQiOiJjUDFRYmEyZTgxZGN3dThHbElJbHdLaEl4dFdpTUpNM1M3b1dtd3NHaDVRIiwicmlnaHRzSG9sZGVyU2lnIjoiQmppUmZSZ3BZemIxaENoeF9jRXNXVF9vUFNQUk9raEtvV1Q3RXFTWHdRaC10Y0hBWVpDbUdWX2UtMFR6VkZETE9pTGJ2ZC1JTXNqd3ZBWmIycHA2QWg3YmhRZk1VYkpiendFTm92NkNVc0xnR0trd2R5aFJqTi1oYjY3eUZZU2ciLCJhY2NlcHRlZEF0IjoxNTMyNDUyODI1MDk0fQ.a38IZl4yYW2Xfzs1ZF6nEmQm4v3E6EhGo1xDoXO6lHE',
            sisaId: '6Vmv-egqUJujntX_0TvOhiL9oaU2zZGOmU1RotbfCd0',
          },
        })
      ).to.deep.equal({
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        sisaId: '6Vmv-egqUJujntX_0TvOhiL9oaU2zZGOmU1RotbfCd0',
        acceptedSisa: {
          '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderId: 'cP1Qba2e81dcwu8GlIIlwKhIxtWiMJM3S7oWmwsGh5Q',
          rightsHolderSig: 'BjiRfRgpYzb1hChx_cEsWT_oPSPROkhKoWT7EqSXwQh-tcHAYZCmGV_e-0TzVFDLOiLbvd-IMsjwvAZb2pp6Ah7bhQfMUbJbzwENov6CUsLgGKkwdyhRjN-hb67yFYSg',
          acceptedAt: 1532452825094,
          offeredSisa: {
            '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianId: 'gbUPKQR7xgVsXh61DizW7_LWjxWBUZSk_-Cfw34Ir04',
            dataCustodianSig: '4kXpwIJnqWr9K6J-7gzNv4yK8wUnGar2xc4K2VcNLNTAb0gKBgvG9iBpuHiKr_VqtK-el_O1z62KIDZ5qKtfAUA6mZzqjUMGe1r1obbrJN-lBlnVJni4eiOZQawoJJs4',
            offeredAt: 1532452825094,
            agreement: {
              '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
              jlincId: 'a9c6bf165839b2d9ea56de25135aa506c014c651fb6efe8f1066600c8796b9bf',
              agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
            }
          }
        }
      });
    });
  });
});
