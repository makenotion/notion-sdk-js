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

  //Add header
  describe('addHeader()', function() {
    it('should set the given value', function() {
      p.addHeader('test', 'Test');
      expect(p.headers).to.be.an.instanceof(Object);
      expect(p.headers).to.have.a.property('test');
      expect(p.headers.test).to.equal('Test');
    });
    it('should add multiple values', function() {
      p.addHeader('test1', 'Test1');
      p.addHeader('test2', 'Test2');
      expect(p.headers).to.have.a.property('test1');
      expect(p.headers).to.have.a.property('test2');
      expect(p.headers.test1).to.equal('Test1');
      expect(p.headers.test2).to.equal('Test2');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.addHeader('test');
      }).to.throw(Error);
      expect(function() {
        p.addHeader(null, 'test');
      }).to.throw(Error);
      expect(function() {
        p.addHeader(3, 5);
      }).to.throw(Error);
    });
  });
});
