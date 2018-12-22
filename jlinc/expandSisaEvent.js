'use strict';

module.exports = function expandSisaEvent({ sisaEvent }){
  const { InvalidSisaEventError } = this;

  if (!sisaEvent) throw new Error('sisaEvent is required');

  const expandedSisaEvent = Object.assign({}, sisaEvent);

  expandedSisaEvent.event = this.decodeJwt({ jwt: sisaEvent.eventJwt });
  if (!expandedSisaEvent.event)
    throw new InvalidSisaEventError('sisaEvent.eventJwt is invalid');

  delete expandedSisaEvent.eventJwt;

  return expandedSisaEvent;
};
