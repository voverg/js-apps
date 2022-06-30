class Todos {
  constructor() {
    this.todos = getData('todoList', todoList);
  }

  get(param = 'current') {
    if (param === 'current') {
      return this.todos.filter(todo => !todo.deleted && !todo.done);
    } else {
      return this.todos.filter(todo => todo[param] === true);
    }
  }

  add(text) {
    // this.unmark();
    const id = Date.now();
    this.todos.push({id, text, checked: false, marked: true, deleted: false});
  }

  remove(id) {
    // this.todos = this.todos.filter(todo => +todo.id !== +id);
    this.todos.forEach(todo => {
      if (+todo.id === +id) {
        todo.done = false;
        todo.deleted = todo.deleted ? false : true;
      }
    });
  }

  removeAll() {
    this.todos = [];
  }

  edit(id, text) {
    this.todos.forEach(todo => {
      if (+todo.id === +id) {
        todo.text = text;
      }
    });
  }

  done(id) {
    this.todos.forEach(todo => {
      if (+todo.id === +id) {
        todo.deleted = false;
        todo.done = todo.done ? false : true;
      }
    });
  }

  mark(id) {
    this.todos.forEach(habit => {
      habit.marked = (+habit.id === +id) ? true : false;
    });

    setData('todoList', this.todos);
    render();
  }

  unmark() {
    this.todos.forEach(habit => habit.marked = false);
    setData('todoList', this.todos);
    render();
  }

  getMarkedId() {
    const marked = this.todos.find(habit => habit.marked);
    const id = marked ? marked.id : null;
    return id;
  }

  getOrder() {
    const today = [];
    const tomorrow = [];

    this.todos.forEach(habit => {
      const tmpArr = habit.checked ? tomorrow : today;
      tmpArr.push(habit);
    });

    this.todos = [...today, ...tomorrow];
  }

  upMarkedHabit() {
    this.getOrder();

    for (let i = this.todos.length - 1, len = 0; i >= 0; i--) {
      const habit = this.todos[i];
      if (i - 1 < 0) {
        this.todos[0].marked = false;
        this.todos[this.todos.length - 1].marked = true;
        break;
      }

      if (habit.marked) {
        habit.marked = false;
        this.todos[i - 1].marked = true;
        break;
      }
    }

    setData('todoList', this.todos);
    render();
  }

  downMarkedHabit() {
    this.getOrder();

    for (let i = 0, len = this.todos.length; i < len; i++) {
      const habit = this.todos[i];
      if (i + 1 === len) {
        this.todos[len - 1].marked = false;
        this.todos[0].marked = true;
        break;
      }

      if (habit.marked) {
        habit.marked = false;
        this.todos[i + 1].marked = true;
        break;
      }
    }

    setData('todoList', this.todos);
    render();
  }

  find(id) {
    return this.todos.find(habit => +habit.id === +id);
  }

  show() {
    this.todos.forEach(habit => {
      const habitElem = createHabit(habit);
      const $habitsBlock = !habit.checked ? $currentHabits : $nextHabits;
      $habitsBlock.append(habitElem);
    });
  }

  newDay() {
    this.todos.forEach(habit => habit.checked = false);
    setData('todoList', this.todos);
    render();
  }
}