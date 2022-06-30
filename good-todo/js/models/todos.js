class Todos {
  constructor() {
    this.todos = getData('todoList', todoList);
  }

  get(status = 'current') {
    if (status === 'current') {
      return this.todos.filter(todo => !todo.deleted && !todo.done);
    } else if (status === 'all') {
      return this.todos;
    } else {
      return this.todos.filter(todo => todo[status] === true);
    }
  }

  add(text) {
    this.unmark();
    const id = Date.now();
    this.todos.push({id, text, done: false, marked: true, deleted: false});
  }

  remove(id) {
    this.todos.forEach(todo => {
      if (+todo.id === +id) {
        todo.done = false;
        todo.marked = false;
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
        todo.marked = false;
        todo.done = todo.done ? false : true;
      }
    });
  }

  mark(id) {
    this.todos.forEach(todo => {
      todo.marked = (+todo.id === +id) ? true : false;
    });
  }

  unmark() {
    this.todos.forEach(todo => todo.marked = false);
  }

  getMarkedId() {
    const marked = this.todos.find(todo => todo.marked);
    const id = marked ? marked.id : null;
    return id;
  }

  upMarkedTodo(status) {
    const list = this.get(status);

    for (let i = list.length - 1, len = 0; i >= 0; i--) {
      const todo = list[i];
      if (i - 1 < 0) {
        list[0].marked = false;
        list[list.length - 1].marked = true;
        break;
      }

      if (todo.marked) {
        todo.marked = false;
        list[i - 1].marked = true;
        break;
      }
    }
  }

  downMarkedTodo(status) {
    const list = this.get(status);

    for (let i = 0, len = list.length; i < len; i++) {
      const todo = list[i];
      if (i + 1 === len) {
        list[len - 1].marked = false;
        list[0].marked = true;
        break;
      }

      if (todo.marked) {
        todo.marked = false;
        list[i + 1].marked = true;
        break;
      }
    }
  }

  // upMarkedTodo(status) {
  //   for (let i = this.todos.length - 1, len = 0; i >= 0; i--) {
  //     const todo = this.todos[i];
  //     if (i - 1 < 0) {
  //       this.todos[0].marked = false;
  //       this.todos[this.todos.length - 1].marked = true;
  //       break;
  //     }

  //     if (todo.marked) {
  //       todo.marked = false;
  //       this.todos[i - 1].marked = true;
  //       break;
  //     }
  //   }
  // }

  // downMarkedTodo(status) {
  //   const list = this.get(status);
  //   for (let i = 0, len = this.todos.length; i < len; i++) {
  //     const todo = this.todos[i];
  //     if (i + 1 === len) {
  //       this.todos[len - 1].marked = false;
  //       this.todos[0].marked = true;
  //       break;
  //     }

  //     if (todo.marked) {
  //       todo.marked = false;
  //       this.todos[i + 1].marked = true;
  //       break;
  //     }
  //   }
  // }

  find(id) {
    return this.todos.find(todo => +todo.id === +id);
  }

}