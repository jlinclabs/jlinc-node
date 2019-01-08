# Node JLINC

A node implementation of the JLINC protocol

Spec: https://protocol.jlinc.org/#5-sisa-events


## Nomenclature



## Expected Usage


```js
'use strict';

const JLINC = require('jlinc');

/******************
 * On the B Server
 ******************/
const dataCustodian = await JLINC.createDataCustodian();
expect(dataCustodian).to.matchPattern({
  did: _.isJlincDid,
  signingPublicKey: _.isSigningPublicKey,
  signingPrivateKey: _.isSigningPrivateKey,
  encryptingPublicKey: _.isEncryptingPublicKey,
  encryptingPrivateKey: _.isEncryptingPrivateKey,
  registrationSecret: _.isString,
  secret: _.isString,
});
// {
//   did: 'did:jlinc:WsewoS69VayXzbAgK_SjucQIku8o34j3PRsOKGmo4H8',
//   signingPublicKey: 'WsewoS69VayXzbAgK_SjucQIku8o34j3PRsOKGmo4H8',
//   signingPrivateKey: 'tqVrh6UGSxQGtcd3mfIo-9OuZnryrFZiQJYNNe6bG4pax7ChLr1VrJfNsCAr9KO5xAiS7yjfiPc9Gw4oaajgfw',
//   encryptingPublicKey: '7bhlTlXdSBAj8wZ7-dessHVnhjFloDpmKU2-98BrOzM',
//   encryptingPrivateKey: 'DrN7zvaaUEGfTY6eyvhya0Wfhv3A1AHIWbyWwPudrH0',
//   registrationSecret: 'fece3300c6a08e0ab54ef9bf050c374d204f4479936ef6160b1ff59668c3905b',
//   secret: 'k6kE41JYoBmu7oznkWiZC5GOPB9N5jR6',
// }

// Alice requests a SisaOffering
const sisaOffering = JLINC.createSisaOffering({ dataCustodian });
// {
//   '@context': 'https://protocol.jlinc.org/context/jlinc-v7.jsonld',
//   offeredSisa: {
//     '@context': 'https://protocol.jlinc.org/context/jlinc-v7.jsonld',
//     agreementJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAY29udGV4dCI6Imh0dHBzOi8vcHJvdG9jb2wuamxpbmMub3JnL2NvbnRleHQvamxpbmMtdjYuanNvbmxkIiwiamxpbmNJZCI6IjQwN2NmOTYxNWYyYWFlZjZjMzAxOTg3YTJjNzY0YTVlNGMzMjU1ZTQyNTQ1ZWU5ZGIxZjg0OWZiZmY3NTFkNjYiLCJhZ3JlZW1lbnRVUkkiOiJodHRwczovL3Npc2EuamxpbmMub3JnL3YxLzNiMzkxNjBjMmI5YWU3YjJlZjgxYzMzMTFjNzkyNGYxYzRkNGZhOWNhNDdjZmU3Yzg0MGM5ODUyYjUwZDY4ZDUifQ.JPu2_ICPEGIGp5xYj3k5CT2O7FXsEA5YXBYW6kxsZus',
//     dataCustodianSigType: 'sha256:ed25519',
//     dataCustodianDid: 'did:jlinc:WsewoS69VayXzbAgK_SjucQIku8o34j3PRsOKGmo4H8',
//     dataCustodianPublicKey: 'WsewoS69VayXzbAgK_SjucQIku8o34j3PRsOKGmo4H8',
//     dataCustodianSig: 'reHcUSrT115dglv1SU1KNPJ6j1QcVu2OAiTUDLUo8Z8qR5LkJ5A5sq_DeroJeD4-sPUAEf77G9pRvrLzzBaaDQ',
//     createdAt: '2018-12-14T21:18:55.379Z',
//   },
// }

// simulate sending sisa across an HTTP request
const copyOfSisaOffering = JSON.parse(JSON.stringify(sisaOffering));

/******************
 * On the A Server
 ******************/

// validate the sisa offering
JLINC.validateSisaOffering({
  sisaOffering: copyOfSisaOffering,
});

// verifying the dataCustodian public key is part of the DID
await JLINC.verifySisaOfferingDataCustodianDid({
  sisaOffering: copyOfSisaOffering,
  dataCustodianDid: dataCustodian.did,
});
const rightsHolder = await JLINC.createRightsHolder();
// {
//   did: 'did:jlinc:4mlzQ4jkfwNsRB3Ge4igKiRn4I3YkB0vPGj8YY3o5xU',
//   signingPublicKey: '4mlzQ4jkfwNsRB3Ge4igKiRn4I3YkB0vPGj8YY3o5xU',
//   signingPrivateKey: 'TvNt-he4CgxPiF-cWbhcrbsRR9RtB1sZK_-3-bxzxWniaXNDiOR_A2xEHcZ7iKAqJGfgjdiQHS88aPxhjejnFQ',
//   encryptingPublicKey: 'xccpIl08i92nnMBMcNzFWh-rKUwN2LI1maWpqkx6f3Y',
//   encryptingPrivateKey: 'WZKj6DnOmEgLmYImEqRh4HAZys0uTgB9aVQWEORKgf0',
//   registrationSecret: 'abd02066da43e20949033070a21ecd6cd8c25a829e4668001d612ac8ee0e2456',
//   secret: 'tk1htPkg8cFV-4ly_zNtsC_JKeJtJIlU',
// }

JLINC.validateSisaOffering({
  sisaOffering: copyOfSisaOffering
});

// accept the sisa with our new rights holder
const sisa = JLINC.acceptSisa({
  sisaOffering: copyOfSisaOffering,
  rightsHolder,
});
// {
//   '@context': 'https://protocol.jlinc.org/context/jlinc-v7.jsonld',
//   acceptedSisaJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJAY29udGV4dCI6Imh0dHBzOi8vcHJvdG9jb2wuamxpbmMub3JnL2NvbnRleHQvamxpbmMtdjYuanNvbmxkIiwib2ZmZXJlZFNpc2FKd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmNISnZkRzlqYjJ3dWFteHBibU11YjNKbkwyTnZiblJsZUhRdmFteHBibU10ZGpZdWFuTnZibXhrSWl3aVlXZHlaV1Z0Wlc1MFNuZDBJam9pWlhsS2FHSkhZMmxQYVVwSlZYcEpNVTVwU1hOSmJsSTFZME5KTmtscmNGaFdRMG81TG1WNVNrRlpNamwxWkVkV05HUkRTVFpKYldnd1pFaENlazlwT0haalNFcDJaRWM1YW1JeWQzVmhiWGh3WW0xTmRXSXpTbTVNTWs1MlltNVNiR1ZJVVhaaGJYaHdZbTFOZEdScVdYVmhiazUyWW0xNGEwbHBkMmxoYlhod1ltMU9TbHBEU1RaSmFsRjNUakpPYlU5VVdYaE9WMWw1V1ZkR2JGcHFXbXBOZWtGNFQxUm5NMWxVU21wT2Vsa3dXVlJXYkU1SFRYcE5hbFV4V2xSUmVVNVVVVEZhVjFVMVdrZEplRnBxWnpCUFYxcHBXbTFaTTA1VVJtdE9hbGxwVEVOS2FGb3pTbXhhVnpGc1ltNVNWbFZyYTJsUGFVcHZaRWhTZDJONmIzWk1NMDV3WXpKRmRXRnRlSEJpYlUxMVlqTktia3d6V1hoTWVrNXBUWHByZUU1cVFtcE5iVWsxV1ZkVk0xbHFTbXhhYW1kNFdYcE5lazFVUm1wT2VtdDVUa2RaZUZsNlVtdE9SMXBvVDFkT2FFNUVaR3BhYlZVeldYcG5NRTFIVFRWUFJGVjVXV3BWZDFwRVdUUmFSRlZwWmxFdVNsQjFNbDlKUTFCRlIwbEhjRFY0V1dvemF6VkRWREpQTjBaWWMwVkJOVmxZUWxsWE5tdDRjMXAxY3lJc0ltUmhkR0ZEZFhOMGIyUnBZVzVUYVdkVWVYQmxJam9pYzJoaE1qVTJPbVZrTWpVMU1Ua2lMQ0prWVhSaFEzVnpkRzlrYVdGdVJFbEVJam9pWkdsa09tcHNhVzVqT2xkelpYZHZVelk1Vm1GNVdIcGlRV2RMWDFOcWRXTlJTV3QxT0c4ek5Hb3pVRkp6VDB0SGJXODBTRGdpTENKa1lYUmhRM1Z6ZEc5a2FXRnVVSFZpYkdsalMyVjVJam9pVjNObGQyOVROamxXWVhsWWVtSkJaMHRmVTJwMVkxRkphM1U0YnpNMGFqTlFVbk5QUzBkdGJ6UklPQ0lzSW1SaGRHRkRkWE4wYjJScFlXNVRhV2NpT2lKeVpVaGpWVk55VkRFeE5XUm5iSFl4VTFVeFMwNVFTalpxTVZGalZuVXlUMEZwVkZWRVRGVnZPRm80Y1ZJMVRHdEtOVUUxYzNGZlJHVnliMHBsUkRRdGMxQlZRVVZtTnpkSE9YQlNkbkpNZW5wQ1lXRkVVU0lzSW1OeVpXRjBaV1JCZENJNklqSXdNVGd0TVRJdE1UUlVNakU2TVRnNk5UVXVNemM1V2lKOS5QUkNxajVxSnEyR3RDTHRKR2FjM096cU5aN1RTREpZV3BKT1dGcHhTTnRvIiwicmlnaHRzSG9sZGVyU2lnVHlwZSI6InNoYTI1NjplZDI1NTE5IiwicmlnaHRzSG9sZGVyRElEIjoiZGlkOmpsaW5jOjRtbHpRNGprZndOc1JCM0dlNGlnS2lSbjRJM1lrQjB2UEdqOFlZM281eFUiLCJyaWdodHNIb2xkZXJQdWJsaWNLZXkiOiI0bWx6UTRqa2Z3TnNSQjNHZTRpZ0tpUm40STNZa0IwdlBHajhZWTNvNXhVIiwicmlnaHRzSG9sZGVyU2lnIjoia2x5dWE0Q3gtRzNSdEJYWXB6aktLQmtfSkdqUWJFVlFpRllKZkhseF9EWXhfMGJyWkdqOEtRbWdvRld0LVB2Z215V2VobjJvZ1U1UzNLb1R4ZmE4RFEiLCJjcmVhdGVkQXQiOiIyMDE4LTEyLTE0VDIxOjE4OjU1LjQwNFoifQ.96fVRI0jate2fEYFQv4F7DYD12p_EnlgWNF2JgtLsD8',
//   sisaId: 'miikLPnBL3qQPrNBAGuAqRDyEnclrDiXjJCEb6K8tos',
// }

// simulate sending sisa across an HTTP request
const copyOfSisa = JSON.parse(JSON.stringify(sisa));

/******************
 * On the B Server
 ******************/

JLINC.validateSisa({ sisa: copyOfSisa });
JLINC.verifySisaWasOfferedByDataCustodian({
  sisa: copyOfSisa,
  dataCustodian,
});
await JLINC.verifySisaRightsHolderDid({
  sisa: copyOfSisa,
});

const expandedSisa = JLINC.expandSisa({ sisa: copyOfSisa });
```
