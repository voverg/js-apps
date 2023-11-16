import { DomListener } from './dom-listener.js';

export class Component extends DomListener {
  constructor($root, props = {}) {
    super($root, props.listeners);
    this.name = props.name || '';
  }

  toHtml() {
    return '';
  }

}