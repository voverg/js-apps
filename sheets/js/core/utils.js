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

/**
 * Debounce
 * @param  {Function} fn   [description]
 * @param  {number}   wait Amount of miloseconds
 * @return {void}        [description]
 */
export function debounce(fn, wait) {
  let timeout;

  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getCurrentDate(dateStr) {
  const date = window.innerWidth >= 480
    ? new Date(dateStr)
      .toLocaleDateString('ru-RU', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : new Date(dateStr)
      .toLocaleDateString('ru-RU', {
        // weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
      });

    return date;
}