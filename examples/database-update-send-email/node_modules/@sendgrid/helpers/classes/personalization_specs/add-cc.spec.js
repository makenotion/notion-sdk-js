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

  //Add cc
  describe('addCc()', function() {
    it('should add the item', function() {
      p.addCc('test@example.org');
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(1);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.addCc('test1@example.org');
      p.addCc('test2@example.org');
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(2);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test1@example.org');
      expect(p.cc[1]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.addCc();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.addCc('test@example.org');
      p.addCc();
      expect(p.cc).to.be.an.instanceof(Array);
      expect(p.cc).to.have.a.lengthOf(1);
      expect(p.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(p.cc[0].email).to.equal('test@example.org');
    });
  });
});
