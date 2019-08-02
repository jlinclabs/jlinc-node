'use strict';

module.exports = function acknowledgeBisaEvent({ bisa, bisaEvent, dataCustodian }){
  if (!bisa) throw new Error('bisa is required');

  if (!bisaEvent)
    throw new Error('bisaEvent is required');

  if (!dataCustodian)
    throw new Error('dataCustodian is required');

  if (!dataCustodian.did)
    throw new Error('dataCustodian.did is required');

  if (!dataCustodian.signingPublicKey)
    throw new Error('dataCustodian.signingPublicKey is required');

  if (!dataCustodian.signingPrivateKey)
    throw new Error('dataCustodian.signingPrivateKey is required');

  if (dataCustodian.did === bisaEvent.audit.initiatorDid)
    throw new Error('bisaEvent cannot be acknowledged by the initiator');

  this.validateBisaEvent({ bisa, bisaEvent });
  this.verifyBisaWasSignedBy({ bisa, dataCustodian });

  const acknowledgedBisaEvent = Object.assign({}, bisaEvent);
  acknowledgedBisaEvent.audit = Object.assign(
    {},
    bisaEvent.audit,
    {
      acceptorSigType: this.signatureType,
      acceptorDid: dataCustodian.did,
      acceptorPublicKey: dataCustodian.signingPublicKey,
      acceptorSig: this.signHash({
        hashToSign: bisaEvent.audit.eventId,
        privateKey: dataCustodian.signingPrivateKey,
      }),
    }
  );

  return acknowledgedBisaEvent;
};
