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

  //Add substitution
  describe('addSubstitution()', function() {
    it('should set the given value', function() {
      p.addSubstitution('test', 'Test');
      expect(p.substitutions).to.be.an.instanceof(Object);
      expect(p.substitutions).to.have.a.property('test');
      expect(p.substitutions.test).to.equal('Test');
    });
    it('should add multiple values', function() {
      p.addSubstitution('test1', 'Test1');
      p.addSubstitution('test2', 2);
      expect(p.substitutions).to.have.a.property('test1');
      expect(p.substitutions).to.have.a.property('test2');
      expect(p.substitutions.test1).to.equal('Test1');
      expect(p.substitutions.test2).to.equal(2);
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.addSubstitution('test');
      }).to.throw(Error);
      expect(function() {
        p.addSubstitution(null, 'test');
      }).to.throw(Error);
      expect(function() {
        p.addSubstitution(3, false);
      }).to.throw(Error);
    });
  });
});
