'use strict';

/**
 * Wrap substitutions
 */
module.exports = function wrap(substitutions, left = '{{', right = '}}') {

  //Process arrays
  if (Array.isArray(substitutions)) {
    return substitutions.map(subs => wrap(subs, left, right));
  }

  //Initialize new wrapped object
  const wrapped = {};

  //Map substitutions and ensure string for value
  for (const key in substitutions) {
    //istanbul ignore else
    if (substitutions.hasOwnProperty(key)) {
      wrapped[left + key + right] = String(substitutions[key]);
    }
  }

  //Return wrapped substitutions
  return wrapped;
};
