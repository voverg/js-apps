import { Component } from '../../core/component.js';
import { storage, getCurrentDate } from '../../core/utils.js';

export class DbTable extends Component {
  static className = 'db__table';

  constructor($root, props) {
    super($root, {
      name: 'Header',
      listeners: ['click'],
      ...props
    });

  }

  prepare() {
    this.tableList = [];
    this.search = '';

    const tableKeys = this.getTableKeys() || [];
    tableKeys.forEach((key) => this.setTableList(key));
  }

  init() {
    super.init();

    this.$on('db:search', (text) => {
      this.search = text;
      this.$root.innerHTML = this.toHtml();
    });
  }

  getTableKeys() {
    const keys = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (!key.includes('table')) {
        continue;
      }
      keys.push(key);
    }
    return keys;
  }

  setTableList(key) {
    const tableModel = storage(key);
    const table = {
      key,
      title: tableModel.title,
      id: key.split(':')[1],
      openedDate: getCurrentDate(tableModel.openedDate),
    };

    this.tableList.push(table);
  }

  getRecord(table) {
    return `
      <li class="db__record">
        <a href="#table/${table.id}" class="db__record-link" title="Открыть таблицу">
          <span class="db__record-title">
            <img src="img/favicon.ico" alt="record icon" class="db__record-icon">
            <span class="db__record-text">${table.title}</span>
          </span>
          <span class="db__record-date">${table.openedDate}</span>
        </a>
        <i class="material-icons db__record-delete" data-key="${table.key}" data-type="delete">delete</i>
      </li>
    `;
  }

  toHtml() {
    const newId = Date.now().toString();
    const records = this.tableList
      .filter((table) => table.title.toLowerCase().includes(this.search.toLowerCase()))
      .map((table) => this.getRecord(table))
      .join('');

    const noRecords = `<p class="db__no-records">нет ни одной таблицы</p>`;
    const table = `
      <div class="db__list-header">
        <span>Название</span>
        <span>Дата открытия</span>
      </div>

      <ul class="db__list">
        ${records.length ? records : noRecords}
      </ul>

      <!-- Add a new table button -->
      <a href="#table/${newId}" class="db__new" title="Создать новую таблицу">+</a>
    `;

    return table;
  }

  onClick(event) {
    if (event.target.dataset.type === 'delete') {
      const tableKey = event.target.dataset.key;
      const tableTitle = this.tableList.find((table) => table.key === tableKey).title;
      const isDelite = confirm(`Точно хочешь удалить таблицу "${tableTitle}"?`);

      if (isDelite) {
        localStorage.removeItem(tableKey);
        const hash = window.location.hash;
        window.location.hash = hash === '#dashboard' ? '' : '#dashboard';
      }
    }
  }

}
