'use strict';

/**
 * Merge data helper
 */
module.exports = function mergeData(base, data) {

  //Validate data
  if (typeof base !== 'object' || base === null) {
    throw new Error('Not an object provided for base');
  }
  if (typeof data !== 'object' || data === null) {
    throw new Error('Not an object provided for data');
  }

  //Copy base
  const merged = Object.assign({}, base);

  //Add data
  for (const key in data) {
    //istanbul ignore else
    if (data.hasOwnProperty(key)) {
      if (data[key] && Array.isArray(data[key])) {
        merged[key] = data[key];
      } else if (data[key] && typeof data[key] === 'object') {
        merged[key] = Object.assign({}, data[key]);
      } else if (data[key]) {
        merged[key] = data[key];
      }
    }
  }

  //Return
  return merged;
};
