export function shoudTableResize() {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

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

export function parseId(id) {
  const [row, col] = id.split(':').map(el => +el);
  return {row, col};
}

export function getNextSelector(key, {col, row}) {
  const MIN_VALUE = 0;

  switch(key) {
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
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
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
  }
  
  return `[data-id="${row}:${col}"]`;
}