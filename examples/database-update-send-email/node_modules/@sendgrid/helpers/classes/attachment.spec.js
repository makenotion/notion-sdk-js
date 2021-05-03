'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Dependencies
 */
const Attachment = require('./attachment');

/**
 * Tests
 */
describe('Attachment', function() {
  let attachment;
  beforeEach(function() {
    attachment = new Attachment();
  });

  //Set content as string
  describe('setContent(), string', function() {
    it('should set string as content', function() {
      attachment.setContent('Just a string.');
      expect(attachment.content).to.equal('Just a string.');
    });
  });

  //Set content as stream
  describe('setContent(), stream', function() {
    it('should convert stream to string and set as content', function() {
      const fileData = fs.readFileSync('./packages/helpers/attachment.txt');
      attachment.setContent(fileData);
      expect(attachment.content).to.equal('Just a little file for testing attachments.');
    });
  });

  //Set content as wrong type
  describe('setContent(), wrong type', function() {
    it('should not allow setting content of wrong type', function() {
      expect(() => attachment.setContent(null)).to.throw('`content` expected to be either Buffer or string');
    });
  });

  //Constructor
  describe('constructor(data)', function() {
    it('should not accept both content and filePath', function() {
      expect(function() {
        attachment = new Attachment({
          filename: 'attachment.txt',
          type: 'plain/text',
          disposition: 'attachment',
          contentId: 'myattachment',
          content: '',
          filePath: '',
        });
      }).to.throw(Error);
    });
  });
});

//Set content
describe('setContent()', function() {
  let attachment;

  beforeEach(function() {
    attachment = new Attachment({
      filename: 'attachment.txt',
      type: 'plain/text',
      disposition: 'attachment',
      contentId: 'myattachment',
      content: 'SGVsbG8gV29ybGQK',
    });
  });

  it('should set the given value', function() {
    expect(attachment.content).to.equal('SGVsbG8gV29ybGQK');
  });

  it('should accept a buffer', function() {
    attachment.setContent(new Buffer('Hello World\n'));
    expect(attachment.content).to.equal('SGVsbG8gV29ybGQK');
  });

  it('should accept a raw file', function() {
    attachment = new Attachment({
      filename: 'attachment.txt',
      type: 'plain/text',
      disposition: 'attachment',
      contentId: 'myattachment',
      filePath: path.join(__dirname, '/attachment.js'),
    });

    expect(attachment.content).to.be.a('string');
  });
});
