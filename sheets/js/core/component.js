import { DomListener } from './dom-listener.js';

export class Component extends DomListener {
  constructor($root, props = {}) {
    super($root, props.listeners);
    this.name = props.name || '';

    this.prepare();
  }

  prepare() {}

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }

  toHtml() {
    return '';
  }

}