'use strict';

/**
 * Merge data deep helper
 */

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

module.exports = function mergeDeep(base, data) {
  //Validate data
  if (typeof base !== 'object' || base === null) {
    throw new Error('Not an object provided for base');
  }
  if (typeof data !== 'object' || data === null) {
    throw new Error('Not an object provided for data');
  }
  let output = Object.assign({}, base);
  if (isObject(base) && isObject(data)) {
    Object.keys(data).forEach(key => {
      if (isObject(data[key])) {
        if (!(key in base)) {
          Object.assign(output, { [key]: data[key] });
        } else {
          output[key] = mergeDeep(base[key], data[key]);
        }
      } else {
        Object.assign(output, { [key]: data[key] });
      }
    });
  }
  return output;
};
