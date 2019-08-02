'use strict';

module.exports = function expandBisaEvent({ bisaEvent }){
  const { InvalidBisaEventError } = this;

  if (!bisaEvent) throw new Error('bisaEvent is required');

  const expandedBisaEvent = Object.assign({}, bisaEvent);

  expandedBisaEvent.event = this.decodeJwt({ jwt: bisaEvent.eventJwt });
  if (!expandedBisaEvent.event)
    throw new InvalidBisaEventError('failed to expand bisa event: could not decode bisaEvent.eventJwt');

  delete expandedBisaEvent.eventJwt;

  return expandedBisaEvent;
};
