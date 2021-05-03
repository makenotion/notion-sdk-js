'use strict';

/**
 * Dependencies
 */
const EmailAddress = require('./email-address');
const toCamelCase = require('../helpers/to-camel-case');
const toSnakeCase = require('../helpers/to-snake-case');
const deepClone = require('../helpers/deep-clone');
const deepMerge = require('deepmerge');
const wrapSubstitutions = require('../helpers/wrap-substitutions');

/**
 * Personalization class
 */
class Personalization {

  /**
   * Constructor
   */
  constructor(data) {

    //Init array and object placeholders
    this.to = [];
    this.cc = [];
    this.bcc = [];
    this.headers = {};
    this.customArgs = {};
    this.substitutions = {};
    this.substitutionWrappers = ['{{', '}}'];
    this.dynamicTemplateData = {};

    //Build from data if given
    if (data) {
      this.fromData(data);
    }
  }

  /**
   * From data
   */
  fromData(data) {

    //Expecting object
    if (typeof data !== 'object') {
      throw new Error('Expecting object for Mail data');
    }

    //Convert to camel case to make it workable, making a copy to prevent
    //changes to the original objects
    data = deepClone(data);
    data = toCamelCase(data, ['substitutions', 'dynamicTemplateData', 'customArgs', 'headers']);

    //Extract properties from data
    const {
      to, cc, bcc, subject, headers, customArgs, sendAt,
      substitutions, substitutionWrappers, dynamicTemplateData,
    } = data;

    //Set data
    this.setTo(to);
    this.setCc(cc);
    this.setBcc(bcc);
    this.setSubject(subject);
    this.setHeaders(headers);
    this.setSubstitutions(substitutions);
    this.setSubstitutionWrappers(substitutionWrappers);
    this.setCustomArgs(customArgs);
    this.setDynamicTemplateData(dynamicTemplateData);
    this.setSendAt(sendAt);
  }

  /**
   * Set subject
   */
  setSubject(subject) {
    if (typeof subject === 'undefined') {
      return;
    }
    if (typeof subject !== 'string') {
      throw new Error('String expected for `subject`');
    }
    this.subject = subject;
  }

  /**
   * Set send at
   */
  setSendAt(sendAt) {
    if (typeof sendAt === 'undefined') {
      return;
    }
    if (!Number.isInteger(sendAt)) {
      throw new Error('Integer expected for `sendAt`');
    }
    this.sendAt = sendAt;
  }

  /**
   * Set to
   */
  setTo(to) {
    if (typeof to === 'undefined') {
      return;
    }
    if (!Array.isArray(to)) {
      to = [to];
    }
    this.to = EmailAddress.create(to);
  }

  /**
   * Add a single to
   */
  addTo(to) {
    if (typeof to === 'undefined') {
      return;
    }
    this.to.push(EmailAddress.create(to));
  }

  /**
   * Set cc
   */
  setCc(cc) {
    if (typeof cc === 'undefined') {
      return;
    }
    if (!Array.isArray(cc)) {
      cc = [cc];
    }
    this.cc = EmailAddress.create(cc);
  }

  /**
   * Add a single cc
   */
  addCc(cc) {
    if (typeof cc === 'undefined') {
      return;
    }
    this.cc.push(EmailAddress.create(cc));
  }

  /**
   * Set bcc
   */
  setBcc(bcc) {
    if (typeof bcc === 'undefined') {
      return;
    }
    if (!Array.isArray(bcc)) {
      bcc = [bcc];
    }
    this.bcc = EmailAddress.create(bcc);
  }

  /**
   * Add a single bcc
   */
  addBcc(bcc) {
    if (typeof bcc === 'undefined') {
      return;
    }
    this.bcc.push(EmailAddress.create(bcc));
  }

  /**
   * Set headers
   */
  setHeaders(headers) {
    if (typeof headers === 'undefined') {
      return;
    }
    if (typeof headers !== 'object' || headers === null) {
      throw new Error('Object expected for `headers`');
    }
    this.headers = headers;
  }

  /**
   * Add a header
   */
  addHeader(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for header key');
    }
    if (typeof value !== 'string') {
      throw new Error('String expected for header value');
    }
    this.headers[key] = value;
  }

  /**
   * Set custom args
   */
  setCustomArgs(customArgs) {
    if (typeof customArgs === 'undefined') {
      return;
    }
    if (typeof customArgs !== 'object' || customArgs === null) {
      throw new Error('Object expected for `customArgs`');
    }
    this.customArgs = customArgs;
  }

  /**
   * Add a custom arg
   */
  addCustomArg(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for custom arg key');
    }
    if (typeof value !== 'string') {
      throw new Error('String expected for custom arg value');
    }
    this.customArgs[key] = value;
  }

  /**
   * Set substitutions
   */
  setSubstitutions(substitutions) {
    if (typeof substitutions === 'undefined') {
      return;
    }
    if (typeof substitutions !== 'object') {
      throw new Error('Object expected for `substitutions`');
    }
    this.substitutions = substitutions;
  }

  /**
   * Add a substitution
   */
  addSubstitution(key, value) {
    if (typeof key !== 'string') {
      throw new Error('String expected for substitution key');
    }
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new Error('String or Number expected for substitution value');
    }
    this.substitutions[key] = value;
  }

  /**
   * Reverse merge substitutions, preserving existing ones
   */
  reverseMergeSubstitutions(substitutions) {
    if (typeof substitutions === 'undefined' || substitutions === null) {
      return;
    }
    if (typeof substitutions !== 'object') {
      throw new Error(
        'Object expected for `substitutions` in reverseMergeSubstitutions'
      );
    }
    this.substitutions = Object.assign({}, substitutions, this.substitutions);
  }

  /**
   * Set substitution wrappers
   */
  setSubstitutionWrappers(wrappers) {
    if (typeof wrappers === 'undefined' || wrappers === null) {
      return;
    }

    if (!Array.isArray(wrappers) || wrappers.length !== 2) {
      throw new Error(
        'Array expected with two elements for `substitutionWrappers`'
      );
    }
    this.substitutionWrappers = wrappers;
  }

  /**
   * Reverse merge dynamic template data, preserving existing ones
   */
  deepMergeDynamicTemplateData(dynamicTemplateData) {
    if (typeof dynamicTemplateData === 'undefined' || dynamicTemplateData === null) {
      return;
    }
    if (typeof dynamicTemplateData !== 'object') {
      throw new Error(
        'Object expected for `dynamicTemplateData` in deepMergeDynamicTemplateData'
      );
    }
    this.dynamicTemplateData = deepMerge(dynamicTemplateData, this.dynamicTemplateData);
  }

  /**
   * Set dynamic template data
   */
  setDynamicTemplateData(dynamicTemplateData) {
    if (typeof dynamicTemplateData === 'undefined') {
      return;
    }
    if (typeof dynamicTemplateData !== 'object') {
      throw new Error('Object expected for `dynamicTemplateData`');
    }
    this.dynamicTemplateData = dynamicTemplateData;
  }

  /**
   * To JSON
   */
  toJSON() {

    //Get data from self
    const {
      to, cc, bcc, subject, headers, customArgs, sendAt,
      substitutions, substitutionWrappers, dynamicTemplateData,
    } = this;

    //Initialize with mandatory values
    const json = {to};

    //Arrays
    if (Array.isArray(cc) && cc.length > 0) {
      json.cc = cc;
    }
    if (Array.isArray(bcc) && bcc.length > 0) {
      json.bcc = bcc;
    }

    //Objects
    if (Object.keys(headers).length > 0) {
      json.headers = headers;
    }
    if (substitutions && Object.keys(substitutions).length > 0) {
      const [left, right] = substitutionWrappers;
      json.substitutions = wrapSubstitutions(substitutions, left, right);
    }
    if (Object.keys(customArgs).length > 0) {
      json.customArgs = customArgs;
    }

    if (dynamicTemplateData && Object.keys(dynamicTemplateData).length > 0) {
      json.dynamicTemplateData = dynamicTemplateData;
    }

    //Simple properties
    if (typeof subject !== 'undefined') {
      json.subject = subject;
    }
    if (typeof sendAt !== 'undefined') {
      json.sendAt = sendAt;
    }

    //Return as snake cased object
    return toSnakeCase(json, ['substitutions', 'dynamicTemplateData', 'customArgs', 'headers']);
  }
}

//Export class
module.exports = Personalization;
