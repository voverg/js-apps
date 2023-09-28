'use strict';

class Header extends Component {
  constructor(options) {
    super({
      tagName: 'header',
      className: 'header',
      id: utils().getId(),
      componentClass: Header,
      ...options
    });

    this.amountInputId = utils().getId();
    this.randomId = utils().getId();
    this.helpId = utils().getId();
    this.shareId = utils().getId();
  }

  init() {
    super.init();
  }

  setContent() {
    this.content = `
      <input type="number" class="header__input" value="5" min="1" max="10" id=${this.amountInputId}>
      <div class="header__center">
        <h1 class="header__title">Color palette</h1>
        <p class="header__description">Создай палитру цветов</p>
      </div>
      <div class="header__icons">
        <span id=${this.randomId}>Random</span>
        <span id=${this.helpId}>Help</span>
        <span id=${this.shareId}>Share</span>
      </div>
    `;
  }

  render() {
    super.render(this.content);
  }

  addEvents() {
    this.domListener.addEvents({
      [this.amountInputId]: {
        input: this.onAmountInput,
      },
      [this.randomId]: {
        click: this.onRandomClick,
      },
      [this.helpId]: {
        click: this.onHelpClick,
      },
      [this.shareId]: {
        click: this.onShareClick,
      },
    });
  }

  onAmountInput = () => {
    console.log('input header-input');
    console.log(event.target.value);
    this.store.dispatch({type: 'colAmount', payload: +event.target.value});
  }

  onRandomClick = () => {
    console.log('click random');
    console.log(event.target);
  }

  onHelpClick = () => {
    console.log('click help');
    console.log(event.target);
  }

  onShareClick = () => {
    console.log('click share');
    console.log(event.target);
  }

}