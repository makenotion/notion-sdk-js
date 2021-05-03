'use strict';

/**
 * Dependencies
 */
const MailService = require('./classes/mail-service');

//Export singleton instance
module.exports = new MailService();
