import { Component } from '../../core/component.js';

export class Toolbar extends Component {
  static className = 'sheet__toolbar toolbar';

  constructor($root, props) {
    super($root, {
      name: 'Toolbar',
      listeners: [],
      ...props
    });
  }

  toHtml() {
    return `
      <button class="btn toolbar__btn" title="По левому краю">
        <i class="material-icons">format_align_left</i>
      </button>
      <button class="btn toolbar__btn" title="По центру">
        <i class="material-icons">format_align_center</i>
      </button>
      <button class="btn toolbar__btn" title="По правому краю">
        <i class="material-icons">format_align_right</i>
      </button>
      <button class="btn toolbar__btn" title="Жирный">
        <i class="material-icons">format_bold</i>
      </button>
      <button class="btn toolbar__btn" title="Курсив">
        <i class="material-icons">format_italic</i>
      </button>
      <button class="btn toolbar__btn" title="Подчёркнутый">
        <i class="material-icons">format_underline</i>
      </button>
    `;
  }

}