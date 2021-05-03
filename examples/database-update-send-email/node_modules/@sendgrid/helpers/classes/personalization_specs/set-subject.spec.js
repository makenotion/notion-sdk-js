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

  //Set subject
  describe('setSubject()', function() {
    it('should set the given value', function() {
      p.setSubject('Test');
      expect(p.subject).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setSubject(5);
      }).to.throw(Error);
      expect(function() {
        p.setSubject(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setSubject();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setSubject('Test');
      p.setSubject();
      expect(p.subject).to.equal('Test');
    });
  });
});
