'use strict';

require('../setup');
const JLINC = require('../../jlinc');

describe('JLINC.expandSisa', function() {
  it('should expand the given sisa', function() {
    expect(
      JLINC.expandSisa({
        sisa: {
          '@context': JLINC.contextUrl,
          acceptedSisaJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAY29udGV4dCI6Imh0dHBzOi8vY29udGV4dC5qbGluYy5vcmcvdjA1L2psaW5jLmpzb25sZCIsIm9mZmVyZWRTaXNhSnd0IjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SkFZMjl1ZEdWNGRDSTZJbWgwZEhCek9pOHZZMjl1ZEdWNGRDNXFiR2x1WXk1dmNtY3ZkakExTDJwc2FXNWpMbXB6YjI1c1pDSXNJbUZuY21WbGJXVnVkRXAzZENJNkltVjVTbWhpUjJOcFQybEtTVlY2U1RGT2FVbHpTVzVTTldORFNUWkphM0JZVmtOS09TNWxlVXBCV1RJNWRXUkhWalJrUTBrMlNXMW9NR1JJUW5wUGFUaDJXVEk1ZFdSSFZqUmtRelZ4WWtkc2RWbDVOWFpqYldOMlpHcEJNVXd5Y0hOaFZ6VnFURzF3ZW1JeU5YTmFRMGx6U1cxd2MyRlhOV3BUVjFGcFQybEthRmt5VFRST1IxcHNXVEpaZUU1SFVtbFpWRkY2VFRKVk5VMUVhM3BaTWsxNFRucE9hRTV0VVRKT2JWa3dUVVJWZUU1VVZtaFBWRnByVFhwSk1sbFVTbXhPZWsweFRsZE5lVTVFVVhoYVZGWm9UV3BPYVVscGQybFpWMlI1V2xkV2RGcFhOVEJXVmtwS1NXcHZhV0ZJVWpCalNFMDJUSGs1ZW1GWVRtaE1iWEJ6WVZjMWFreHRPWGxhZVRreVRWTTViMVJZWkVWaU1VWjVXbFU1ZVZVd1JsTmtSMnhRVW5wb1dXTllaRkJqZW1RMllqSjRjbGRzU25kUk1IaHBVMnBHUlZwdFNqSlBWM013U1dsM2FXRlhSakJKYW05NFRsUk5lRTFxVVRGTlZHc3dabEV1ZUVoR01WOW9aMHhFWHkwNVlqbGpUWE5OUldVek5HRlBaQzFrU0ZwbVpGbFlZV1Y0UzFCRVdrdEVUU0lzSW1SaGRHRkRkWE4wYjJScFlXNVRhV2RVZVhCbElqb2ljMmhoTWpVMk9tVmtNalUxTVRraUxDSmtZWFJoUTNWemRHOWthV0Z1U1dRaU9pSnhSQzFmWDNoVlZ6RTJjVGs0ZFdGYU5XWklZVE16UjFsblYwNVdZMU5aY0RoMVVrNTNNbVZYYjBKTklpd2laR0YwWVVOMWMzUnZaR2xoYmxOcFp5STZJblpUWkZwVlVHdzJaV1ZKTkRCMk9UZzJURXBvYmxGa2MxbFJkazU2VlRKSVVtZGthVXR0T0RWVFkyWm5VVE5vZFVOMVZXSlBZbWN0V0hVemVqaFZiRFIwVldsT2RVMWxTbUpVV0hkeGRVWkNaM2RZVVVOVmVVVjFWbVZtVm1FeExUWXhYM05uVm5kSFdrOUxSVlkyTkhCeFMyRnhVRmxoYlZORmJ6QjBPSFJGSWl3aWFXRjBJam94TlRNeE1qUTFNVGswZlEuX0xldVd4cTd3RU0tVlNicjJkd25ZaS14alBtRVRudGJyMzlhcGhvcC1FdyIsInJpZ2h0c0hvbGRlclNpZ1R5cGUiOiJzaGEyNTY6ZWQyNTUxOSIsInJpZ2h0c0hvbGRlcklkIjoiUno2V1N3QW9oakxObk1IbThUWUVXYTI1YnZCbDNNVlpnUUk4bWFMNTRrVSIsInJpZ2h0c0hvbGRlclNpZyI6Imc5WXh1QjlHOF9FQWZMQ0g2cmtMcno1eWJsc19TU1lVcFBxMmtEOWNGdVE2UVY3WGlHOG95ZjcwTkpsdldpV21nVEpxWlcxam5tcWtyOW9jSVJ1ZEFhVTk3TnhISm1KSV9nSW84SFRnM200N2FvN2tpZEN5aGFHOS1PWjh3WFczIiwiaWF0IjoxNTMxMjQ1MTk0fQ.4pFlen6nZG9ZeqnI57RSbIVjTS76Yqqm_-soja6wXRU',
          sisaId: 'fvHo9KG_PEM26nK56JnIYmhN4QYxkIqZAP6y2wQ28RU'
        },
      })
    ).to.deep.equal({
      '@context': JLINC.contextUrl,
      sisaId: 'fvHo9KG_PEM26nK56JnIYmhN4QYxkIqZAP6y2wQ28RU',
      acceptedSisa: {
        '@context': JLINC.contextUrl,
        rightsHolderSigType: 'sha256:ed25519',
        rightsHolderId: 'Rz6WSwAohjLNnMHm8TYEWa25bvBl3MVZgQI8maL54kU',
        rightsHolderSig: 'g9YxuB9G8_EAfLCH6rkLrz5ybls_SSYUpPq2kD9cFuQ6QV7XiG8oyf70NJlvWiWmgTJqZW1jnmqkr9ocIRudAaU97NxHJmJI_gIo8HTg3m47ao7kidCyhaG9-OZ8wXW3',
        iat: 1531245194,
        offeredSisa: {
          '@context': JLINC.contextUrl,
          dataCustodianSigType: 'sha256:ed25519',
          dataCustodianId: 'qD-__xUW16q98uaZ5fHa33GYgWNVcSYp8uRNw2eWoBM',
          dataCustodianSig: 'vSdZUPl6eeI40v986LJhnQdsYQvNzU2HRgdiKm85ScfgQ3huCuUbObg-Xu3z8Ul4tUiNuMeJbTXwquFBgwXQCUyEuVefVa1-61_sgVwGZOKEV64pqKaqPYamSEo0t8tE',
          iat: 1531245194,
          agreement: {
            '@context': JLINC.contextUrl,
            jlincId: 'acc84fecf14dba433e9093cc173a6d66f405155a96d326a2e7355c2441e5a23b',
            agreementURI: 'https://sisa.jlinc.org/v1/hMwDoQreOrSARtiOG8XqwOs7zolkZRpCLbJ1Dfbv9k4',
            iat: 1531245194,
          },
        },
      },
    });
  });
});
