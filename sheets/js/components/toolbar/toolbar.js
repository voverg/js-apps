import { Component } from '../../core/component.js';
import { createToolbar } from './toolbar.template.js';

export class Toolbar extends Component {
  static className = 'sheet__toolbar toolbar';

  constructor($root, props) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...props
    });
  }

  prepare() {
    const initialState = {
      'text-align': 'left',
      'font-weight': 'normal',
      'font-style': 'normal',
      'text-decoration': 'none',
    };

    this.useState(initialState);
  }

  toHtml() {
    return createToolbar(this.state);
  }

  onClick(event) {
    if (event.target.dataset.type === 'btn') {
      const valueObj = JSON.parse(event.target.dataset.value);
      this.$emit('toolbar:setStyle', valueObj);
      this.setState(valueObj);
    }
  }

}