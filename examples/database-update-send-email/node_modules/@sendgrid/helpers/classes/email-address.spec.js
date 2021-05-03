'use strict';

/**
 * Dependencies
 */
const EmailAddress = require('./email-address');

/**
 * Tests
 */
describe('EmailAddress', function() {

  //Test data
  const data = [
    'test@example.org',
    'Test <test@example.org>',
    {name: 'Test', email: 'test@example.org'},
  ];

  //Set email
  describe('setEmail()', function() {
    let email;
    beforeEach(function() {
      email = new EmailAddress();
    });

    it('should set the email address', function() {
      email.setEmail('test@example.org');
      expect(email.email).to.equal('test@example.org');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        email.setEmail(5);
      }).to.throw(Error);
      expect(function() {
        email.setEmail(null);
      }).to.throw(Error);
    });
    it('should throw an error for no input', function() {
      expect(function() {
        email.setEmail();
      }).to.throw(Error);
    });
  });

  //Set name
  describe('setName()', function() {
    let email;
    beforeEach(function() {
      email = new EmailAddress();
    });

    it('should set the name', function() {
      email.setName('Test');
      expect(email.name).to.equal('Test');
    });

    it('should not wrap name in quotes if a comma is present', function() {
      email.setName('Doe, John');
      expect(email.name).to.equal('Doe, John');
    });

    it('should not double wrap in quotes', function() {
      email.setName('\"Doe, John\"');
      expect(email.name).to.equal('\"Doe, John\"');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        email.setName(5);
      }).to.throw(Error);
      expect(function() {
        email.setName(null);
      }).to.throw(Error);
    });
    it('should accept no input', function() {
      expect(function() {
        email.setName();
      }).not.to.throw(Error);
    });
  });

  //To JSON
  describe('toJSON()', function() {
    let emails;
    beforeEach(function() {
      emails = data.map(email => EmailAddress.create(email));
    });

    it('should always have the email field', function() {
      emails.forEach(email => {
        const json = email.toJSON();
        expect(json).to.have.property('email');
        expect(json.email).to.equal(email.email);
      });
    });
    it('should have the name field if given', function() {
      emails.filter(email => email.name !== '').forEach(email => {
        const json = email.toJSON();
        expect(json).to.have.property('name');
        expect(json.name).to.equal(email.name);
      });
    });
    it('should not have the name field if not given', function() {
      emails.filter(email => email.name === '').forEach(email => {
        const json = email.toJSON();
        expect(json).not.to.have.property('name');
      });
    });
  });

  //From data
  describe('fromData()', function() {
    let email;
    beforeEach(function() {
      email = new EmailAddress();
    });

    it('should handle email address strings', function() {
      email.fromData(data[0]);
      expect(email.email).to.equal('test@example.org');
      expect(email.name).to.equal('');
    });
    it('should handle name and email address strings', function() {
      email.fromData(data[1]);
      expect(email.email).to.equal('test@example.org');
      expect(email.name).to.equal('Test');
    });
    it('should handle objects', function() {
      email.fromData(data[2]);
      expect(email.email).to.equal('test@example.org');
      expect(email.name).to.equal('Test');
    });
    it('should throw an error for invalid input', function() {
      expect(function() {
        email.fromData(5);
      }).to.throw(Error);
    });
  });

  //Static create method
  describe('create()', function() {
    let emails;
    beforeEach(function() {
      emails = data.map(email => EmailAddress.create(email));
    });

    it('should create email address instances from given data', function() {
      emails.forEach(email => {
        expect(email).to.be.an.instanceof(EmailAddress);
      });
    });
    it('should have the expected properties for each email', function() {
      emails.forEach(email => {
        expect(email).to.have.property('email');
        expect(email).to.have.property('name');
      });
    });
    it('should handle arrays', function() {
      const emailsArr = EmailAddress.create(data);
      expect(emailsArr).to.be.an.instanceof(Array);
      expect(emailsArr).to.have.lengthOf(3);
      emailsArr.forEach(email => {
        expect(email).to.be.an.instanceof(EmailAddress);
        expect(email).to.have.property('email');
        expect(email).to.have.property('name');
      });
    });
    it('should handle instances of EmailAddress', function() {
      const email1 = new EmailAddress({email: 'test@example.org'});
      const email2 = EmailAddress.create(email1);
      expect(email2).to.be.an.instanceof(EmailAddress);
      expect(email2.email).to.equal(email1.email);
    });
  });
});
