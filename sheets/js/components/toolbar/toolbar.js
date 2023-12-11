import { Component } from '../../core/component.js';
import * as actions from '../../store/actions.js';
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
    this.useState(this.store.getState().defaultStyles);
  }

  init() {
    super.init();

    this.$subscribe((state) => {
      this.setState(state.toolbarStyles);
    }, ['toolbarStyles']);
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


}