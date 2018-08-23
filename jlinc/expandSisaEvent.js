'use strict';

module.exports = function expandSisaEvent({ sisaEvent }){
  if (!sisaEvent) throw new Error('sisaEvent is required');

  const expandedSisaEvent = Object.assign({}, sisaEvent);

  expandedSisaEvent.event = this.decodeJwt({ jwt: sisaEvent.eventJwt });
  delete expandedSisaEvent.eventJwt;

  return expandedSisaEvent;
};
