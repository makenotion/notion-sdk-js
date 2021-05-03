'use strict';

/**
 * Dependencies
 */
const splitNameEmail = require('./split-name-email');

/**
 * Tests
 */
describe('splitNameEmail', function() {
  it('should not split strings without < symbol', function() {
    const [name, email] = splitNameEmail('test@test.com');
    expect(name).to.equal('');
    expect(email).to.equal('test@test.com');
  });
  it('should split strings with < symbol', function() {
    const [name, email] = splitNameEmail('Tester <test@test.com>');
    expect(name).to.equal('Tester');
    expect(email).to.equal('test@test.com');
  });
});
