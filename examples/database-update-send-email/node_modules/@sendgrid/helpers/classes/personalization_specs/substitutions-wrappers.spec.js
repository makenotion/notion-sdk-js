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

  //Set substitutions wrappers
  describe('setSubstitutionWrappers()', function() {
    it('should have defaults', function() {
      expect(p.substitutionWrappers).to.be.an.instanceof(Array);
      expect(p.substitutionWrappers).to.have.a.lengthOf(2);
      expect(p.substitutionWrappers[0]).to.equal('{{');
      expect(p.substitutionWrappers[1]).to.equal('}}');
    });
    it('should set the given value', function() {
      p.setSubstitutionWrappers(['a', 'b']);
      expect(p.substitutionWrappers).to.be.an.instanceof(Array);
      expect(p.substitutionWrappers).to.have.a.lengthOf(2);
      expect(p.substitutionWrappers[0]).to.equal('a');
      expect(p.substitutionWrappers[1]).to.equal('b');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setSubstitutionWrappers('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setSubstitutionWrappers(['a']);
      }).to.throw(Error);
      expect(function() {
        p.setSubstitutionWrappers(['a', 'b', 'c']);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setSubstitutionWrappers();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setSubstitutionWrappers(['a', 'b']);
      p.setSubstitutionWrappers();
      expect(p.substitutionWrappers[0]).to.equal('a');
      expect(p.substitutionWrappers[1]).to.equal('b');
    });
  });
});
