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
      // console.log(style);
      Object.keys(style).forEach((key) => $cell.style[key] = style[key]);
    });
  }

}