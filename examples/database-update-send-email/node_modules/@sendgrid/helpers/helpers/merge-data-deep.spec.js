'use strict';

/**
 * Dependencies
 */
const mergeDataDeep = require('./merge-data-deep');

/**
 * Tests
 */
describe('mergeDataDeep', function() {

  //Test objects
  const obj1 = {
    a: 1,
    b: 2,
    e: { g: 9 },
    arr: ['a', 'b'],
  };
  const obj2 = {
    a: 3,
    c: 3,
    d: 4,
    e: { f: 6 },
    arr: ['c'],
  };

  //Merge
  const merged = mergeDataDeep(obj1, obj2);

  //Tests
  it('should merge the two objects', function() {
    expect(merged).to.have.property('a');
    expect(merged).to.have.property('b');
    expect(merged).to.have.property('c');
    expect(merged).to.have.property('d');
    expect(merged).to.have.property('e');
    expect(merged.a).to.equal(3);
    expect(merged.e).to.have.property('f');
    expect(merged.e).to.have.property('g');
  });
  it('should throw on invalid input', function() {
    expect(function() {
      mergeDataDeep(null, obj2);
    }).to.throw(Error);
    expect(function() {
      mergeDataDeep(obj1, 4);
    }).to.throw(Error);
  });
  it('should overwrite arrays', function() {
    expect(merged).to.have.property('arr');
    expect(merged.arr).to.be.an.instanceof(Array);
    expect(merged.arr).to.have.lengthOf(1);
    expect(merged.arr[0]).to.equal('c');
  });
});
