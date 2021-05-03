'use strict';

/**
 * Dependencies
 */
const convertHTML2PlainString = require('./html-to-plain-text');

/**
 * Tests
 */
describe('convertHTML2PlainString', function() {

  //Test string with one html tag
  const html1 = '<p>Hello world</p>';

  //Test string with nested html tags
  const html2 = '<div><p>Hello <b>World!</b></p></div>';

  //Test string with html tag with attributes
  const html3 = '<div class="test-class">Hello World!</div>';

  //Tests
  it('should strip out html tags', function() {
    expect(convertHTML2PlainString(html1)).to.be.equal('Hello world');
  });
  it('should strip out nested html tags', function() {
    expect(convertHTML2PlainString(html2)).to.be.equal('Hello World!');
  });
  it('should strip out html tags with attributes', function() {
    expect(convertHTML2PlainString(html3)).to.be.equal('Hello World!');
  });
});
