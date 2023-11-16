import { Component } from '../../core/component.js';

export class Footer extends Component {
  static className = 'footer';

  constructor($root, props) {
    super($root, {
      name: 'Footer',
      listeners: [],
      ...props
    });
  }

  toHtml() {
    return `
      <p class="footer__text">Created by <a href="https://github.com/voverg" class="footer__link" rel="noopener noreferrer" target="_blank">Voverg</a>
      </p>
    `;
  }

}