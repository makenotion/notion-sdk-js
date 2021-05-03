'use strict';

/**
 * Dependencies
 */
const deepClone = require('./deep-clone');

/**
 * Tests
 */
describe('deepClone', function() {

  //Test object
  const obj = {
    nested: {a: 1, b: 2, c: {d: 4}},
    e: 5,
    arr: ['a', 'b'],
  };

  //Create clone
  const clone = deepClone(obj);

  //Tests
  it('should equal the objects to themselves', function() {
    expect(obj).to.equal(obj);
    expect(clone).to.equal(clone);
  });
  it('should make a copy of the object', function() {
    expect(obj).to.not.equal(clone);
    expect(obj).to.deep.equal(clone);
  });
  it('should make a copy of nested objects', function() {
    expect(obj.nested).to.not.equal(clone.nested);
    expect(obj.nested).to.deep.equal(clone.nested);
    expect(obj.nested.c).to.not.equal(clone.nested.c);
    expect(obj.nested.c).to.deep.equal(clone.nested.c);
  });
  it('should handle arrays properly', function() {
    expect(clone.arr).to.be.an.instanceof(Array);
    expect(clone.arr).to.have.lengthOf(2);
    expect(clone.arr).to.have.members(['a', 'b']);
  });
});
