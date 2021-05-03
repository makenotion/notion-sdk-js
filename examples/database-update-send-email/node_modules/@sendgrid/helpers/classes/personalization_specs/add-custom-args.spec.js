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

  //Add custom arg
  describe('addCustomArg()', function() {
    it('should set the given value', function() {
      p.addCustomArg('test', 'Test');
      expect(p.customArgs).to.be.an.instanceof(Object);
      expect(p.customArgs).to.have.a.property('test');
      expect(p.customArgs.test).to.equal('Test');
    });
    it('should add multiple values', function() {
      p.addCustomArg('test1', 'Test1');
      p.addCustomArg('test2', 'Test2');
      expect(p.customArgs).to.have.a.property('test1');
      expect(p.customArgs).to.have.a.property('test2');
      expect(p.customArgs.test1).to.equal('Test1');
      expect(p.customArgs.test2).to.equal('Test2');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.addCustomArg('test');
      }).to.throw(Error);
      expect(function() {
        p.addCustomArg(null, 'test');
      }).to.throw(Error);
      expect(function() {
        p.addCustomArg(3, 5);
      }).to.throw(Error);
    });
  });
});
