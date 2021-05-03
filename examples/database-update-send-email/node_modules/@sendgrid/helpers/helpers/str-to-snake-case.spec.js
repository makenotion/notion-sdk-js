'use strict';

/**
 * Dependencies
 */
const toSnakeCase = require('./str-to-snake-case');

/**
 * Tests
 */
describe('toSnakeCase', function() {
  it('should snake case an already snake cased string', function() {
    expect(toSnakeCase('snake_case')).to.equal('snake_case');
  });
  it('should snake case a camel cased string', function() {
    expect(toSnakeCase('snakeCase')).to.equal('snake_case');
    expect(toSnakeCase('SnakeCase')).to.equal('snake_case');
    expect(toSnakeCase('SnAkeCASe')).to.equal('sn_ake_c_a_se');
  });
  it('should snake case a dasherized string', function() {
    expect(toSnakeCase('snake-case')).to.equal('snake_case');
    expect(toSnakeCase('Snake-Case')).to.equal('snake_case');
  });
  it('should snake case a string with spaces', function() {
    expect(toSnakeCase('Snake Case')).to.equal('snake_case');
  });
  it('should snake case a string with multiple spaces', function() {
    expect(toSnakeCase('Snake   Case')).to.equal('snake_case');
    expect(toSnakeCase('Snake   Ca se')).to.equal('snake_ca_se');
  });
  it('should snake case a mixed string', function() {
    expect(toSnakeCase('Snake-Case mixEd Stri_ng te-st'))
      .to.equal('snake_case_mix_ed_stri_ng_te_st');
    expect(toSnakeCase('CamelCase With snake_case _and  dash-erized -andCamel'))
      .to.equal('camel_case_with_snake_case_and_dash_erized_and_camel');
  });
  it('should lowercase single letters', function() {
    expect(toSnakeCase('A')).to.equal('a');
    expect(toSnakeCase('F')).to.equal('f');
    expect(toSnakeCase('Z')).to.equal('z');
  });
  it('should trim and snake case properly with leading/trailing spaces', function() {
    expect(toSnakeCase(' TestMe ')).to.equal('test_me');
    expect(toSnakeCase('  TestMe')).to.equal('test_me');
    expect(toSnakeCase('TestMe  ')).to.equal('test_me');
    expect(toSnakeCase('  TestMe  ')).to.equal('test_me');
  });
  it('should throw an error for non string input', function() {
    expect(function() {
      toSnakeCase(2);
    }).to.throw(Error);
    expect(function() {
      toSnakeCase(null);
    }).to.throw(Error);
  });
});
