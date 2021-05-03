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

  //Set headers
  describe('setHeaders()', function() {
    it('should set the given value', function() {
      p.setHeaders({test: 'Test'});
      expect(p.headers).to.be.an.instanceof(Object);
      expect(p.headers).to.have.a.property('test');
      expect(p.headers.test).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setHeaders('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setHeaders(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setHeaders();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setHeaders({test: 'Test'});
      p.setHeaders();
      expect(p.headers.test).to.equal('Test');
    });
  });
});
