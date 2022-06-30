class ModalComponent {
  constructor($root, options) {
    this.$root = $root;
    this.$input = null;
    this.text = '';
    this.data = options.data;
    this.store = options.store;
    this.state = {modalIsOpen: false};
    this.status = this.state.modalIsOpen;
  }

  init() {
    this.render();
    this.$input = this.$root.querySelector('.modal__text');

    this.$root.addEventListener('submit', this.onSubmit);
    this.$root.addEventListener('click', this.onClick);

    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.status = this.state.modalIsOpen;
      
      this.openClose();
    });
  }

  openClose = () => {
    if (this.status) {
      this.$root.classList.add('open');
      document.removeEventListener('keydown', this.state.keyHandler);
      document.addEventListener('keydown', this.onKeydown);
      // Add focus on input in 100 ms
      setTimeout(() => {
        this.$input.focus();
      }, 100);

      this.$input.value = this.state.text;
    } else {
      this.$root.classList.remove('open');
      document.addEventListener('keydown', this.state.keyHandler);
      document.addEventListener('keydown', this.onKeydown);
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.text = this.$input.value ? this.$input.value : 'Новая задача';
    if (this.state.id) {
      this.editTask();
    } else {
      this.addTask();
    }

    this.store.dispatch({ type: 'modal', payload: {modalIsOpen: false} });
    this.$input.value = '';
    playSound(soundClack);

  }

  onClick = ({target}) => {
    if (target.classList.contains('modal__overlay')) {
      this.store.dispatch({ type: 'modal', payload: {modalIsOpen: false} });
    }
  }

  onKeydown = (event) => {
    if (event.code === 'Escape') {
      this.store.dispatch({ type: 'modal', payload: {modalIsOpen: false} });
    }
  }

  addTask() {
    this.data.add(this.text);
  }

  editTask() {
    this.data.edit(this.state.id, this.text)
  }

  render() {
    this.$root.innerHTML = `
      <div class="modal__overlay"></div>
      <form class="modal__content">
        <input
          type="text"
          class="modal__text"
          placeholder="Новая задача..."
        >
        <button class="modal__add" type="submit">Добавить задачу</button>
      </form>
    `;
  }
}