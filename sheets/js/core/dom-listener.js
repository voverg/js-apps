import { capitalize } from './utils.js';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root for DomListener`);
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethod(listener);
      // Проверяем, что для всех слушателей существуют методы
      if (!this[method]) {
        throw new Error(`No implementation method ${method} for ${this['name']} component`);
      }
      // Добавляем события для всех слушателей
      this.$root.addEventListener(listener, this[method].bind(this));
    });
  }

  removeDomListeners() {}

}


function getMethod(listener) {
  return 'on' + capitalize(listener);
}