'use strict';

require('../setup');

describe('JLINC.expandAcceptedSisa', function() {
  it('should expand the given acceptedSisa', function() {
    expect(
      JLINC.expandAcceptedSisa({
        acceptedSisa: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          offeredSisaJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAY29udGV4dCI6Imh0dHBzOi8vY29udGV4dC5qbGluYy5vcmcvdjA1L2psaW5jLmpzb25sZCIsImFncmVlbWVudEp3dCI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpBWTI5dWRHVjRkQ0k2SW1oMGRIQnpPaTh2WTI5dWRHVjRkQzVxYkdsdVl5NXZjbWN2ZGpBMUwycHNhVzVqTG1wemIyNXNaQ0lzSW1wc2FXNWpTVVFpT2lJd01XWTVPRE5rTVdWa09XUXhNemhtT0RGaVpHTmtNamxtTkRRNU9EVmxOV1l5WkdZeU5qQTNPVGt5WW1ZMk1UWmtPVFkyWkRBek5qUmhOV1UyWWpJeElpd2lZV2R5WldWdFpXNTBWVkpKSWpvaWFIUjBjSE02THk5emFYTmhMbXBzYVc1akxtOXlaeTkyTVM5b1RYZEViMUZ5WlU5eVUwRlNkR2xQUnpoWWNYZFBjemQ2YjJ4cldsSndRMHhpU2pGRVptSjJPV3MwSWl3aWFXRjBJam94TlRNeE1UWXlNemd4T0RNemZRLnhTSmExQ2VJc2RZUlBXNmNsa1lWWC15VzllM0h2Rzg2ZkJoRjBZcXA2VVEiLCJkYXRhQ3VzdG9kaWFuU2lnVHlwZSI6InNoYTI1NjplZDI1NTE5IiwiZGF0YUN1c3RvZGlhbklEIjoiY1psV0hiUVNYUnVZR2NkT3BYOUxGRnFJSXdma0hkVE5ZQ3Z2amx1Wld5RSIsImRhdGFDdXN0b2RpYW5TaWciOiJGRFJzMl9mUm5JQU04SWIyNVZHYllXbGV1S08zODhYZnlHSWJDTlJfTmNFWEpXZXZKSEl4SXdfMFR0a3RfSmxXUjRrOVY0THhTWWhNUEpOQnFuT05ER3BRTlktYlE2ZjBTRXl5MGY0R180NzUxWnhJaEFhS3U2ZkR2NkxidnlIUSIsImlhdCI6MTUzMTE2MjM4MTgzNn0.4O7dyX_OyQYWjnByKEKjjUJoYOqnaPKwCwXUU3SUhiI',
          rightsHolderSigType: 'sha256:ed25519',
          rightsHolderID: 'Bh-JCSmW452EO83NIRYTqS8F-AGTBle7a1lt6li1xlY',
          rightsHolderSig: 'QsG1uZ-d0XUeHMOF5RN4oRFLU440071uY1Ah8H6iDTGmMcSLznUbilj55VpgI_NMBiRdWsTsdOf2FwD2Hx6FDWFTvpmg51q8NpsnPPW22ulVoSbt4swpRGYCnxpquzIY',
          iat: 1531162381837,
        },
      })
    ).to.deep.equal({
      '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
      rightsHolderSigType: 'sha256:ed25519',
      rightsHolderID: 'Bh-JCSmW452EO83NIRYTqS8F-AGTBle7a1lt6li1xlY',
      rightsHolderSig: 'QsG1uZ-d0XUeHMOF5RN4oRFLU440071uY1Ah8H6iDTGmMcSLznUbilj55VpgI_NMBiRdWsTsdOf2FwD2Hx6FDWFTvpmg51q8NpsnPPW22ulVoSbt4swpRGYCnxpquzIY',
      iat: 1531162381837,
      offeredSisa: {
        '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
        dataCustodianSigType: 'sha256:ed25519',
        dataCustodianID: 'cZlWHbQSXRuYGcdOpX9LFFqIIwfkHdTNYCvvjluZWyE',
        dataCustodianSig: 'FDRs2_fRnIAM8Ib25VGbYWleuKO388XfyGIbCNR_NcEXJWevJHIxIw_0Ttkt_JlWR4k9V4LxSYhMPJNBqnONDGpQNY-bQ6f0SEyy0f4G_4751ZxIhAaKu6fDv6LbvyHQ',
        iat: 1531162381836,
        agreement: {
          '@context': 'https://context.jlinc.org/v05/jlinc.jsonld',
          jlincID: '01f983d1ed9d138f81bdcd29f44985e5f2df2607992bf616d966d0364a5e6b21',
          agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
          iat: 1531162381833,
        },
      },
    });
  });
});
