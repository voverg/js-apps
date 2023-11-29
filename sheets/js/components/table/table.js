import { Component } from '../../core/component.js';
import { createTable } from './table.template.js';
import { resizeTable } from './table.resize.js';
import { shoudTableResize, isCell, getRangeId, parseId, getNextSelector } from './table.helpers.js';
import { TableSelection } from './table-selection.js';

export class Table extends Component {
  static className = 'sheet__table table';

  constructor($root, props) {
    super($root, {
      name: 'Table',
      listeners: ['pointerdown', 'keydown', 'input'],
      ...props
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.querySelector('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('formula:input', (data) => {
      this.selection.current.textContent = data;
    });

    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell.textContent);
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
        this.$emit('table:select', event.target.textContent);
      }
    }
  } 

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();

      const {key} = event;
      const id = parseId(this.selection.current.dataset.id)
      const $nextCell = this.$root.querySelector(getNextSelector(key, id));
      this.selectCell($nextCell);
    }
  }

  onInput(event) {
    this.$emit('table:input', event.target.textContent);
  }

}
