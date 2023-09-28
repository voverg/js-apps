'use strict';

class App extends Component {
  constructor($root, options) {
    super({
      tagName: 'div',
      className: 'app',
      id: utils().getId(),
      componentClass: App,
      ...options
    });

    this.$root = $root;
  }

  init() {
    super.init();
  }

  setContent() {
    const components = [Header, Main, Footer];

    this.content = {
      components: components,
      store: this.store,
      domListener: this.domListener,
    };
  }

  render() {
    super.render(this.content);
    this.$root.append(this.$elem);
  }

}
