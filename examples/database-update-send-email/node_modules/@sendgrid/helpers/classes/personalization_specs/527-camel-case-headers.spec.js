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

  // camel case headers test
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
