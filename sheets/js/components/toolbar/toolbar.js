import { Component } from '../../core/component.js';
import * as actions from '../../store/actions.js';
import { createToolbar } from './toolbar.template.js';

export class Toolbar extends Component {
  static className = 'sheet__toolbar toolbar';

  constructor($root, props) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click', 'change'],
      ...props
    });
  }

  prepare() {
    this.useState(this.store.getState().defaultStyles);
  }

  init() {
    super.init();

    this.$on('table:setStyle', (styles) => {
      this.setState(styles);
    });
  }

  toHtml() {
    return createToolbar(this.state);
  }

  onClick(event) {
    if (event.target.dataset.type === 'btn') {

      const valueObj = JSON.parse(event.target.dataset.value);
      this.$emit('toolbar:setStyle', {...this.state, ...valueObj});
    }
  }

  onChange(event) {
    if (event.target.dataset.type === 'input') {
      const valueObj = {[event.target.id]: event.target.value};
      this.$emit('toolbar:setStyle', {...this.state, ...valueObj});
    }
  }

}
