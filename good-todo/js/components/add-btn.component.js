class AddBtnComponent {
  constructor($root, options) {
    this.$root = $root;
    this.data = options.data;
    this.store = options.store;
    this.keyHandler = null;
  }

  init() {
    this.render();
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

  onClick = ({target}) => {
    this.store.dispatch({
      type: 'modal',
      payload: {
        text: '',
        id: null,
        modalIsOpen: true,
      },
    });
  }

  render() {}

}