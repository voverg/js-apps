/**
 * Should table resize
 * @param  {Event} event Receive event
 * @return {boolean}     Return true or false
 */
export function shouldTableResize(event) {
  return event.target.dataset.resize;
}

/**
 * Is it cell?
 * @param  {Event}  event Receive event
 * @return {boolean}       Return true if it is cell else false
 */
export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

/**
 * Get range of ids
 * @param  {string} currentId [description]
 * @param  {string} targetId  [description]
 * @return {Array}           [description]
 */
export function getRangeId(currentId, targetId) {
  const [currentList, targetList] = [parseId(currentId), parseId(targetId)];
  const rangeId = [];

  const currentRow = Math.min(currentList.row, targetList.row);
  const targetRow = Math.max(currentList.row, targetList.row);
  const currentCol = Math.min(currentList.col, targetList.col);
  const targetCol = Math.max(currentList.col, targetList.col);
  // Create range cell id list
  for (let row = currentRow; row <= targetRow; row++) {
    for (let col = currentCol; col <= targetCol; col++) {
      const id = `${row}:${col}`;
      rangeId.push(id);
    }
  }

  return rangeId;
}

/**
 * Parse id
 * @param  {string} id This a cell id
 * @return {{row: number, col: number}}    The object with row and column numbers
 */
export function parseId(id) {
  const [row, col] = id.split(':').map(el => +el);
  return {row, col};
}

/**
 * Get next selector id
 * @param  {string} key         The pressed key
 * @param  {number} options.col Column number
 * @param  {number} options.row Row number
 * @return {string}             The next selector identificator
 */
export function getNextSelector(key, {col, row}) {
  const MIN_VALUE = 0;

  switch(key) {
    case 'ArrowUp':
      row = Math.max(row - 1, MIN_VALUE);
      break;
    case 'ArrowRight':
    case 'Tab':
      col++;
      break;
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'ArrowLeft':
      col = Math.max(col - 1, MIN_VALUE);
      break;
  }
  
  return `[data-id="${row}:${col}"]`;
}


/**
 * Parse a cell value
 * @param  {String} value Cell text
 * @return {number | string}       Parsed value
 */
export function parseCell(value = '') {
  if (value.startsWith('=')) {
    const result = eval(value.slice(1));
    return result;
  }

  return value;
}