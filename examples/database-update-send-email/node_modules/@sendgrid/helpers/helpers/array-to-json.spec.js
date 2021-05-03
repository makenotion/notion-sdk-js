'use strict';

/**
 * Dependencies
 */
const arrayToJSON = require('./array-to-json');

/**
 * Tests
 */
describe('arrayToJSON', function() {

  //Test object with toJSON function
  const obj1 = {
    toJSON() {
      return {a: 1, b: 2};
    },
  };

  //Test plain object
  const obj2 = {c: 3, d: 4};

  //Create mixed array
  const test = [obj1, obj2, null, obj2, obj1, 2, 'test'];
  const json = arrayToJSON(test);

  //Tests
  it('should leave non object values as is', function() {
    expect(json[2]).to.be.null();
    expect(json[5]).to.equal(2);
    expect(json[6]).to.equal('test');
  });
  it('should leave plain objects as they are', function() {
    expect(json[1]).to.have.property('c');
    expect(json[3]).to.have.property('d');
  });
  it('should use the toJSON() handler if specified', function() {
    expect(json[0]).to.have.property('a');
    expect(json[4]).to.have.property('b');
  });
});
