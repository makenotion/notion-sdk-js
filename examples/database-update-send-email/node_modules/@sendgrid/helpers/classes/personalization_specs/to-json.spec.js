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

  //JSON conversion
  describe('toJSON()', function() {
    beforeEach(function() {
      p.setTo('test@example.org');
    });

    it('should always have the to field', function() {
      const json = p.toJSON();
      expect(json).to.have.property('to');
      expect(json.to).to.be.an.instanceof(Array);
      expect(json.to).to.have.a.lengthOf(1);
      expect(json.to[0]).to.be.an.instanceof(EmailAddress);
      expect(json.to[0].email).to.equal('test@example.org');
    });
    it('should set the cc field', function() {
      p.setCc('testcc@example.org');
      const json = p.toJSON();
      expect(json).to.have.property('cc');
      expect(json.cc).to.be.an.instanceof(Array);
      expect(json.cc).to.have.a.lengthOf(1);
      expect(json.cc[0]).to.be.an.instanceof(EmailAddress);
      expect(json.cc[0].email).to.equal('testcc@example.org');
    });
    it('should set the bcc field', function() {
      p.setBcc('testbcc@example.org');
      const json = p.toJSON();
      expect(json).to.have.property('bcc');
      expect(json.bcc).to.be.an.instanceof(Array);
      expect(json.bcc).to.have.a.lengthOf(1);
      expect(json.bcc[0]).to.be.an.instanceof(EmailAddress);
      expect(json.bcc[0].email).to.equal('testbcc@example.org');
    });
    it('should set the headers field', function() {
      p.setHeaders({ test: 'Test' });
      const json = p.toJSON();
      expect(json).to.have.property('headers');
      expect(json.headers).to.be.an.instanceof(Object);
      expect(json.headers.test).to.equal('Test');
    });
    it('should set the custom_args field', function() {
      p.setCustomArgs({ test: 'Test' });
      const json = p.toJSON();
      expect(json).to.have.property('custom_args');
      expect(json.custom_args).to.be.an.instanceof(Object);
      expect(json.custom_args.test).to.equal('Test');
    });
    it('should set the substitutions field', function() {
      p.setSubstitutions({ test: 'Test' });
      const json = p.toJSON();
      expect(json).to.have.property('substitutions');
      expect(json.substitutions).to.be.an.instanceof(Object);
    });
    it('should apply wrappers to the substitutions', function() {
      p.setSubstitutions({ test: 'Test', otherTest2: 'Test2' });
      p.setSubstitutionWrappers(['{{', '}}']);
      const json = p.toJSON();
      expect(json.substitutions).to.have.property('{{test}}');
      expect(json.substitutions).to.have.property('{{otherTest2}}');
      expect(json.substitutions['{{test}}']).to.equal('Test');
      expect(json.substitutions['{{otherTest2}}']).to.equal('Test2');
      expect(json.substitutions).not.to.have.property('test');
      expect(json.substitutions).not.to.have.property('otherTest2');
    });
    it('should set the dynamicTemplateData field', function() {
      p.setDynamicTemplateData({ test: 'Test' });
      const json = p.toJSON();
      expect(json).to.have.property('dynamic_template_data');
      expect(json.dynamic_template_data).to.be.an.instanceof(Object);
    });
    it('should set the subject field', function() {
      p.setSubject('Test');
      const json = p.toJSON();
      expect(json).to.have.property('subject');
      expect(json.subject).to.equal('Test');
    });
    it('should set the send_at field', function() {
      p.setSendAt(555);
      const json = p.toJSON();
      expect(json).to.have.property('send_at');
      expect(json.send_at).to.equal(555);
    });
    it('should not modify the keys of substitutions and custom args', () => {
      const data = {
        to: 'to@example.org',
        customArgs: { snake_case: 'Test', T_EST: 'Test', camelCase: 'Test' },
        substitutions: { snake_case: 'Test', T_EST: 'Test', camelCase: 'Test' },
      };
      p.fromData(data);
      const json = p.toJSON();
      expect(json.substitutions).to.have.property('{{T_EST}}');
      expect(json.substitutions).to.have.property('{{camelCase}}');
      expect(json.substitutions).to.have.property('{{snake_case}}');
      expect(json.substitutions['{{T_EST}}']).to.equal('Test');
      expect(json.substitutions['{{camelCase}}']).to.equal('Test');
      expect(json.substitutions['{{snake_case}}']).to.equal('Test');
      expect(json.custom_args).to.have.property('T_EST');
      expect(json.custom_args).to.have.property('camelCase');
      expect(json.custom_args).to.have.property('snake_case');
      expect(json.custom_args.T_EST).to.equal('Test');
      expect(json.custom_args.camelCase).to.equal('Test');
      expect(json.custom_args.snake_case).to.equal('Test');
    });
    it('should not modify the keys of dynamic template data', () => {
      const data = {
        to: 'to@example.org',
        dynamicTemplateData: { snake_case: 'Test', T_EST: 'Test', camelCase: 'Test' },
      };
      p.fromData(data);
      const json = p.toJSON();
      expect(json.dynamic_template_data).to.have.property('T_EST');
      expect(json.dynamic_template_data).to.have.property('camelCase');
      expect(json.dynamic_template_data).to.have.property('snake_case');
      expect(json.dynamic_template_data.T_EST).to.equal('Test');
      expect(json.dynamic_template_data.camelCase).to.equal('Test');
      expect(json.dynamic_template_data.snake_case).to.equal('Test');
    });
  });
});
