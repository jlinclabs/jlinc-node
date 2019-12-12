'use strict';

module.exports = function validateZcap(input) {
  const decoded = this.decodeJwt({jwt: input});
  if (!decoded) {
    throw 'Not a JWT';
  }
  const cap = decoded.capability;
  const proof = decoded.proof;

  if (cap && proof) {
    const capability = JSON.parse(cap);
    if (this.verifySignature({itemSigned: cap, signature: proof.signatureValue, publicKey: capability.signingPublicKey})) {
      return {capability, proof};
    } else {
      return false;
    }
  } else {
    throw 'Unable to parse ZCAP';
  }
};
