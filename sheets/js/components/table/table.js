import { Component } from '../../core/component.js';
import { createTable } from './table.template.js';
import { resizeTable } from './table.resize.js';
import { shoudTableResize } from './table.helpers.js';

export class Table extends Component {
  static className = 'sheet__table table';

  constructor($root, props) {
    super($root, {
      name: 'Table',
      listeners: ['pointerdown'],
      ...props
    });
  }

  toHtml() {
    return createTable(30);
  }

  onPointerdown(event) {
    if (shoudTableResize()) {
      resizeTable(this.$root, event);
    }
  }

}