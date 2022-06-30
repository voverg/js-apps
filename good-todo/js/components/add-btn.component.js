class AddBtnComponent {
  constructor($root, options) {
    this.$root = $root;
    this.data = options.data;
    this.store = options.store;
    this.keyHandler = null;
  }

  init() {
    this.render();
    this.$root.addEventListener('click', this.onClick);

    this.keyHandler = new KeyHandler({store: this.store, data: this.data});
    document.addEventListener('keydown', this.keyHandler);
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