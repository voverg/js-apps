import { Component } from '../../core/component.js';

export class Header extends Component {
  static className = 'sheet__header';

  constructor($root, props) {
    super($root, {
      name: 'Header',
      listeners: [],
      ...props
    });
  }

  toHtml() {
    return `
      <input type="text" class="sheet__header-input" value="Новая таблица">
      <div class="sheet__header-btns">
        <button class="btn sheet__header-btn" title="Удалить таблицу">
          <i class="material-icons">delete</i>
        </button>
        <button class="btn sheet__header-btn" title="Назад к списку таблиц">
          <i class="material-icons">exit_to_app</i>
        </button>
      </div>
    `;
  }

}