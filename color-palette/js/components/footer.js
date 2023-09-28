'use strict';

class Footer extends Component {
  constructor(options) {
    super({
      tagName: 'footer',
      className: 'footer',
      id: utils().getId(),
      componentClass: Footer,
      ...options
    });
  }

  setContent() {
    this.content = `
      <p class="footer__text">Created by <a href="https://github.com/voverg" class="footer__link" rel="noopener noreferrer" target="_blank">Voverg</a></p>
    `;
  }

  render() {
    super.render(this.content);
  }

}