const CODES = {
  A: 65,
  Z: 90,
};

function toChar(el, index) {
  const charIndex = CODES.A + index;
  const char = String.fromCharCode(charIndex);
  return char;
}

function createCell() {
  return `
    <div class="cell" contenteditable></div>
  `;
}

function createCol(col) {
  return `
    <div class="column" data-type="resizable">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(rowInfo, content, className = '') {
  const resizer = rowInfo ? `<div class="row-resize" data-resize="row"></div>` : '';

  return `
    <div class="row ${className}" data-type="resizable">
      <div class="row-info">
        ${rowInfo}
        ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

export function createTable(rowsCount = 5) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('');

  rows.push( createRow('', cols, 'row--fixed') );

  for (let i = 0; i < rowsCount; i++) {
    const rowInfo = i + 1;

    const cells = new Array(colsCount)
    .fill('')
    .map(createCell)
    .join('');

    rows.push(createRow(rowInfo, cells));
  }

  return rows.join('');
}