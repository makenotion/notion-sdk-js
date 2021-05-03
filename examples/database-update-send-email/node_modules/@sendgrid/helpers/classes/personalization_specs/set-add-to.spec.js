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

  //Add to
  describe('addTo()', function() {
    it('should add the item', function() {
      p.addTo('test@example.org');
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(1);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test@example.org');
    });
    it('should handle multiple values', function() {
      p.addTo('test1@example.org');
      p.addTo('test2@example.org');
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(2);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test1@example.org');
      expect(p.to[1]).to.be.an.instanceof(EmailAddress);
      expect(p.to[1].email).to.equal('test2@example.org');
    });
    it('should accept no input', function() {
      expect(function() {
        p.addTo();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.addTo('test@example.org');
      p.addTo();
      expect(p.to).to.be.an.instanceof(Array);
      expect(p.to).to.have.a.lengthOf(1);
      expect(p.to[0]).to.be.an.instanceof(EmailAddress);
      expect(p.to[0].email).to.equal('test@example.org');
    });
  });
});
