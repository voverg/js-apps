import { Component } from '../../core/component.js';
import { createTable } from './table.template.js';

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
    if (event.target.dataset.resize) {
      const $resizer = event.target;
      const $parent = $resizer.closest('[data-type="resizable"]');

      document.onpointermove = (e) => {
        console.log(e);
      }

      document.onpointerup = (e) => {
        document.onpointermove = null;
      }
    }
  }

}