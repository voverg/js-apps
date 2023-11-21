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
  // Create range list
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