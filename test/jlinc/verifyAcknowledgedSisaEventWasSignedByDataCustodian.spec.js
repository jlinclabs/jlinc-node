'use strict';

const JLINC = require('../../jlinc');
const { generateAcknowledgedSisaEvent } = require('../helpers');

describe('JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian', function() {

  context('when missing required arguments', function() {
    it('should throw and error', function(){
      const { dataCustodian, acknowledgedSisaEvent } = generateAcknowledgedSisaEvent();
      const dataCustodianId = dataCustodian.publicKey;
      expect(() => {
        JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({

        });
      }).to.throw('acknowledgedSisaEvent is required');

      expect(() => {
        JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
          acknowledgedSisaEvent,
        });
      }).to.throw('dataCustodianId is required');

      expect(() => {
        JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({
          acknowledgedSisaEvent,
          dataCustodianId,
        });
      }).to.not.throw();
    });
  });

  context('when given an acknowledgedSisaEvent', function() {
    context('that was signed by the given dataCustodian', function() {
      it('should return true', function(){
        const { dataCustodian, acknowledgedSisaEvent } = generateAcknowledgedSisaEvent();
        const dataCustodianId = dataCustodian.publicKey;
        expect(
          JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({ acknowledgedSisaEvent, dataCustodianId })
        ).to.be.true;
      });
    });
    context('that was NOT signed by the given dataCustodian', function() {
      it('should throw the error "acknowledgedSisaEvent was not signed by the given dataCustodian"', function(){
        const { acknowledgedSisaEvent } = generateAcknowledgedSisaEvent();
        const dataCustodian = JLINC.createDataCustodian();
        const dataCustodianId = dataCustodian.publicKey;
        expect(() => {
          JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({ acknowledgedSisaEvent, dataCustodianId });
        }).to.throw(JLINC.AcknowledgedSisaEventVerificationError, 'acknowledgedSisaEvent was not signed by the given dataCustodian');
      });
    });
  });

  context('when given a version 5 acknowledgedSisaEvent', function() {
    beforeEach(function() {
      this.acknowledgedSisaEvent = {
        '@context': 'https://protocol.jlinc.org/context/jlinc-v5.jsonld',
        audit: {
          sisaId: "YxxMbGhSq_coZni9FakDxAjLou3zWqSBl32C_vWcTAI",
          eventId: "IdjLNOcooeeST8G_VWMY7lct6_XFp-nu_TH-rcNxVvc",
          createdAt: "2018-07-26T18:55:28.891Z",
          eventType: "dataEvent",
          previousId: null, "rightsHolderId": "TCjREX155C3k11G4Xq9hXsuYfW_yTkhtqlK0FYGrWJc",
          dataCustodianId: "_-1yvssDomlFcpWUZ0IjDvstl9SKX0JsSEx1G2wJqvQ",
          rightsHolderSig: "4aYntCb0ciWhKTwsRaGwxoCYHWH0i9otpHFfYL7YJMCXJPltE0Uu91Qup_WCY_9dwSuBu-aS3wWrgjjcQ2CPD2bt_FS5WTq_DwCg6dqGvJS4k-eyMEA-za_POyBUYrlx",
          dataCustodianSig: "k0s3cFmlbiDHUAztdIEG_enLLOZEzK99hrFc3_wbfFH8E8qlNgBRRZu-FObBIINka_GIDILsrRzLgbdgDYE6CU96DrUvSj8X51hpD8sv34hJkxOFmpkDkKG2kk4BgQcf",
          rightsHolderSigType: "sha256:ed25519",
          dataCustodianSigType: "sha256:ed25519",
        },
        eventJwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJzb25hbF9kYXRhIjp7ImVtYWlsIjoiamFyZWRAamxpbmNsYWJzLmNvbSIsImZpcnN0bmFtZSI6IkphcmVkIiwiaG9tZXBob25lIjoiNDE1LTU1NS01NTU1IiwibGFzdG5hbWUiOiJBdHJvbiIsIm1haWxpbmdjaXR5Ijoib2FrbGFuZCIsIm1haWxpbmdjb3VudHJ5IjoiVVNBIiwibWFpbGluZ3Bvc3RhbGNvZGUiOiIyMTMyMSIsIm1vYmlsZXBob25lIjoiNDE1LTU1NS01NTU2In19.v_4cIptzSs_fx6F5RWi_3tuvG71Iro_ilhGZjml_9W4',
      };
      this.dataCustodian = {
        publicKey: '_-1yvssDomlFcpWUZ0IjDvstl9SKX0JsSEx1G2wJqvQ',
        privateKey: 'ZhN7RQiHWpyHHomPZEuHk4lzXtBSuQyvCWjOrI0nar3_7XK-ywOiaUVylZRnQiMO-y2X1IpfQmxITHUbbAmq9A',
        secret: 'fUgFTPOVKSDUFEILoI4TYFmBcPq37k3o'
      };
    });
    context('that was signed by the given dataCustodian', function() {
      it('should return true', function(){
        const { acknowledgedSisaEvent, dataCustodian } = this;
        const dataCustodianId = dataCustodian.publicKey;
        expect(
          JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({ acknowledgedSisaEvent, dataCustodianId })
        ).to.be.true;
      });
    });
    context('that was NOT signed by the given dataCustodian', function() {
      it('should throw the error "acknowledgedSisaEvent was not signed by the given dataCustodian"', function(){
        const { acknowledgedSisaEvent } = this;
        const dataCustodian = JLINC.createDataCustodian();
        const dataCustodianId = dataCustodian.publicKey;
        expect(() => {
          JLINC.verifyAcknowledgedSisaEventWasSignedByDataCustodian({ acknowledgedSisaEvent, dataCustodianId });
        }).to.throw(JLINC.AcknowledgedSisaEventVerificationError, 'acknowledgedSisaEvent was not signed by the given dataCustodian');
      });
    });
  });
});
