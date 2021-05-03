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

  //Set custom args
  describe('setCustomArgs()', function() {
    it('should set the given value', function() {
      p.setCustomArgs({test: 'Test'});
      expect(p.customArgs).to.be.an.instanceof(Object);
      expect(p.customArgs).to.have.a.property('test');
      expect(p.customArgs.test).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setCustomArgs('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setCustomArgs(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setCustomArgs();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setCustomArgs({test: 'Test'});
      p.setCustomArgs();
      expect(p.customArgs.test).to.equal('Test');
    });
  });
});
