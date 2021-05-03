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

  //Set substitutions
  describe('setSubstitutions()', function() {
    it('should set the given value', function() {
      p.setSubstitutions({test: 'Test'});
      expect(p.substitutions).to.be.an.instanceof(Object);
      expect(p.substitutions).to.have.a.property('test');
      expect(p.substitutions.test).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setSubstitutions('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setSubstitutions(3);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setSubstitutions();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setSubstitutions({test: 'Test'});
      p.setSubstitutions();
      expect(p.substitutions.test).to.equal('Test');
    });
  });
});
