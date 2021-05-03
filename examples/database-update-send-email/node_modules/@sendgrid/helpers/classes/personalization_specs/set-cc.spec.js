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

  //Set cc
  describe('setCc()', function() {
    it('should handle array values', function() {
      p.setCc(['test@example.org']);
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(1);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test@example.org');
    });
    it('should handle string values', function() {
      p.setCc('test@example.org');
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(1);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.setCc(['test1@example.org', 'test2@example.org']);
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(2);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test1@example.org');
      expect(p.cc[1]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.setCc();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setCc('test@example.org');
      p.setCc();
      expect(p.cc[0].email).to.equal('test@example.org');
    });
  });
});
