class HeaderComponent {
  constructor($root, options) {
    this.$root = $root;
    this.$currentDate = null;
    this.data = options.data;
  }

  init() {
    this.render();
    this.setCurrentDate();
    this.$root.addEventListener('click', this.onClick);
  }

  setCurrentDate() {
    this.$currentDate = this.$root.querySelector('.current-date');
    const currentDate = getCurrentDate();
    this.$currentDate.textContent = currentDate.format;
  }

  onClick = ({target}) => {
    if (!target.closest('.refresh')) return;

    clearData('todoList', this.data);
  }

  render() {
    this.$root.innerHTML = `
      <h1>Good todo</h1>
      <p class="copyright">
        Created by <a href="https://github.com/voverg" class="copyright__link" rel="noopener noreferrer" target="_blank">Voverg</a>
      </p>
      <p>Приложение для ведения списка дел</p>
      <p class="current-date"></p>
      <span class="refresh">
        <img src="img/refresh.png" title="Удалить все задачи" alt="refresh icon">
      </span>
    `;
  }
}