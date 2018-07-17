'use strict';

require('../setup');
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
            '@context': JLINC.contextUrl,
            acceptedSisaJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAY29udGV4dCI6Imh0dHBzOi8vcHJvdG9jb2wuamxpbmMub3JnL2NvbnRleHQvamxpbmMtdjUuanNvbmxkIiwib2ZmZXJlZFNpc2FKd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmNISnZkRzlqYjJ3dWFteHBibU11YjNKbkwyTnZiblJsZUhRdmFteHBibU10ZGpVdWFuTnZibXhrSWl3aVlXZHlaV1Z0Wlc1MFNuZDBJam9pWlhsS2FHSkhZMmxQYVVwSlZYcEpNVTVwU1hOSmJsSTFZME5KTmtscmNGaFdRMG81TG1WNVNrRlpNamwxWkVkV05HUkRTVFpKYldnd1pFaENlazlwT0haalNFcDJaRWM1YW1JeWQzVmhiWGh3WW0xTmRXSXpTbTVNTWs1MlltNVNiR1ZJVVhaaGJYaHdZbTFOZEdScVZYVmhiazUyWW0xNGEwbHBkMmxoYlhod1ltMU9TbHBEU1RaSmJVbDNXbTFHYlZreVVtcE5hbHBwVFdwWk0wOUhVbXhQVkdScFdrUk9iRnB0V1hkUFJHc3hUVVJTYlZscVJtaFphbEYzVFdwbmVWcEhWVEphVjFrd1RucEZlRnBVV210T01rWm9Ua2RGTlZwVWEzZE9ha1ZwVEVOS2FGb3pTbXhhVnpGc1ltNVNWbFZyYTJsUGFVcHZaRWhTZDJONmIzWk1NMDV3WXpKRmRXRnRlSEJpYlUxMVlqTktia3d6V1hoTU1taE9aREJTZGxWWVNteFVNMHBVVVZaS01HRlZPVWhQUm1oNFpEQTVlazR6Y0haaVIzUmhWVzVDUkZSSFNrdE5WVkp0V1c1Wk5XRjZVV2xNUTBwd1dWaFJhVTlxUlRGTmVrVTBUbnBGTkU5VVdqa3VVMmRyUVhsUFVsb3piVlo1TVdsd1FsWjFORUpIWWs1bWNVZDFiVlJHYzFwMFExRTJabnBTWWtZM1dTSXNJbVJoZEdGRGRYTjBiMlJwWVc1VGFXZFVlWEJsSWpvaWMyaGhNalUyT21Wa01qVTFNVGtpTENKa1lYUmhRM1Z6ZEc5a2FXRnVTV1FpT2lKeGNHbHhVSE4yWDFGMlpXSTNRblo2V1UxV1ZrdzRiM0JxVUhwUVVqSXRRVlIxU2tjdFRUWXhUbGMwSWl3aVpHRjBZVU4xYzNSdlpHbGhibE5wWnlJNkluSnBiVU5NVURaWlpqWjVXRll6UWtadU5HNU9PRGN4U2xocVdGTjFNWEJLYTJodFpERkJPVmR6UjBrd1pFMVZaa1pFV0ZSSlVVWXhPRXBVTmtSMWVHVXpZWEJDYVU1RmJXZHJjemRLUXpaRmVqY3hla001Vmw5YVNVazFWWE42U21VMmRrbEdOa2MwUjI1V0xUWlFWMGRRUVROaGN6YzJYME5WTjFjNFZGOTRJaXdpYVdGMElqb3hOVE14T0RjeE9EazJmUS5Ba1lBalIySV9DWGp0V0daTWF2bExmaXFSc2ZXTHotUXhFZHVvQ3RYRGxjIiwicmlnaHRzSG9sZGVyU2lnVHlwZSI6InNoYTI1NjplZDI1NTE5IiwicmlnaHRzSG9sZGVySWQiOiJWeTV1ODIyRHpaRlNOVDRpbHUyYWFuRkp3ZWg4VG9qaC1hTW1NamtzdTU4IiwicmlnaHRzSG9sZGVyU2lnIjoiQmtoQ2VMbG9CeHpUa0JZeDBucWE1djhxZ21nOFp1N1RtaFlwRUlTT3dXT1gxczlBcENmbWktT2NRbXdYRjlSNjRGNy1kNXppRWNadkdQel8wZzJ3QVZBdERZQ195eUloNFRlMGVYR1c0bUQ3ODNsZHh6c1BQcHNVZzF5ckJJeXkiLCJpYXQiOjE1MzE4NzE4OTZ9.YIaazJ6Sp2tYxrpiYnZSdCw0dmWF90ZzeJYQNCQqvz0',
            sisaId: 'lVFbdplhh0IvZ3pnJU41d9NDKmc3PFyp31jiZuPTXqM'
          },
        })
      ).to.deep.equal({
        '@context': JLINC.contextUrl,
        sisaId: 'lVFbdplhh0IvZ3pnJU41d9NDKmc3PFyp31jiZuPTXqM',
        acceptedSisa: {
          '@context': JLINC.contextUrl,
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderId: 'Vy5u822DzZFSNT4ilu2aanFJweh8Tojh-aMmMjksu58',
          rightsHolderSig: 'BkhCeLloBxzTkBYx0nqa5v8qgmg8Zu7TmhYpEISOwWOX1s9ApCfmi-OcQmwXF9R64F7-d5ziEcZvGPz_0g2wAVAtDYC_yyIh4Te0eXGW4mD783ldxzsPPpsUg1yrBIyy',
          iat: 1531871896,
          offeredSisa: {
            '@context': JLINC.contextUrl,
            dataCustodianSigType: 'sha256:ed25519',
            dataCustodianId: 'qpiqPsv_Qveb7BvzYMVVL8opjPzPR2-ATuJG-M61NW4',
            dataCustodianSig: 'rimCLP6Yf6yXV3BFn4nN871JXjXSu1pJkhmd1A9WsGI0dMUfFDXTIQF18JT6Duxe3apBiNEmgks7JC6Ez71zC9V_ZII5UszJe6vIF6G4GnV-6PWGPA3as76_CU7W8T_x',
            iat: 1531871896,
            agreement: {
              '@context': JLINC.contextUrl,
              jlincId: 'b0fafcdc26b2678de97bd3eff089504fb1ab40282de6ef4711e6d7aa4a9e9061',
              agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
              iat: 1531871896
            },
          },
        },
      });
    });
  });
});
