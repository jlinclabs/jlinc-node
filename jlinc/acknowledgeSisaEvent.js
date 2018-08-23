'use strict';

module.exports = function acknowledgeSisaEvent({ sisa, dataCustodian, sisaEvent }){

  if (!sisa) throw new Error('sisa is required');
  if (!dataCustodian) throw new Error('dataCustodian is required');
  if (!sisaEvent) throw new Error('sisaEvent is required');

  this.validateSisa({ sisa });
  this.validateSisaEvent({ sisaEvent });
  this.verifySisaWasOfferedByDataCustodian({ sisa, dataCustodian });

  const acknowledgedSisaEvent = Object.assign({}, sisaEvent);
  acknowledgedSisaEvent.audit = Object.assign(
    {},
    sisaEvent.audit,
    {
      dataCustodianSigType: this.signatureType,
      dataCustodianId: dataCustodian.publicKey,
      dataCustodianSig: this.signItem({
        itemToSign: sisaEvent.eventJwt,
        privateKey: dataCustodian.privateKey,
      }),
    }
  );

  return acknowledgedSisaEvent;
};
