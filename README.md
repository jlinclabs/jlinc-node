# Node JLINC

A node implementation of the JLINC protocol

Spec: https://protocol.jlinc.org/#5-sisa-events


## Nomenclature



## Usage


```js
'use strict';

const JLINC = require('jlinc');


// done by bob on the B API

const dataCustodian = JLINC.createEntity();
JLINC.validateDataCustodian({ dataCustodian });

const sisaAgreement = JLINC.createSisaAgreement();
JLINC.validateSisaAgreement({ sisaAgreement });

const sisaOffering = JLINC.createSisaOffering({ sisaAgreement, dataCustodian });

// done by alice on the A API

const { offeredSisa } = sisaOffering;
JLINC.validateOfferedSisa({ offeredSisa });

const rightsHolder = JLINC.createEntity();
JLINC.validateRightsHolder({ rightsHolder });

const acceptedSisa = JLINC.acceptSisa({ offeredSisa, rightsHolder });


// done by bob on the B API
JLINC.validateAcceptedSisa({ acceptedSisa });

const expandedAcceptedSisa = JLINC.expandAcceptedSisa({ acceptedSisa });

```
