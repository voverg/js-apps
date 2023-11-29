import { DomListener } from './dom-listener.js';

export class Component extends DomListener {
  constructor($root, props = {}) {
    super($root, props.listeners);
    this.name = props.name || '';
    this.store = props.store;
    this.emitter = props.emitter;
    this.unsubscribers = [];
    this.storeSub = null;

    this.prepare();
  }
  // Prepare component before init
  prepare() {}

  init() {
    this.initDomListeners();
  }

  // Notify listeners about event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  // Subscribe on event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Work with store
  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach( (unsub) => unsub() );
    this.storeSub.unsubscibe();
  }

  // Return the component template
  toHtml() {
    return '';
  }

}