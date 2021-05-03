'use strict';

/**
 * Dependencies
 */
const {Client} = require('@sendgrid/client');
const {classes: {Mail}} = require('@sendgrid/helpers');

/**
 * Mail service class
 */
class MailService {

  /**
   * Constructor
   */
  constructor() {

    // Set client, initialize substitution wrappers and secret rules filter.
    this.setClient(new Client());
    this.setSubstitutionWrappers('{{', '}}');
    this.secretRules = [];
  }

  /**
   * Set client
   */
  setClient(client) {
    this.client = client;

    return this;
  }

  /**
   * SendGrid API key passthrough for convenience.
   */
  setApiKey(apiKey) {
    this.client.setApiKey(apiKey);

    return this;
  }

  /**
   * Twilio Email Auth passthrough for convenience.
   */
  setTwilioEmailAuth(username, password) {
    this.client.setTwilioEmailAuth(username, password);
  }

  /**
   * Set client timeout
   */
  setTimeout(timeout) {
    if (typeof timeout === 'undefined') {
      return;
    }

    this.client.setDefaultRequest('timeout', timeout);
  }

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(left, right) {
    if (typeof left === 'undefined' || typeof right === 'undefined') {
      throw new Error('Must provide both left and right side wrappers');
    }
    if (!Array.isArray(this.substitutionWrappers)) {
      this.substitutionWrappers = [];
    }
    this.substitutionWrappers[0] = left;
    this.substitutionWrappers[1] = right;

    return this;
  }

  /**
   * Set secret rules for filtering the e-mail content
   */
  setSecretRules(rules) {
    if (!(rules instanceof Array)) {
      rules = [rules];
    }

    const tmpRules = rules.map(function (rule) {
      const ruleType = typeof rule;

      if (ruleType === 'string') {
        return {
          pattern: new RegExp(rule),
        };
      } else if (ruleType === 'object') {
        // normalize rule object
        if (rule instanceof RegExp) {
          rule = {
            pattern: rule,
          };
        } else if (rule.hasOwnProperty('pattern')
          && (typeof rule.pattern === 'string')
        ) {
          rule.pattern = new RegExp(rule.pattern);
        }

        try {
          // test if rule.pattern is a valid regex
          rule.pattern.test('');
          return rule;
        } catch (err) {
          // continue regardless of error
        }
      }
    });

    this.secretRules = tmpRules.filter(function (val) {
      return val;
    });
  }

  /**
   * Check if the e-mail is safe to be sent
   */
  filterSecrets(body) {
    if ((typeof body === 'object') && !body.hasOwnProperty('content')) {
      return;
    }

    const self = this;

    body.content.forEach(function (data) {
      self.secretRules.forEach(function (rule) {
        if (rule.hasOwnProperty('pattern')
          && !rule.pattern.test(data.value)
        ) {
          return;
        }

        let message = `The pattern '${rule.pattern}'`;

        if (rule.name) {
          message += `identified by '${rule.name}'`;
        }

        message += ' was found in the Mail content!';

        throw new Error(message);
      });
    });
  }

  /**
   * Send email
   */
  send(data, isMultiple = false, cb) {

    //Callback as second parameter
    if (typeof isMultiple === 'function') {
      cb = isMultiple;
      isMultiple = false;
    }

    //Array? Send in parallel
    if (Array.isArray(data)) {

      //Create promise
      const promise = Promise.all(data.map(item => {
        return this.send(item, isMultiple);
      }));

      //Execute callback if provided
      if (cb) {
        promise
          .then(result => cb(null, result))
          .catch(error => cb(error, null));
      }

      //Return promise
      return promise;
    }

    //Send mail
    try {

      //Append multiple flag to data if not set
      if (typeof data.isMultiple === 'undefined') {
        data.isMultiple = isMultiple;
      }

      //Append global substitution wrappers if not set in data
      if (typeof data.substitutionWrappers === 'undefined') {
        data.substitutionWrappers = this.substitutionWrappers;
      }

      //Create Mail instance from data and get JSON body for request
      const mail = Mail.create(data);
      const body = mail.toJSON();

      //Filters the Mail body to avoid sensitive content leakage
      this.filterSecrets(body);

      //Create request
      const request = {
        method: 'POST',
        url: '/v3/mail/send',
        body,
      };

      //Send
      return this.client.request(request, cb);
    } catch (error) {

      //Pass to callback if provided
      if (cb) {
        // eslint-disable-next-line callback-return
        cb(error, null);
      }

      //Reject promise
      return Promise.reject(error);
    }
  }

  /**
   * Send multiple emails (shortcut)
   */
  sendMultiple(data, cb) {
    return this.send(data, true, cb);
  }
}

//Export class
module.exports = MailService;
