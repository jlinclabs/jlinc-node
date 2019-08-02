'use strict';

const isDid = require('./isDid');

module.exports = function createBisaOffering({
  agreementURI = this.defaultAgreementURI,
  dataCustodian,
  targetAcceptorDid,
}){
  if (!agreementURI) throw new Error('agreementURI is required');
  if (!dataCustodian) throw new Error('dataCustodian is required');
  if (!targetAcceptorDid) throw new Error('targetAcceptorDid is required');
  if (!isDid(targetAcceptorDid)) throw new Error('targetAcceptorDid must be a DID');

  const bisaAgreement = {
    "@context": this.contextUrl,
    jlincId: this.createNonce(),
    agreementURI: agreementURI,
    targetAcceptorDid,
  };

  const agreementJwt = this.createSignedJwt({
    itemToSign: bisaAgreement,
    secret: dataCustodian.secret,
  });

  const offerorSig = this.signItem({
    itemToSign: agreementJwt,
    privateKey: dataCustodian.signingPrivateKey,
  });

  return {
    '@context': this.contextUrl,
    id: bisaAgreement.jlincId,
    offeredBisa: {
      '@context': this.contextUrl,
      agreementJwt,
      offerorSigType: this.signatureType,
      offerorDid: dataCustodian.did,
      offerorPublicKey: dataCustodian.signingPublicKey,
      offerorSig,
      createdAt: this.now(),
    }
  };
};
