'use strict';

module.exports = async function verifySisaOfferingDataCustodianDid({ sisaOffering, dataCustodianDid }) {
  if (!sisaOffering) throw new Error('sisaOffering is required');
  const { offeredSisa } = sisaOffering;
  await this.verifyOfferedSisaDataCustodianDid({ offeredSisa, dataCustodianDid });
  return true;
};
