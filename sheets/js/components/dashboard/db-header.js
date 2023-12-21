import { Component } from '../../core/component.js';
// import * as actions from '../../store/actions.js';

export class DbHeader extends Component {
  static className = 'db__header';

  constructor($root, props) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...props
    });
  }

  toHtml() {
    return `
      <h1 class="db__header-title">
        <img src="img/sheets.svg" alt="logo" class="db__header-logo">
        <span>Таблицы</span>
      </h1>
      <form class="db__search">
        <i class="material-icons db__search-icon">search</i>
        <input type="search" class="db__search-input" placeholder="Поиск">
      </form>
    `;
  }

  onInput(event) {
    const text = event.target.value.trim();
    this.$emit('db:search', text)
  }

}