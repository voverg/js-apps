export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    $el.focus();
    $el.classList.add(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  get currentId() {
    return this.current.dataset.id;
  }

  get groupIds() {
    return this.group.map(($cell) => $cell.dataset.id);
  }

  clear() {
    this.group.forEach(($el) => $el.classList.remove(TableSelection.className));
    this.group = [];
  }

  selectGroup(cells) {
    this.clear();
    this.group = cells.map( ($cell) => {
      $cell.classList.add(TableSelection.className);
      return $cell;
    });
  }

  setStyle(style) {
    this.group.forEach(($cell) => {
      Object.keys(style).forEach((key) => $cell.style[key] = style[key]);
    });
  }

}