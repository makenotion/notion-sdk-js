'use strict';

/**
 * Dependencies
 */
const Personalization = require('../personalization');
const EmailAddress = require('../email-address');

/**
 * Tests
 */
describe('Personalization', function() {

  //Create new personalization before each test
  let p;
  beforeEach(function() {
    p = new Personalization();
  });

  //Set bcc
  describe('setBcc()', function() {
    it('should handle array values', function() {
      p.setBcc(['test@example.org']);
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(1);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
    it('should handle string values', function() {
      p.setBcc('test@example.org');
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(1);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.setBcc(['test1@example.org', 'test2@example.org']);
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(2);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test1@example.org');
      expect(p.bcc[1]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.setBcc();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setBcc('test@example.org');
      p.setBcc();
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
  });
});
