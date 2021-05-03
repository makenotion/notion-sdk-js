'use strict';

/**
 * Dependencies
 */
const convertKeys = require('./convert-keys');
const strToSnakeCase = require('./str-to-snake-case');

/**
 * Convert object keys to snake case
 */
module.exports = function toSnakeCase(obj, ignored) {
  return convertKeys(obj, strToSnakeCase, ignored);
};
