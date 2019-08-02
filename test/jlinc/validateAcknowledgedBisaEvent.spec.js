'use strict';

const withDidServer = require('../helpers/withDidServer');
const JLINC = require('../../jlinc');

describe('JLINC.validateAcknowledgedBisaEvent', function() {
  withDidServer();

  let bisa, bisaEvent, acknowledgedBisaEvent;

  before(async function() {
    ({
      bisa, bisaEvent, acknowledgedBisaEvent
    } = await this.generateAcknowledgedBisaEvent());
  });

  it('should validate arguments', function(){
    expect(()=>{
      JLINC.validateAcknowledgedBisaEvent({

      });
    }).to.throw('bisa is required');

    expect(()=>{
      JLINC.validateAcknowledgedBisaEvent({
        bisa,
      });
    }).to.throw('bisaEvent is required');

    expect(()=>{
      JLINC.validateAcknowledgedBisaEvent({
        bisa,
        bisaEvent,
      });
    }).to.throw('acknowledgedBisaEvent is required');
  });

  context('when given an invalid acknowledgedBisaEvent', function() {
    it('should a throw an InvalidAcknowledgedBisaEventError', function(){

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {},
        });
      }).to.throw(JLINC.InvalidAcknowledgedBisaEventError);

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              acceptorSigType: 'plaintext',
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.acceptorSigType is invalid',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              acceptorDid: 'poop'
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.acceptorDid must be a did',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              acceptorPublicKey: null,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.acceptorPublicKey must be of type string',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              acceptorPublicKey: 'love',
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.acceptorPublicKey must be of length 43',
      );
    });
  });

  context('when the bisaEvent and the acknowledgedBisaEvent do not match', function() {
    let otherAcknowledgedBisaEvent;
    before(async function() {
      ({
        acknowledgedBisaEvent: otherAcknowledgedBisaEvent
      } = await this.generateAcknowledgedBisaEvent());
    });

    it('should throw an InvalidAcknowledgedBisaEventError', function(){
      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: otherAcknowledgedBisaEvent,
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.eventJwt does not match bisaEvent.eventJwt',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              eventType: 'statusEvent',
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.eventType does not match bisaEvent.audit.eventType',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              createdAt: otherAcknowledgedBisaEvent.audit.createdAt+1,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.createdAt does not match bisaEvent.audit.createdAt',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              initiatorDid: undefined,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.initiatorDid does not match bisaEvent.audit.initiatorDid',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              initiatorSigType: undefined,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.initiatorSigType does not match bisaEvent.audit.initiatorSigType',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              initiatorSig: undefined,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.initiatorSig does not match bisaEvent.audit.initiatorSig',
      );

      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              initiatorPublicKey: otherAcknowledgedBisaEvent.audit.initiatorPublicKey,
            }
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.initiatorPublicKey does not match bisaEvent.audit.initiatorPublicKey',
      );
    });
  });


  context('when given a bisaEvent that was not acknowledged', function() {
    it(`should throw the error 'acknowledgedBisaEvent.audit must have key "acceptorSigType"'`, function(){
      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: bisaEvent,
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit must have key "acceptorSigType"',
      );
    });
  });

  context('when given an acknowledgedBisaEvent acceptorSig is invalid', function() {
    it('should throw an InvalidAcknowledgedBisaEventError', function(){
      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              acceptorSig: 'x-rWS8uOcA2K6UpIDOjxxr1MXYYegjo94SOVq5HbIkCgrOvsYivP_lTR9M046UZhfqE66C9dUuqEp5XmwwclDg',
            },
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.acceptorSig is invalid'
      );
    });
  });

  context('when given an acknowledgedBisaEvent acceptorDid is invalid', function() {
    it('should throw an InvalidAcknowledgedBisaEventError', function(){
      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              acceptorDid: 'did:jlinc:WbT1bIkSpX35jdIxWrstNcq_1BBxou4pVX4gpG_d6Y4',
            },
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.acceptor did not sign the given bisa'
      );
    });
  });


  context('when given an acknowledgedBisaEvent acceptorPublicKey is invalid', function() {
    it('should throw an InvalidAcknowledgedBisaEventError', function(){
      expect(() => {
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent: {
            ...acknowledgedBisaEvent,
            audit: {
              ...acknowledgedBisaEvent.audit,
              acceptorPublicKey: 'IcUIumA04iGgLOllGBsk03CcPlw5NfYvBWN1KqDELyk',
            },
          },
        });
      }).to.throw(
        JLINC.InvalidAcknowledgedBisaEventError,
        'acknowledgedBisaEvent.audit.acceptor did not sign the given bisa'
      );
    });
  });


  context('when given all valid arguments', function() {
    it('should return true', function(){
      expect(
        JLINC.validateAcknowledgedBisaEvent({
          bisa,
          bisaEvent,
          acknowledgedBisaEvent,
        })
      ).to.be.true;
    });
  });
});


