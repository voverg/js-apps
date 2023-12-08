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
    const initialLocalState = {
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
    };

    this.useState(initialLocalState);
  }

  toHtml() {
    return createToolbar(this.localState);
  }

  onClick(event) {
    if (event.target.dataset.type === 'btn') {
      const valueObj = JSON.parse(event.target.dataset.value);
      this.$emit('toolbar:setStyle', valueObj);
      this.setState(valueObj);
    }
  }

}