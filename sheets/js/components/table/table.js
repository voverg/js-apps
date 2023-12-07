import { Component } from '../../core/component.js';
import { createTable } from './table.template.js';
import { resizeHandler } from './table.resize.js';
import { shouldTableResize, isCell, getRangeId, parseId, getNextSelector } from './table.helpers.js';
import { TableSelection } from './table-selection.js';
import * as actions from '../../store/actions.js';

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
      this.updateTextInStore(data);
    });

    this.$on('formula:enter', () => {
      this.selection.current.focus();
    });

    // this.$subscribe((state) => {
    //   console.log('State from table:', state);
    // });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell.textContent);
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      // const modifiedData = {[data.id]: data.value};
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.error('Resize error:', e.message);
    }
  }

  toHtml() {
    return createTable(30, this.store.getState());
  }

  onPointerdown(event) {
    if (shouldTableResize(event)) {
      this.resizeTable(event)
   }  else if (isCell(event)) {
      if (event.shiftKey) {
        const currentId = this.selection.current.dataset.id;
        const targetId = event.target.dataset.id;
        const rangeId = getRangeId(currentId, targetId);
        const cells = rangeId.map((id) => this.$root.querySelector(`[data-id="${id}"]`));
        this.selection.selectGroup(cells);
      } else {
        this.selectCell(event.target);
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

  updateTextInStore(text) {
    this.$dispatch(actions.changeText({
      text,
      id: this.selection.current.dataset.id,
    }));
  }

  onInput(event) {
    // this.$emit('table:input', event.target.textContent);
    this.updateTextInStore(event.target.textContent);
  }

}
