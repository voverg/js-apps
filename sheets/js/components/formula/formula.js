import { Component } from '../../core/component.js';

export class Formula extends Component {
  static className = 'sheet__formula formula';

  constructor($root, props) {
    super($root, {
      name: 'Formula',
      listeners: [],
      ...props
    });
  }

  toHtml() {
    return `
      <div class="formula__info">fx</div>
      <div class="formula__input" contenteditable spellcheck="false"></div>
    `;
  }

}