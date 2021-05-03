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

  //Set send at
  describe('setSendAt()', function() {
    it('should set the given value', function() {
      p.setSendAt(1500077141);
      expect(p.sendAt).to.equal(1500077141);
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setSendAt('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setSendAt(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setSendAt();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setSendAt(1500077141);
      p.setSendAt();
      expect(p.sendAt).to.equal(1500077141);
    });
  });
});
