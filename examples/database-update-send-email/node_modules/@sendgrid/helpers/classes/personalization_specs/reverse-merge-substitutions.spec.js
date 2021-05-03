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

  //Reverse merge substitutions
  describe('reverseMergeSubstitutions()', function() {
    it('should reverse merge substitutions', function() {
      p.setSubstitutions({test1: 'Test1'});
      p.reverseMergeSubstitutions({test2: 'Test2'});
      expect(p.substitutions).to.have.a.property('test1');
      expect(p.substitutions).to.have.a.property('test2');
      expect(p.substitutions.test1).to.equal('Test1');
      expect(p.substitutions.test2).to.equal('Test2');
    });
    it('should not overwrite existing keys', function() {
      p.setSubstitutions({test1: 'Test1'});
      p.reverseMergeSubstitutions({test1: 'Test3', test2: 'Test2'});
      expect(p.substitutions).to.have.a.property('test1');
      expect(p.substitutions).to.have.a.property('test2');
      expect(p.substitutions.test1).to.equal('Test1');
      expect(p.substitutions.test2).to.equal('Test2');
    });
    it('should work without prior substitutions', function() {
      p.reverseMergeSubstitutions({test2: 'Test2'});
      expect(p.substitutions).to.have.a.property('test2');
      expect(p.substitutions.test2).to.equal('Test2');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.reverseMergeSubstitutions(3);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.reverseMergeSubstitutions();
      }).not.to.throw(Error);
    });
  });
});
