import { Emitter } from '../../core/emitter.js';

export class Dashboard {
  constructor(props) {
    this.components = props.components || [];
    this.emitter = new Emitter();
    // this.store = props.store;
  }

  createElement(tag, className = '') {
    const $el = document.createElement('div');
    $el.className = className;

    return $el;
  }

  getRoot() {
    const $root = this.createElement('div', 'db container');

    const componentProps = {
      emitter: this.emitter,
      // store: this.store,
    };

    this.components = this.components.map((ClassComponent) => {
      const $el = this.createElement('div', ClassComponent.className);
      const component = new ClassComponent($el, componentProps);
      $el.innerHTML = component.toHtml();
      $root.append($el);

      return component;
    });

    return $root;
  }

  init() {
    this.components.forEach((component) => {
      component.init();
    });
  }

  destroy() {
    this.components.forEach((component) => {
      component.destroy();
    });
  }

}