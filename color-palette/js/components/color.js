'use strict';

class Color extends Component {
  constructor(options) {
    super({
      tagName: 'section',
      className: 'col',
      id: utils().getId(),
      componentClass: Color,
      ...options
    });

    this.lock = false;

    this.colorInputId = utils().getId();
    this.colorCodeId = utils().getId();
    this.lockId = utils().getId();
  }

  init() {
    super.init();
  }

  setContent() {
    this.content = `
      <input type="color" class="col__input" id=${this.colorInputId}>
      <h2 class="col__title" id=${this.colorCodeId}>Color</h2>
      <button class="col__btn" id=${this.lockId}>lock</button>
    `;
  }

  render() {
    super.render(this.content);
  }

  addEvents() {
    this.domListener.addEvents({
      [this.colorInputId]: {
        change: this.onColorInput,
      },
      [this.colorCodeId]: {
        click: this.onColorCodeClick,
      },
      [this.lockId]: {
        click: this.onLockClick,
      },
    });
  }

  onColorInput = () => {
    console.log('color input');
    console.log(event.target.value);
  }

  onColorCodeClick = () => {
    console.log('color code');
    console.log(event.target);
  }

  onLockClick = () => {
    console.log('color lock');
    console.log(event.target);
  }

}