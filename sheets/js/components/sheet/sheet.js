export class Sheet {
  constructor(selector, props) {
    this.$el = document.querySelector(selector);
    this.components = props.components || [];
  }

  createElement(tag, className = '') {
    const $el = document.createElement('div');
    // $el.classList.add(className);
    $el.className = className;

    return $el;
  }

  getRoot() {
    const $root = this.createElement('div', 'sheet');

    const componentProps = {};

    this.components = this.components.map((ClassComponent) => {
      const $el = this.createElement('div', ClassComponent.className);
      const component = new ClassComponent($el, componentProps);
      $el.innerHTML = component.toHtml();
      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach((component) => {
      component.init();
    });
  }
}