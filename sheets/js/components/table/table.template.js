import { parseCell } from "./table.helpers.js";

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;
const CODES = {
  A: 65,
  Z: 90,
};

function getStrFromObj(obj) {
  if (!obj) return;

  const str = Object.keys(obj).map((key) => {
    return `${key}: ${obj[key]};`;
  }).join('');

  return str;
}

/**
 * Get char by its index
 * @param  {string} _     Stub
 * @param  {number} index Char index
 * @return {string}       Return char
 */
function toChar(_, index) {
  const charIndex = CODES.A + index;
  const char = String.fromCharCode(charIndex);
  return char;
}

/**
 * Get column width
 * @param {object} colState 
 * @param {number} colIndex 
 * @returns string
 */
function getWidth(colState, colIndex) {
  return (colState[colIndex] || DEFAULT_WIDTH) + 'px';
}

/**
 * Get row height
 * @param {object} rowState 
 * @param {number} rowIndex 
 * @returns string
 */
function getHeight(rowState, rowIndex) {
  return (rowState[rowIndex] || DEFAULT_HEIGHT) + 'px';
}

function toColData(colState) {
  return function(col, colIndex) {
    const width = getWidth(colState, colIndex);
    return {content: col, index: colIndex, width};
  }
}

function createCell(rowIndex, state) {
  return function(colData, colIndex) {
    const id = `${rowIndex}:${colIndex}`;
    const content = state.dataState[id] ?? '';
    const styles = getStrFromObj(state.cellStyleList[id]) || getStrFromObj(state.defaultStyles);

    return `
      <div
        class="cell"
        data-col="${colIndex}"
        data-id="${id}"
        data-type="cell"
        style="${styles} width: ${colData.width}"
        data-value="${content}"
        contenteditable
      >${parseCell(content)}</div>
    `;
  }
}

function createCol({content, index, width}) {
  return `
    <div
      class="column"
      data-type="resizable"
      data-col="${index}"
      style="width: ${width}"
    >
      ${content}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow({ rowIndex, content, className, rowHeight }) {
  const resizer = rowIndex ? `<div class="row-resize" data-resize="row"></div>` : '';
  const rowInfo = typeof rowIndex === 'number' ? rowIndex + 1 : '';

  return `
    <div
      class="row ${className}"
      data-type="resizable"
      data-row="${rowIndex}"
      style="height: ${rowHeight}"
    >
      <div class="row-info">
        ${rowInfo}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export function createTable(rowsCount = 5, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(toColData(state.colState))
    .map(createCol)
    .join('');

  // Create the first table row with column names
  rows.push( createRow({
    rowIndex: null,
    content: cols,
    className: 'row--fixed',
    rowHeight: DEFAULT_HEIGHT,
  }) );

  // Create rows
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const rowHeight = getHeight(state.rowState, rowIndex);
    const rowInfo = rowIndex + 1;

    const cells = new Array(colsCount)
    .fill('')
    .map(toColData(state.colState))
    .map(createCell(rowIndex, state))
    .join('');

    rows.push( createRow({
      rowIndex,
      content: cells,
      className: '',
      rowHeight,
    }) );
  }

  return rows.join('');
}