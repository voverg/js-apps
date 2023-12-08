import { DomListener } from './dom-listener.js';
import { isEqual } from './utils.js';

export class Component extends DomListener {
  constructor($root, props = {}) {
    super($root, props.listeners);
    this.name = props.name || '';
    this.store = props.store;
    this.emitter = props.emitter;
    this.unsubscribers = [];
    this.storeSub = null;
    this.localState = null;

    this.prepare();
  }
  // Prepare component before init
  prepare() {}

  init() {
    this.initDomListeners();
  }

  // Local state
  useState(initialState = {}) {
    this.localState = {...initialState};
  }

  setState(newState) {
    this.localState = {...this.localState, ...newState};
    this.$root.innerHTML = this.toHtml();
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

  $subscribe(fn, deps) {
    if (!deps || deps.length <= 0) {
      this.storeSub = this.store.subscribe(fn);
    } else {
      let prevState = this.store.getState();

      this.storeSub = this.store.subscribe((state) => {
        deps.forEach((key) => {
          if (!isEqual(prevState[key], state[key])) {
            fn(state);
          }
        });
        prevState = this.store.getState();
      });
      
    }
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