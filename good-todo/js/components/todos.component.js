class TodosComponent {
  constructor($root, options) {
    this.$root = $root;
    this.data = options.data;
    this.store = options.store;
    this.state = {tab: 'current'};
    this.status = this.state.tab;
  }

  init() {
    this.render();

    this.$root.addEventListener('click', this.onClick);

    this.store.subscribe(() => {
      this.state = this.store.getState();
      // Check if tab is changed and unmark all tasks
      if (this.state.tab !== this.status) {
        this.data.unmark();
      }

      this.status = this.state.tab;

      this.render();
      setData('todoList', this.data.get('all'));
    });
  }

  onClick = ({target}) => {
    if (!target.closest('.todo')) return;

    const id = target.closest('.todo').dataset.id;
    const act = target.dataset.type;

    if (!act) return;

    switch (act) {
      case 'done':
        this.data.done(id);
        playSound(soundDone);
        break;
      case 'edit':
        const text = this.data.find(id).text;
        this.store.dispatch({ type: 'modal', payload: {id, text, modalIsOpen: true} });
        break;
      case 'remove':
        this.data.remove(id);
        playSound(soundTrash);
        break;
      case 'text':
        this.data.mark(id);
        break;
    }

    this.render();
    setData('todoList', this.data.get('all'));
  }

  render() {
    const emptyText = '<div class="empty-text">Пока нет ни одной задачи</div>';
    const doneClass = this.status === 'done' ? 'todo--done' : '';
    const delClass = this.status === 'deleted' ? 'todo--deleted' : '';
    // const doneIcon = this.status === 'done' ? '&#10003;' : '&#9898;';
    const doneIcon = this.status === 'done'
          ? '<img src="img/back.svg" class="done-icon" data-type="done">'
          : '<span class="icon-circle" data-type="done"></span>';

    const todos = this.data.get(this.status).map(todo => {
      const markClass = todo.marked ? 'todo--mark' : '';
      const text = checkLinks(todo.text); // Рендерит ссылки из спец формата [link text](link-adress.com)

      return `
        <li class="todo ${delClass} ${markClass} ${delClass}" data-id="${todo.id}">
          <span class="todo__icon todo__check" data-type="done">${doneIcon}</span>
          <span class="todo__text ${doneClass}" data-type="text">${text}</span>
          <span class="todo__icon todo__edit icon-edit" data-type="edit"></span>
          <span class="todo__icon todo__remove icon-trash" data-type="remove"></span>
        </li>
      `;
    });

    this.$root.innerHTML = todos.length ? todos.join('') : emptyText;
  }
}
