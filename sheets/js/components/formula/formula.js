import { Component } from '../../core/component.js';

export class Formula extends Component {
  static className = 'sheet__formula formula';

  constructor($root, props) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...props
    });
  }

  onInput(event) {
    console.log('Formula input', event.target.textContent);
  }

  onClick(event) {
    console.log('Formula click', event.target);
  }

  toHtml() {
    return `
      <div class="formula__info">fx</div>
      <div class="formula__input" contenteditable spellcheck="false"></div>
    `;
  }

}