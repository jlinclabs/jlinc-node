'use strict';

const JLINC = require('../../jlinc');

describe('JLINC.validateSisaOffering', function() {
  it('should validate the given sisaOffering', function(){
    expect(() => {
      JLINC.validateSisaOffering({});
    }).to.throw(Error, 'sisaOffering is required');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: 'xx',
      });
    }).to.throw(Error, 'sisaOffering must be of type object');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {},
      });
    }).to.throw(Error, 'sisaOffering must have key "@context"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': 'love',
        },
      });
    }).to.throw(Error, 'sisaOffering["@context"] is invalid');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': JLINC.contextUrl,
        },
      });
    }).to.throw(Error, 'sisaOffering must have key "offeredSisa"');

    expect(() => {
      JLINC.validateSisaOffering({
        sisaOffering: {
          '@context': JLINC.contextUrl,
          offeredSisa: 'xxx',
        },
      });
    }).to.throw(Error, 'sisaOffering.offeredSisa must be of type object');

    const dataCustodian = JLINC.createDataCustodian();
    const sisaOffering = JLINC.createSisaOffering({ dataCustodian });

    expect(
      JLINC.validateSisaOffering({ sisaOffering })
    ).to.be.true;
  });

  context('when given a valid version 5 sisaOffering', function() {
    it('should return true', function(){
      const sisaOffering = {
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        offeredSisa: {
          '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
          agreementJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAY29udGV4dCI6Imh0dHBzOi8vcHJvdG9jb2wuamxpbmMub3JnL2NvbnRleHQvamxpbmMtdjUuanNvbmxkIiwiamxpbmNJZCI6IjkwNGJjY2Q0OGNlNmQ4OGE3OTFiNmY0YTg1MjQyODI5OTAxNmNkOTZhN2FlODg1YTYyY2YyMTVhODIzYjI4ZDYiLCJhZ3JlZW1lbnRVUkkiOiJodHRwczovL3Npc2EuamxpbmMub3JnL3YxLzNiMzkxNjBjMmI5YWU3YjJlZjgxYzMzMTFjNzkyNGYxYzRkNGZhOWNhNDdjZmU3Yzg0MGM5ODUyYjUwZDY4ZDUifQ.asTnt-NbKn-lUyrRkLL0iMqcdjHQysoevpZBQ6zAXtc',
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: '38gUWPybF6AvZ73j1dDEuYxHd8IFgLRh5xZJEPgJwuc',
          dataCustodianSig: 'GTeosXTDEmskU620pC-COAJyXyQkVIg0Rpj9jmMsJxX4AfKNZFxyio32qI08D2J-rFBsiNUfVuHf-43_NUgnAMwl7uLvKbXcnr0tcaux88NpEUebCVJh6ySEvD2jLoRb',
          createdAt: '2018-08-22T18:58:53.706Z',
        }
      };
      expect(
        JLINC.validateSisaOffering({ sisaOffering })
      ).to.be.true;
    });
  });
});
