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

  //Add bcc
  describe('addBcc()', function() {
    it('should add the item', function() {
      p.addBcc('test@example.org');
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(1);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.addBcc('test1@example.org');
      p.addBcc('test2@example.org');
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(2);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test1@example.org');
      expect(p.bcc[1]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.addBcc();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.addBcc('test@example.org');
      p.addBcc();
      expect(p.bcc).to.be.an.instanceof(Array);
      expect(p.bcc).to.have.a.lengthOf(1);
      expect(p.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.bcc[0].email).to.equal('test@example.org');
    });
  });
});
