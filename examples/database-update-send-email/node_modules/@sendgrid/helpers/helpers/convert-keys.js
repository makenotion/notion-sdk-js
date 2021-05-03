'use strict';

/**
 * Helper to convert an object's keys
 */
module.exports = function convertKeys(obj, converter, ignored) {

  //Validate
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Non object passed to convertKeys: ' + obj);
  }

  //Ignore arrays
  if (Array.isArray(obj)) {
    return obj;
  }

  //Ensure array for ignored values
  if (!Array.isArray(ignored)) {
    ignored = [];
  }

  //Process all properties
  for (const key in obj) {
    //istanbul ignore else
    if (obj.hasOwnProperty(key)) {

      //Convert key to snake case
      const converted = converter(key);

      //Recursive for child objects, unless ignored
      //The ignored check checks both variants of the key
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (!ignored.includes(key) && !ignored.includes(converted)) {
          obj[key] = convertKeys(obj[key], converter, ignored);
        }
      }

      //Convert key to snake case and set if needed
      if (converted !== key) {
        obj[converted] = obj[key];
        delete obj[key];
      }
    }
  }

  //Return object
  return obj;
};
