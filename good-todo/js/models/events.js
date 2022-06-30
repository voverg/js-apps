class KeyHandler {
  constructor(options) {
    this.data = options.data;
    this.store = options.store;
    this.state = {};
    this.status = '';
    this.keys = {
      KeyN: this.addTask,
      KeyC: this.removeAllTasks,
      KeyD: this.removeTask,
      KeyE: this.editTask,
      Enter: this.doneTask,
      KeyJ: this.downTask,
      KeyK: this.upTask,
      ArrowDown: this.downTask,
      ArrowUp: this.upTask,
    };

    this.init();
  }

  init() {
    this.store.subscribe(() => {
      this.state = this.store.getState();
      this.status = this.state.tab;
    });
  }

  handleEvent(event) {
    this.event = event;
    this.code = event.code;

    if (!Object.keys(this.keys).includes(this.code)) return;
    const id = this.data.getMarkedId();
    this.keys[this.code](id); // Запускаем функцию из объекта keys по ключу кода клавиши
  }

  addTask = (id) => {
    this.store.dispatch({ type: 'modal', payload: {id: null, text: '', modalIsOpen: true} });
  }

  editTask = (id) => {
    if (!id) return;

    const text = this.data.find(id).text;
    this.store.dispatch({ type: 'modal', payload: {id, text, modalIsOpen: true} });
  }

  doneTask = (id) => {
    if (!id) return;

    const text = this.data.find(id).text;
    this.data.done(id);
    this.store.dispatch({ type: 'modal', payload: {id} });
    playSound(soundDone);
  }

  removeTask = (id) => {
    if (!id) return;

    const answer = confirm('Точно хочешь удалить эту задачу?');
    if (answer) {
      this.data.remove(id);
      this.store.dispatch({ type: 'modal', payload: {id} });
      playSound(soundTrash);
    }
  }

  removeAllTasks = (id) => {
    clearData('todoList', this.data);
    this.store.dispatch({ type: 'modal', payload: {id} });
  }

  upTask = (id) => {
    this.data.upMarkedTodo(this.status);
    this.store.dispatch({ type: 'modal', payload: {id} });
    playSound(soundClack);
  }

  downTask = (id) => {
    this.data.downMarkedTodo(this.status);
    this.store.dispatch({ type: 'modal', payload: {id} });
    playSound(soundClack);
  }

}
