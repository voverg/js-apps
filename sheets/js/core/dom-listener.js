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
      const method = getMethodName(listener);
      // Проверяем, что для всех слушателей существуют методы
      if (!this[method]) {
        throw new Error(`No implementation method ${method} for ${this.name} component`);
      }
      // В this[method] намертво биндим этот самый метод с контекстом this
      this[method] = this[method].bind(this);
      // Добавляем события для всех слушателей
      this.$root.addEventListener(listener, this[method]);
    });
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.removeEventListener(listener, this[method]);
    });
  }

}


function getMethodName(listener) {
  return 'on' + capitalize(listener);
}