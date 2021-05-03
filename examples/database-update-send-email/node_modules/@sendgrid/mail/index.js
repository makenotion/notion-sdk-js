'use strict';

const mailer = require('./src/mail');
const MailService = require('./src/classes/mail-service');

module.exports = mailer;
module.exports.MailService = MailService;
