'use strict';

/**
 * Deep cloning helper for objects
 */
module.exports = function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
};
