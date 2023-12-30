import { TableParser } from "./table.parser.js";

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
 * Is it column?
 * @param  {Event}  event Receive event
 * @return {boolean}       Return true if it is column else false
 */
export function isCol(event) {
  return event.target.dataset.initialCol;
}

/**
 * Is it row?
 * @param  {Event}  event Receive event
 * @return {boolean}       Return true if it is row else false
 */
export function isRow(event) {
  return !isNaN(event.target.dataset.initialRow);
}

/**
 * Is it the whole cells element?
 * @param  {Event}  event Receive event
 * @return {boolean}       Return true if it is the whole cells element else false
 */
export function isAllCells(event) {
  return event.target.dataset.initialRow === 'all-cells';
}

/**
 * Is it celected cell?
 * @param  {Event}  event Receive event
 * @return {boolean}       Return true if it is selected cell else false
 */
export function isSelector(event) {
  return event.target.classList.contains('selector');
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
export function getNextSelector(rowsCount, key, {col, row}) {
  const MIN_VALUE = 0;
  const MAX_COL_VALUE = 25;
  const MAX_ROW_VALUE = rowsCount - 1;

  switch(key) {
    case 'ArrowUp':
      row = Math.max(row - 1, MIN_VALUE);
      break;
    case 'ArrowRight':
    case 'Tab':
      col = Math.min(col + 1, MAX_COL_VALUE);
      break;
    case 'Enter':
    case 'ArrowDown':
      row = Math.min(row + 1, MAX_ROW_VALUE);
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
export function parseCell(value = '', state = {}) {
  const parser = new TableParser(value, state);
  const result = parser.parse();
  return result;
}

export function getColIdLIst() {
  const cols = {};
  const colList = 'abcdefghigklmnopqrstuvwxyz'.split('');
  colList.forEach((col, index) => cols[col] = index.toString());
  return cols;
}
