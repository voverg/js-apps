'use strict';

class Main extends Component {
  constructor(options) {
    super({
      tagName: 'main',
      className: 'main',
      id: utils().getId(),
      componentClass: Main,
      ...options
    });

    this.colAmount = this.store.getState().colAmount;
  }

  init() {
    super.init();

    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.colAmount = this.state.colAmount;
      this.setContent();
      this.addContent();
    });
  }

  setContent() {
    const components = new Array(this.colAmount).fill(Color);

    this.content = {
      components,
      store: this.store,
      domListener: this.domListener,
    };
  }

  render() {
    super.render(this.content);
  }

}