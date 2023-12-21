import { Component } from '../../core/component.js';
import * as actions from '../../store/actions.js';

export class Header extends Component {
  static className = 'sheet__header';

  constructor($root, props) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'keydown', 'click'],
      ...props
    });
  }

  prepare() {
    this.title = this.store.getState().title;
  }

  toHtml() {
    return `
      <input type="text" class="sheet__header-input" value="${this.title}">
      <div class="sheet__header-btns">
        <button class="btn sheet__header-btn" data-btn="delete" title="Удалить таблицу">
          <i class="material-icons" data-btn="delete">delete</i>
        </button>
        <a href="#dashboard" class="btn sheet__header-btn" title="Назад к списку таблиц">
          <i class="material-icons">exit_to_app</i>
        </a>
      </div>
    `;
  }

  onInput(event) {
    const title = event.target.value.trim();
    this.$dispatch(actions.changeTitle(title));
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('header:enter');
    }
  }

  onClick(event) {
    if (event.target.dataset.btn === 'delete') {
      const isDelite = confirm('Точно хочешь удалить эту таблицу?');

      if (isDelite) {
        const tableKey = window.location.hash.slice(1).split('/').join(':');
        localStorage.removeItem(tableKey);
        window.location.hash = '';
      }
    }
  }

}