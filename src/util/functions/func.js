export function get(obj, key, callback) {

  const returnValue = defaultValue(obj[key], key);
  if (isFunction(callback)) return callback(returnValue);
  return returnValue;
}

export function defaultValue(value, defaultValue) {
  return typeof value == 'undefined' ? defaultValue : value;
}

export function isUndefined(value) {
  return typeof value == 'undefined' || value === null;
}

export function isNotUndefined(value) {
  return !isUndefined(value);
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isString(value) {
  return typeof value === 'string';
}

export function isObject(value) {
  return typeof value === 'object' && !isArray(value) && !isNumber(value) && !isString(value)  && value !== null;
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function clone(obj) {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch(e) {
    return null;
  }
}

export function repeat(count) {
  return [...Array(count)];
}

export const html = (strings, ...args) => {
  const short_tag_regexp = /\<(\w*)([^\>]*)\/\>/gim;
  const HTML_TAG = {
    'image': true,
    'input': true,
    'br': true,
    'path': true
  }
  let results = strings.map((it, index) => {
    let results = args[index] || '';
    if (isFunction(results)) results = results();
    if (!isArray(results)) results = [results];
    results = results.map(r => {
      if (isObject(r) && !isArray(r)) {
        return Object.keys(r).map(key => (`${key}="${r[key]}"`)).join(' ');
      }
      return r;
    }).join('');
    return it + results;
  }).join('');
  results = results.replace(short_tag_regexp, function (match, p1) {
    if (HTML_TAG[p1.toLowerCase()]) {
      return match;
    } else {
      return match.replace('/>', `></${p1}>`)
    }
  })
  return results;
}
