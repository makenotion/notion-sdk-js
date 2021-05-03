'use strict';

/**
 * Dependencies
 */
const Mail = require('./mail');
const { DYNAMIC_TEMPLATE_CHAR_WARNING } = require('../constants');

/**
 * Tests
 */
describe('Mail', function() {
  describe('construct', function() {
    it('shouldn\'t convert the headers to camel/snake case', function() {
      const mail = new Mail({
        personalizations: [{
          to: 'test@example.com',
          headers: {
            'test-header': 'test',
          },
        }],
        from: {
          email: 'test@example.com',
        },
        subject: 'test',
        content: [{
          type: 'text/plain',
          value: 'test',
        }],
        category: 'test',
        headers: {
          'List-Unsubscribe': '<mailto:test@test.com>',
        },
      });

      expect(mail.headers['List-Unsubscribe']).to
        .equal('<mailto:test@test.com>');

      expect(mail.toJSON().headers['List-Unsubscribe']).to
        .equal('<mailto:test@test.com>');
    });

    it('should detect dynamic template id', function() {
      const mail = new Mail({
        personalizations: [{
          to: 'test@example.com',
          headers: {
            'test-header': 'test',
          },
        }],
        from: {
          email: 'test@example.com',
        },
        templateId: 'd-df80613cccc6441ea5cd7c95377bc1ef',
        subject: 'test',
        content: [{
          type: 'text/plain',
          value: 'test',
        }],
      });
      expect(mail.isDynamic).to.equal(true);
    });

    it('should detect legacy template id', function() {
      const mail = new Mail({
        personalizations: [{
          to: 'test@example.com',
          headers: {
            'test-header': 'test',
          },
        }],
        from: {
          email: 'test@example.com',
        },
        templateId: 'df80613cccc6441ea5cd7c95377bc1ef',
        subject: 'test',
        content: [{
          type: 'text/plain',
          value: 'test',
        }],
      });
      expect(mail.isDynamic).to.equal(false);
    });

    it('should ignore substitutions if templateId is dynamic', function() {
      const mail = new Mail({
        personalizations: [{
          to: 'test@example.com',
          headers: {
            'test-header': 'test',
          },
          substitutions: {
            test2: 'Test2',
          },
          dynamicTemplateData: {
            test2: 'Testy 2',
            test3: 'Testy 3',
          },
        }],
        dynamicTemplateData: {
          test1: 'Test 1',
          test2: 'Test 2',
        },
        substitutions: {
          test1: 'Test1',
        },
        from: {
          email: 'test@example.com',
        },
        templateId: 'd-df80613cccc6441ea5cd7c95377bc1ef',
        subject: 'test',
        content: [{
          type: 'text/plain',
          value: 'test',
        }],
      });
      expect(mail.substitutions).to.equal(null);
      expect(mail.personalizations[0].substitutions).to.deep.equal({});

      expect(mail.dynamicTemplateData).to.deep.equal({ test1: 'Test 1', test2: 'Test 2' });
      expect(mail.personalizations[0].dynamicTemplateData).to.deep.equal({ test1: 'Test 1', test2: 'Testy 2', test3: 'Testy 3' });

      expect(mail.toJSON()).to.deep.equal({
        content: [
          {
            type: 'text/plain',
            value: 'test',
          },
        ],
        from: {
          email: 'test@example.com',
        },
        personalizations: [
          {
            dynamic_template_data: {
              test1: 'Test 1',
              test2: 'Testy 2',
              test3: 'Testy 3',
            },
            headers: {
              'test-header': 'test',
            },
            to: [
              {
                email: 'test@example.com',
                name: '',
              },
            ],
          },
        ],
        subject: 'test',
        template_id: 'd-df80613cccc6441ea5cd7c95377bc1ef',
      });
    });

    describe('attachments', () => {
      it('handles multiple attachments', () => {
        const mail = new Mail({
          to: 'recipient@example.org',
          attachments: [{
            content: 'test-content',
            filename: 'name-that-file',
            type: 'file-type',
          }, {
            content: 'other-content',
            filename: 'name-this-file',
            disposition: 'inline',
          }],
        });
        expect(mail.toJSON()['attachments']).to.have.a.lengthOf(2);
      });

      it('requires content', () => {
        expect(() => new Mail({
          attachments: [{
            filename: 'missing content',
          }],
        })).to.throw('content');
      });

      it('requires filename', () => {
        expect(() => new Mail({
          attachments: [{
            content: 'missing filename',
          }],
        })).to.throw('filename');
      });
    });
  });

  describe('dynamic template handlebars substitutions', () => {
    let logSpy; let data;

    beforeEach(() => {
      logSpy = sinon.spy(console, 'warn');
      data = {
        to: 'recipient@example.org',
        from: 'sender@example.org',
        subject: 'Hello world',
        text: 'Hello plain world!',
        html: '<p>Hello HTML world!</p>',
        templateId: 'd-df80613cccc6441ea5cd7c95377bc1ef',
      };
    });

    afterEach(() => {
      console.warn.restore();
    });

    it('should log an error if template subject line contains improperly escaped "\'" character', () => {
      data = Object.assign(data, {
        dynamicTemplateData: {
          subject: 'Testing Templates and \'Stuff\'',
        },
      });

      const mail = new Mail(data);

      expect(logSpy.calledOnce).to.equal(true);
      expect(logSpy.calledWith(DYNAMIC_TEMPLATE_CHAR_WARNING)).to.equal(true);
    });

    it('should log an error if template subject line contains improperly escaped """ character', () => {
      data = Object.assign(data, {
        dynamicTemplateData: {
          subject: '"Testing Templates" and Stuff',
        },
      });

      const mail = new Mail(data);

      expect(logSpy.calledOnce).to.equal(true);
      expect(logSpy.calledWith(DYNAMIC_TEMPLATE_CHAR_WARNING)).to.equal(true);
    });

    it('should log an error if template subject line contains improperly escaped "&" character', () => {
      data = Object.assign(data, {
        dynamicTemplateData: {
          subject: 'Testing Templates & Stuff',
        },
      });

      const mail = new Mail(data);

      expect(logSpy.calledOnce).to.equal(true);
      expect(logSpy.calledWith(DYNAMIC_TEMPLATE_CHAR_WARNING)).to.equal(true);
    });
  });
});
