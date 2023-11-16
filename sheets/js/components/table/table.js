import { Component } from '../../core/component.js';
import { createTable } from './table.template.js';

export class Table extends Component {
  static className = 'sheet__table table';

  constructor($root, props) {
    super($root, {
      name: 'Table',
      listeners: [],
      ...props
    });
  }

  toHtml() {
    return createTable(10);
  }

}