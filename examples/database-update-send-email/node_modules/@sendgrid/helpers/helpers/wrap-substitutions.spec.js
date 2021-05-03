'use strict';

/**
 * Dependencies
 */
const wrapSubstitutions = require('./wrap-substitutions');

/**
 * Tests
 */
describe('wrapSubstitutions', function() {

  //Test substitutions
  const test = {
    some: 'string',
    someOther: 'string',
    'and-a-number': 3,
  };

  //Test array of substitutions
  const arr = [test, test];

  //Left/right substitutions
  const left1 = '{{';
  const right1 = '}}';
  const left2 = '[';
  const right2 = ']';

  //Wrap
  const wrap1 = wrapSubstitutions(test, left1, right1);
  const wrap2 = wrapSubstitutions(test, left2, right2);
  const wrapArr = wrapSubstitutions(arr, left1, right1);
  const wrapDefault = wrapSubstitutions(test);

  //Tests
  it('should wrap the substitution keys with the relevant wrapper', function() {
    expect(wrap1).to.have.property('{{some}}');
    expect(wrap1).to.have.property('{{someOther}}');
    expect(wrap1).to.have.property('{{and-a-number}}');
    expect(wrap2).to.have.property('[some]');
    expect(wrap2).to.have.property('[someOther]');
    expect(wrap2).to.have.property('[and-a-number]');
  });
  it('should not preserve the original keys', function() {
    expect(wrap1).not.to.have.property('some');
    expect(wrap1).not.to.have.property('someOther');
    expect(wrap1).not.to.have.property('and-a-number');
  });
  it('should convert substitutions to strings', function() {
    expect(wrap1['{{some}}']).to.be.a('string');
    expect(wrap1['{{and-a-number}}']).to.be.a('string');
  });
  it('should convert an array of substitutions', function() {
    expect(wrapArr).to.be.an('array');
    expect(wrapArr[0]).to.have.property('{{some}}');
    expect(wrapArr[1]).to.have.property('{{some}}');
  });
  it('should default to the {{}} wrapper', function() {
    expect(wrapDefault).to.have.property('{{some}}');
    expect(wrapDefault).to.have.property('{{someOther}}');
    expect(wrapDefault).to.have.property('{{and-a-number}}');
  });
});
