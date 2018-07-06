# Node JLINC

A node implementation of the JLINC protocol

Spec: https://protocol.jlinc.org/#5-sisa-events


## Nomenclature



## Usage


```js

const JLINC = require('jlinc');

const dataCustodian = JLINC.createEntity();

const sisaAgreement = JLINC.createSisaAgreement();

JLINC.validateSisaAgreement({ sisaAgreement });

const sisaOffering = JLINC.createSisaOffering({
  sisaAgreement,
  dataCustodian,
});

JLINC.validateSisaOffering({ sisaOffering, dataCustodian });

const rightsHolder = JLINC.createEntity();

const acceptedSisa = JLINC.acceptSisa({ sisaOffering, rightsHolder });



```
