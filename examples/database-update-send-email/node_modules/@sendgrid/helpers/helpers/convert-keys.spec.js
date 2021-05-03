'use strict';

/**
 * Dependencies
 */
const convertKeys = require('./convert-keys');
const deepClone = require('./deep-clone');
const strToCamelCase = require('./str-to-camel-case');

/**
 * Tests
 */
describe('convertKeys', function() {

  //Test object
  const obj = {
    a: 1,
    snake_case: 2,
    camelCase: 3,
    nested_snake_case: {
      a: 1,
      snake_case: 2,
      camelCase: 3,
    },
    nestedCamelCase: {
      a: 1,
      snake_case: 2,
      camelCase: 3,
    },
    arr: ['a', 'b'],
  };

  //Create copy of the object
  const objCopy = deepClone(obj);

  //Convert keys
  convertKeys(obj, strToCamelCase);

  //Tests
  it('should convert top level keys properly', function() {
    expect(obj).to.have.property('a');
    expect(obj).to.have.property('snakeCase');
    expect(obj).to.have.property('camelCase');
    expect(obj).to.have.property('nestedSnakeCase');
    expect(obj).to.have.property('nestedCamelCase');
    expect(obj).not.to.have.property('snake_case');
    expect(obj).not.to.have.property('nested_snake_case');
  });
  it('should convert nested keys properly', function() {
    expect(obj.nestedSnakeCase).to.have.property('a');
    expect(obj.nestedSnakeCase).to.have.property('snakeCase');
    expect(obj.nestedSnakeCase).to.have.property('camelCase');
    expect(obj.nestedSnakeCase).not.to.have.property('snake_case');
    expect(obj.nestedCamelCase).to.have.property('a');
    expect(obj.nestedCamelCase).to.have.property('snakeCase');
    expect(obj.nestedCamelCase).to.have.property('camelCase');
    expect(obj.nestedCamelCase).not.to.have.property('snake_case');
  });
  it('should handle arrays properly', function() {
    expect(obj.arr).to.be.an.instanceof(Array);
    expect(obj.arr).to.have.lengthOf(2);
    expect(obj.arr).to.have.members(['a', 'b']);
  });
  it('should not converted nested objects if ignored', function() {
    convertKeys(objCopy, strToCamelCase, ['nestedSnakeCase']);
    expect(objCopy.nestedCamelCase).to.have.property('a');
    expect(objCopy.nestedCamelCase).to.have.property('snakeCase');
    expect(objCopy.nestedCamelCase).to.have.property('camelCase');
    expect(objCopy.nestedCamelCase).not.to.have.property('snake_case');
    expect(objCopy.nestedSnakeCase).to.have.property('a');
    expect(objCopy.nestedSnakeCase).to.have.property('camelCase');
    expect(objCopy.nestedSnakeCase).to.have.property('snake_case');
    expect(objCopy.nestedSnakeCase).not.to.have.property('snakeCase');
  });
  it('should throw an error for non object input', function() {
    expect(function() {
      convertKeys(null);
    }).to.throw(Error);
    expect(function() {
      convertKeys(5);
    }).to.throw(Error);
  });
});
