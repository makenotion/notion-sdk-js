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
  describe('setDynamicTemplateData()', function() {
    it('should set the given value', function() {
      p.setDynamicTemplateData({ test: 'Test' });
      expect(p.dynamicTemplateData).to.be.an.instanceof(Object);
      expect(p.dynamicTemplateData).to.have.a.property('test');
      expect(p.dynamicTemplateData.test).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        p.setDynamicTemplateData('Invalid');
      }).to.throw(Error);
      expect(function() {
        p.setDynamicTemplateData(3);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        p.setDynamicTemplateData();
      }).not.to.throw(Error);
    });
    it('should not overwrite with no input', function() {
      p.setDynamicTemplateData({ test: 'Test' });
      p.setDynamicTemplateData();
      expect(p.dynamicTemplateData.test).to.equal('Test');
    });
  });
});
