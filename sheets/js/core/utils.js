/**
 * Capitalize string
 * @param  {string} str Receive string
 * @return {string}     Return capitalized string
 */
export function capitalize(str) {
  if (typeof str !== 'string') return '';

  const formatedStr = str.charAt(0).toUpperCase() + str.slice(1);
  return formatedStr;
}

/**
 * Work with localstorage like getter and setter
 * @param  {string} key  The name of data
 * @param  {any} data Some data
 * @return {any | void}      Return any data from localstorage or nothing
 */
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }

  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  return a === b;
}