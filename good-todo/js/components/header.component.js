class HeaderComponent {
  constructor($root, options) {
    this.$root = $root;
    this.$currentDate = null;
    this.data = options.data;
    this.store = options.store;
  }

  init() {
    this.render();
    this.setCurrentDate();
    // Обработчик события клика мыши
    this.$root.addEventListener('click', this.onClick);
    // Обработчик клавиатурных событий
    this.keyHandler = new KeyHandler({store: this.store, data: this.data});
    document.addEventListener('keydown', this.keyHandler);
    // Обработчики для touch событий
    document.addEventListener('touchstart', this.keyHandler);
    document.addEventListener('touchend', this.keyHandler);

    this.store.dispatch({ type: 'modal', payload: {keyHandler: this.keyHandler} });
  }

  setCurrentDate() {
    this.$currentDate = this.$root.querySelector('.current-date');
    const currentDate = getCurrentDate();
    this.$currentDate.textContent = currentDate.format;
  }

  onClick = ({target}) => {
    if (target.closest('.refresh')) {
      clearData('todoList', this.data);
    } else if (target.closest('.add-btn')) {
      this.store.dispatch({ type: 'modal', payload: {text: '', id: null, modalIsOpen: true} });
    }
  }

  render() {
    this.$root.innerHTML = `
      <h1>Good todo</h1>
      <p class="copyright">
        Created by <a href="https://github.com/voverg" class="copyright__link" rel="noopener noreferrer" target="_blank">Voverg</a>
      </p>
      <p>Приложение для ведения списка дел</p>
      <p class="current-date"></p>
      <button class="add-btn" data-type="add" title="Добавить задачу">+</button>
      <span class="refresh">
        <img src="img/refresh.png" title="Удалить все задачи" alt="refresh icon">
      </span>
    `;
  }
}