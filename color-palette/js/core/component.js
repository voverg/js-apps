'use strict';

class Component {
  constructor(options) {
    this.tagName = options.tagName;
    this.className = options.className;
    this.id = options.id;

    this.store = options.store;
    this.domListener = options.domListener;

    this.$elem = null;
    this.content = '';
  }

  init() {
    // console.log('tag: ', this.tagName);
    // console.log('className: ', this.className);
    // console.log('id: ', this.id);
    // console.log('state: ', this.store.getState());

    this.setContent();
    this.render();
    this.addEvents();
  }

  getComponent() {
    return this.$elem;
  }

  setContent() {}

  addEvents() {}

  addContent() {
    this.$elem.innerHTML = '';

    if (typeof this.content === 'string') {
      this.$elem.innerHTML = this.content;
    } else {
      // content is {components: Class[], store: obj, domListener: Class}
      this.content.components.forEach(Component => {
        const component = new Component({
          store: this.content.store,
          domListener: this.content.domListener});
        component.init();
        const $el = component.getComponent();
        this.$elem.append($el);
      });
    }
  }

  render() {
    this.$elem = document.createElement(this.tagName);
    this.$elem.classList.add(this.className);
    this.$elem.id = this.id;

    this.addContent();
  }

}