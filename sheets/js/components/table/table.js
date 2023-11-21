import { Component } from '../../core/component.js';
import { createTable } from './table.template.js';
import { resizeTable } from './table.resize.js';
import { shoudTableResize, isCell, getRangeId } from './table.helpers.js';
import { TableSelection } from './table-selection.js';

export class Table extends Component {
  static className = 'sheet__table table';

  constructor($root, props) {
    super($root, {
      name: 'Table',
      listeners: ['pointerdown'],
      ...props
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.querySelector('[data-id="0:0"]');
    this.selection.select($cell);
  }

  toHtml() {
    return createTable(30);
  }

  onPointerdown(event) {
    if (shoudTableResize(event)) {
      resizeTable(this.$root, event);
    }  else if (isCell(event)) {
      if (event.shiftKey) {
        const currentId = this.selection.current.dataset.id;
        const targetId = event.target.dataset.id;
        const rangeId = getRangeId(currentId, targetId);
        const cells = rangeId.map((id) => this.$root.querySelector(`[data-id="${id}"]`));
        this.selection.selectGroup(cells);
      } else {
        this.selection.select(event.target);
      }

    }
  } 

}