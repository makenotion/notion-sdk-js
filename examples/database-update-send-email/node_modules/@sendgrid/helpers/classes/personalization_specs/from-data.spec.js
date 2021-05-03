'use strict';

/**
 * Dependencies
 */
const Personalization = require('../personalization');
const EmailAddress = require('../email-address');

/**
 * Tests
 */
describe('Personalization', function() {

  //Create new personalization before each test
  let p;
  beforeEach(function() {
    p = new Personalization();
  });

  //From data
  describe('fromData()', function() {

    //Data
    const data = {
      to: 'to@example.org',
      cc: ['cc1@example.org', 'cc2@example.org'],
      bcc: ['bcc1@example.org', 'bcc2@example.org'],
      subject: 'Test',
      sendAt: 1000,
      headers: {test: 'Test'},
      customArgs: {snake_case: 'Test', T_EST: 'Test', camelCase: 'Test'},
      substitutions: {snake_case: 'Test', T_EST: 'Test', camelCase: 'Test'},
      substitutionWrappers: ['[', ']'],
    };

    //Tests
    it('should call fromData() from the constructor', () => {
      p = new Personalization(data);
      expect(p.to[0].email).to.equal('to@example.org');
      expect(p.subject).to.equal('Test');
    });
    it('should throw an error for invalid input', () => {
      expect(function() {
        p.fromData(5);
      }).to.throw(Error);
    });
    it('should have set all properties', () => {
      p.fromData(data);
      expect(p.to[0].email).to.equal('to@example.org');
      expect(p.cc[0].email).to.equal('cc1@example.org');
      expect(p.cc[1].email).to.equal('cc2@example.org');
      expect(p.bcc[0].email).to.equal('bcc1@example.org');
      expect(p.bcc[1].email).to.equal('bcc2@example.org');
      expect(p.subject).to.equal('Test');
      expect(p.sendAt).to.equal(1000);
      expect(p.headers.test).to.equal('Test');
      expect(p.customArgs.snake_case).to.equal('Test');
      expect(p.substitutions.snake_case).to.equal('Test');
      expect(p.substitutionWrappers).to.have.members(['[', ']']);
    });
    it('should not modify the keys of substitutions and custom args', () => {
      p.fromData(data);
      expect(p.substitutions.T_EST).to.equal('Test');
      expect(p.substitutions.camelCase).to.equal('Test');
      expect(p.substitutions.snake_case).to.equal('Test');
      expect(p.customArgs.T_EST).to.equal('Test');
      expect(p.customArgs.camelCase).to.equal('Test');
      expect(p.customArgs.snake_case).to.equal('Test');
    });
  });

  describe('#527', function() {
    it('shouldn\'t convert the headers to camel/snake case', function() {
      const p = new Personalization({
        to: 'test@example.com',
        headers: {
          'List-Unsubscribe': '<mailto:test@test.com>',
        },
      });

      expect(p.headers['List-Unsubscribe']).to.equal('<mailto:test@test.com>');

      expect(p.toJSON().headers['List-Unsubscribe']).to
        .equal('<mailto:test@test.com>');
    });
  });
});
