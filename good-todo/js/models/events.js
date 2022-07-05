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
      KeyH: this.prevTab,
      ArrowLeft: this.prevTab,
      KeyL: this.nextTab,
      ArrowRight: this.nextTab,
    };

    this.xStart = null;
    this.xEnd = null;

    this.tabList = ['current', 'done', 'deleted'];

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

     // Обработка touch событий
    if (event.type === 'touchstart') {
      this.onTouchStart(event);
    } else if (event.type === 'touchmove') {
      this.onTouchMove(event);
    } else if (event.type === 'touchend') {
      this.onTouchEnd(event);
    }

    if (!Object.keys(this.keys).includes(this.code)) return;
    const id = this.data.getMarkedId();
    this.keys[this.code](id); // Запускаем функцию из объекта keys по ключу кода клавиши
  }

  // Touch handlers
  onTouchStart = (event) => {
    this.xStart = event.changedTouches[0].clientX;
  }

  onTouchEnd = (event) => {
    this.xEnd = event.changedTouches[0].clientX;
    const xDiff = this.xEnd - this.xStart;
    this.xStart = null;
    this.xEnd = null;

    if (xDiff > 50) {
      this.prevTab();
    } else if (xDiff < -50) {
      this.nextTab();
    }
  }

  // Key handlers
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
      this.store.dispatch({ type: 'modal', payload: {id: null} });
      playSound(soundTrash);
    }
  }

  removeAllTasks = (id) => {
    clearData('todoList', this.data);
    this.store.dispatch({ type: 'modal', payload: {id: null} });
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

  prevTab = () => {
    const currentIndex = this.tabList.indexOf(this.status);
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : this.tabList.length - 1;
    this.status = this.tabList[nextIndex];

    this.store.dispatch({ type: 'tab', payload: {tab: this.status} });
  }

  nextTab = () => {
    const currentIndex = this.tabList.indexOf(this.status);
    const nextIndex = currentIndex < this.tabList.length - 1 ? currentIndex + 1 : 0;
    this.status = this.tabList[nextIndex];

    this.store.dispatch({ type: 'tab', payload: {tab: this.status} });
  }

}
