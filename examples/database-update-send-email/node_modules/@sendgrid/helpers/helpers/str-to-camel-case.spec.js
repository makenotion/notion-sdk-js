'use strict';

/**
 * Dependencies
 */
const toCamelCase = require('./str-to-camel-case');

/**
 * Tests
 */
describe('toCamelCase', function() {
  it('should camel case an already camel cased string', function() {
    expect(toCamelCase('camelCase')).to.equal('camelCase');
  });
  it('should camel case a snake cased string', function() {
    expect(toCamelCase('camel_case')).to.equal('camelCase');
  });
  it('should camel case a dasherized string', function() {
    expect(toCamelCase('camel-case')).to.equal('camelCase');
  });
  it('should camel case a string with spaces', function() {
    expect(toCamelCase('camel case')).to.equal('camelCase');
  });
  it('should camel case a string with multiple spaces', function() {
    expect(toCamelCase('camel   case')).to.equal('camelCase');
    expect(toCamelCase('camel   ca se')).to.equal('camelCaSe');
  });
  it('should camel case a mixed string', function() {
    expect(toCamelCase('CamelCase With snake_case _and  dash-erized -andCamel'))
      .to.equal('camelCaseWithSnakeCaseAndDashErizedAndCamel');
    expect(toCamelCase('camel_case With  vari-ety andCamel'))
      .to.equal('camelCaseWithVariEtyAndCamel');
  });
  it('should lowercase single letters', function() {
    expect(toCamelCase('A')).to.equal('a');
    expect(toCamelCase('F')).to.equal('f');
    expect(toCamelCase('Z')).to.equal('z');
  });
  it('should trim and camel case properly with leading/trailing spaces', function() {
    expect(toCamelCase(' test_me ')).to.equal('testMe');
    expect(toCamelCase('  test_me')).to.equal('testMe');
    expect(toCamelCase('test_me  ')).to.equal('testMe');
    expect(toCamelCase('  test_me  ')).to.equal('testMe');
  });
  it('should throw an error for non string input', function() {
    expect(function() {
      toCamelCase(2);
    }).to.throw(Error);
    expect(function() {
      toCamelCase(null);
    }).to.throw(Error);
  });
});
