'use strict';

module.exports = function acknowledgeSisaEvent({ sisa, dataCustodian, sisaEvent }){
  if (!sisa) throw new Error('sisa is required');

  if (!sisaEvent)
    throw new Error('sisaEvent is required');

  if (!dataCustodian)
    throw new Error('dataCustodian is required');

  if (!dataCustodian.did)
    throw new Error('dataCustodian.did is required');

  if (!dataCustodian.signingPublicKey)
    throw new Error('dataCustodian.signingPublicKey is required');

  if (!dataCustodian.signingPrivateKey)
    throw new Error('dataCustodian.signingPrivateKey is required');

  this.validateSisa({ sisa });
  this.validateSisaEvent({ sisaEvent });
  this.verifySisaWasOfferedByDataCustodian({ sisa, dataCustodian });

  const acknowledgedSisaEvent = Object.assign({}, sisaEvent);
  acknowledgedSisaEvent.audit = Object.assign(
    {},
    sisaEvent.audit,
    {
      dataCustodianSigType: this.signatureType,
      dataCustodianDid: dataCustodian.did,
      dataCustodianPublicKey: dataCustodian.signingPublicKey,
      dataCustodianSig: this.signHash({
        hashToSign: sisaEvent.audit.eventId,
        privateKey: dataCustodian.signingPrivateKey,
      }),
    }
  );

  return acknowledgedSisaEvent;
};
