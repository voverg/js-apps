export class TableSelection {
  static className = 'selected';
  static selectorClassName = 'selector';
  static mainSelectionClassName = 'selected--main';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($el) {
    this.clear();
    $el.focus();
    $el.classList.add(TableSelection.className);
    $el.classList.add(TableSelection.selectorClassName);
    // $el.classList.add(TableSelection.mainSelectionClassName);
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
    this.group.forEach(($el) => {
      $el.classList.remove(TableSelection.className);
      $el.classList.remove(TableSelection.selectorClassName);
      // $el.classList.remove(TableSelection.mainSelectionClassName);
    });
    this.group = [];
  }

  selectGroup(cells) {
    this.clear();
    this.group = cells.map( ($cell, index) => {
      $cell.classList.add(TableSelection.className);
      if (index === cells.length - 1) {
        $cell.classList.add(TableSelection.selectorClassName);
      } else if ($cell) {
        // console.dir($cell.onfocus);
        // $cell.classList.add(TableSelection.mainSelectionClassName);
      }
      return $cell;
    });
  }

  setStyle(style) {
    this.group.forEach(($cell) => {
      Object.keys(style).forEach((key) => $cell.style[key] = style[key]);
    });
  }

}