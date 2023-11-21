const CODES = {
  A: 65,
  Z: 90,
};

function toChar(_, index) {
  const charIndex = CODES.A + index;
  const char = String.fromCharCode(charIndex);
  return char;
}

// function createCell(_, colIndex) {
//   return `
//     <div class="cell" data-col="${colIndex}" contenteditable></div>
//   `;
// }

function createCell(rowIndex) {
  return function (_, colIndex) {
    return `
      <div
        class="cell"
        data-col="${colIndex}"
        data-id="${rowIndex}:${colIndex}"
        data-type="cell"
        contenteditable
      ></div>
    `;
  }
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
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

  for (let row = 0; row < rowsCount; row++) {
    const rowInfo = row + 1;

    const cells = new Array(colsCount)
    .fill('')
    .map(createCell(row))
    .join('');

    rows.push(createRow(rowInfo, cells));
  }

  return rows.join('');
}