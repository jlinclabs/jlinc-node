'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.expandSisa', function() {
  it('should expand the given sisa', function() {
    expect(
      JLINC.expandSisa({
        sisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          acceptedSisaJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAY29udGV4dCI6Imh0dHBzOi8vY29udGV4dC5qbGluYy5vcmcvdjA1L2psaW5jLmpzb25sZCIsIm9mZmVyZWRTaXNhSnd0IjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SkFZMjl1ZEdWNGRDSTZJbWgwZEhCek9pOHZZMjl1ZEdWNGRDNXFiR2x1WXk1dmNtY3ZkakExTDJwc2FXNWpMbXB6YjI1c1pDSXNJbUZuY21WbGJXVnVkRXAzZENJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVXBCV1RJNWRXUkhWalJrUTBrMlNXMW9NR1JJUW5wUGFUaDJXVEk1ZFdSSFZqUmtRelZ4WWtkc2RWbDVOWFpqYldOMlpHcEJNVXd5Y0hOaFZ6VnFURzF3ZW1JeU5YTmFRMGx6U1cxd2MyRlhOV3BUVlZGcFQybEpORmw2U1RSTmFrVXlUVlJaTVUxNlFUSlBWMFYzVG0xWk1FMVVSVEphVkd4c1RVUmFhMXBxWkcxYVZHTjNUa1JWZVU1dFRteE5SMWswVFhwb2FVNUVRWGROUjA1dFQxUkJNVTV0U1RWUFIwcHNUMWRhYlVscGQybFpWMlI1V2xkV2RGcFhOVEJXVmtwS1NXcHZhV0ZJVWpCalNFMDJUSGs1ZW1GWVRtaE1iWEJ6WVZjMWFreHRPWGxhZVRreVRWTTViMVJZWkVWaU1VWjVXbFU1ZVZVd1JsTmtSMnhRVW5wb1dXTllaRkJqZW1RMllqSjRjbGRzU25kUk1IaHBVMnBHUlZwdFNqSlBWM013U1dsM2FXRlhSakJKYW05NFRsUk5lRTFxVVhwTlJGVjRabEV1UlZSSVJISlFhRVpYUjBGaWVtbHJiMDFCUkZCa2FuWllWa0paY3pGcE56UkdjMWhHYldoQlJqVkZXU0lzSW1SaGRHRkRkWE4wYjJScFlXNVRhV2RVZVhCbElqb2ljMmhoTWpVMk9tVmtNalUxTVRraUxDSmtZWFJoUTNWemRHOWthV0Z1U1VRaU9pSnRZVkY2UkRrdE1sUkVka1Z6ZDBadlJYYzBVMmxsTTB4dU16VkZaME5TTlROSFlscFhWa1l6VVdnd0lpd2laR0YwWVVOMWMzUnZaR2xoYmxOcFp5STZJa0YzVDNKVmFGSm9lWEl4Ykc1NlNEbFZURVZFT0ZCaVUyZ3hWVGg1UXpOU1ZHdDJYMWg2VUcxUmN6QkVhalJ6VnpGc1RuaDFiV0pXTmxWTFVsb3lTVTlIYUVkcVdDMW1SemhYWm1odVQzWk5VelUwYkVSaWFFbFZlSE4zVkhNek4yNXJXbTF2U2pGdlNsQkJMVlJHT0dNd1drRjJOMUpsZFdkbk1sQXRZMUE0SWl3aWFXRjBJam94TlRNeE1qUXpNRFV4ZlEuMnZEZnVyOWhPZjNBTTY1Mi1JZ0d1d05IY3RJemxDcXE4dTlOQk9jZUVaSSIsInJpZ2h0c0hvbGRlclNpZ1R5cGUiOiJzaGEyNTY6ZWQyNTUxOSIsInJpZ2h0c0hvbGRlcklEIjoiY09ya0VGdXZxMzRvRm53QndUMHd5Um9Uc0c3VmlXSUNfcGhyWnlrZS1VQSIsInJpZ2h0c0hvbGRlclNpZyI6ImRjTXdyUnVoT0dWakJ2Wnd2YW8zU2RkZzhCTjBJVVNQdnR0U29UeXRiZjYxcWpqYlcwNldmenNBaEVKbUU4U0Ffd2l3TVBlcmRZNXl1b3ozRi1wVEQ4d3gzWUlqcU1VdTRqaktuekViR2xkUFUtdVFMbWVVeGJEREd0aml5OHphIiwiaWF0IjoxNTMxMjQzMDUxfQ.ifaFuyVfx7DlQw9ZrmaUN4eAD5yesIAXMWyPm3jSdCA',
          sisaID: 'zFESupNKLAoN-gzN2pFlvtmOBk5WxbkeiD-HYw38SfU'
        },
      })
    ).to.deep.equal({
      '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
      sisaID: 'zFESupNKLAoN-gzN2pFlvtmOBk5WxbkeiD-HYw38SfU',
      acceptedSisa: {
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        rightsHolderSigType: 'sha256:ed25519',
        rightsHolderID: 'cOrkEFuvq34oFnwBwT0wyRoTsG7ViWIC_phrZyke-UA',
        rightsHolderSig: 'dcMwrRuhOGVjBvZwvao3Sddg8BN0IUSPvttSoTytbf61qjjbW06WfzsAhEJmE8SA_wiwMPerdY5yuoz3F-pTD8wx3YIjqMUu4jjKnzEbGldPU-uQLmeUxbDDGtjiy8za',
        iat: 1531243051,
        offeredSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianID: 'maQzD9-2TDvEswFoEw4Sie3Ln35EgCR53GbZWVF3Qh0',
          dataCustodianSig: 'AwOrUhRhyr1lnzH9ULED8PbSh1U8yC3RTkv_XzPmQs0Dj4sW1lNxumbV6UKRZ2IOGhGjX-fG8WfhnOvMS54lDbhIUxswTs37nkZmoJ1oJPA-TF8c0ZAv7Reugg2P-cP8',
          iat: 1531243051,
          agreement: {
            '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
            jlincID: '8c282161653069a06f4116e9e06df7fe704526ce0f838b4000cf9056b98be9ff',
            agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
            iat: 1531243051,
          },
        },
      }
    });
  });
});
