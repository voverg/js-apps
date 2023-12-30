import { Component } from '../../core/component.js';
import * as actions from '../../store/actions.js';

import { createTable } from './table.template.js';
import { resizeHandler } from './table.resize.js';
import { selectorHandler } from './table.selector.js';
import { TableSelection } from './table-selection.js';
import {
  shouldTableResize,
  isCell,
  getRangeId,
  parseId,
  parseCell,
  getNextSelector,
  isSelector
} from './table.helpers.js';

export class Table extends Component {
  static className = 'sheet__table table';

  constructor($root, props) {
    super($root, {
      name: 'Table',
      listeners: ['pointerdown', 'keydown', 'input', 'focusout', 'submit'],
      ...props
    });
  }

  prepare() {
    this.selection = new TableSelection();
    this.targetSelector = null;
    this.useState({rowCount: this.store.getState().rowCount});
  }

  init() {
    super.init();

    const $cell = this.$root.querySelector('[data-id="0:0"]');
    this.selectCell($cell);

    this.$on('toolbar:setStyle', (styles) => {
      this.selection.setStyle(styles);
      this.$emit('table:setStyle', styles);
      this.$dispatch(actions.changeCellStyles({
        id: this.selection.groupIds,
        styles
      }));
    });

    this.$on('formula:input', (text) => {
      this.selection.current.dataset.value = text;
      this.selection.current.textContent = text;
      this.updateTextInStore(text);
    });

    this.$on('formula:enter', (text) => {
      this.updateCurrentSelection(text);
      this.selection.current.focus();
    });

    this.$on('header:enter', () => {
      this.selection.current.focus();
    });
  }

  getVisibleText(text) {
    return parseCell(text, this.store.getState());
  }

  updateCurrentSelection(text) {
    if (!text) return;

    const visibleText = this.getVisibleText(text);
    this.selection.current.textContent = visibleText;
    this.$dispatch(actions.changeVisibleText({
      visibleText,
      id: this.selection.currentId,
    }));
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    // Emit cell styles for Toolbar
    const id = this.selection.currentId;
    const styles = this.store.getState().cellStyleList[id] || this.store.getState().defaultStyles;
    this.$emit('table:setStyle', styles);
  }

  toHtml() {
    // const rowCount = this.store.getState().rowCount;
    const rowCount = this.state.rowCount;
    const rows = createTable(rowCount, this.store.getState());
    const addRows = `
      <form class="add-rows" data-type="add">
        <button type="submit" class="add-rows__btn">Добавить</button>
        <input type="number" name="rowCount" value="10" min="1" max="1000" class="add-rows__input">
        <span class="add-rows__text">строк</span>
      </form>
    `;

    const table = `
      <div class="rows-wrapper">${rows}</div>
      ${addRows}
    `;

    return table;
  }

  updateTextInStore(text) {
    this.$dispatch(actions.changeText({
      text,
      id: this.selection.currentId,
    }));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.error('Resize error:', e.message);
    }
  }

  async getTargetSelector(event) {
    try {
      // const $table = document.querySelector('.table');

      this.targetSelector = await selectorHandler(this.$root, event);
      const targetId = this.targetSelector.dataset.id;
      this.selectCellGroup(targetId);

      // $table.classList.remove('touch-action-none');
    } catch (e) {
      console.error('Selector error:', e.message);
    }
  }

  selectCellGroup(targetId) {
    const currentId = this.selection.currentId;
    const rangeId = getRangeId(currentId, targetId);
    const cells = rangeId.map((id) => this.$root.querySelector(`[data-id="${id}"]`));
    this.selection.selectGroup(cells);
  }

  onPointerdown(event) {
    if (shouldTableResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const targetId = event.target.dataset.id;
        this.selectCellGroup(targetId);
      } else if (isSelector(event)) {
        this.getTargetSelector(event);
      } else {
        this.selectCell(event.target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

    if (keys.includes(event.key) && event.target.closest(`[data-type="add"`)) {
      // This statment block for handle adding rows form
      return;
    } else if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      // Get and select next cell
      const {key} = event;
      const id = parseId(this.selection.currentId)
      const $nextCell = this.$root.querySelector(getNextSelector(key, id));
      this.selectCell($nextCell);
    }
  }

  onInput(event) {
    if (event.target.dataset.type === 'cell') {
      const text = event.target.textContent;
      event.target.dataset.value = text;
      this.updateTextInStore(text);
    }
  }

  onFocusout(event) {
    // Set parsed text in the current cell for apply math operations
    const text = this.selection.current.dataset.value;
    this.updateCurrentSelection(text);
  }

  onSubmit(event) {
    event.preventDefault();
    const form = event.target.closest(`[data-type="add"`);

    const addingRows = +form.rowCount.value;
    this.$dispatch(actions.changeRowCount({data: addingRows}));
    this.setState({rowCount: this.store.getState().rowCount});
  }

}
