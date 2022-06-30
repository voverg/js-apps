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
      this.status = this.state.tab;

      this.render();
    });
  }

  onClick = ({target}) => {
    if (!target.closest('.todo')) retrun;

    const id = target.closest('.todo').dataset.id;
    const act = target.dataset.type;

    if (!act) return;

    switch (act) {
      case 'done':
        this.data.done(id);
        playSound(soundDone);
        break;
      case 'edit':
        playSound(soundClack);
        break;
      case 'remove':
        this.data.remove(id);
        playSound(soundTrash);
        break;
    }

    this.render();
  }

  render() {
    const doneClass = this.status === 'done' ? 'todo--done' : '';
    const todos = this.data.get(this.status).map(todo => {
      return `
        <li class="todo" data-id="${todo.id}">
          <span class="todo__icon todo__check" data-type="done">&#9898;</span>
          <span class="todo__text ${doneClass}">${todo.text}</span>
          <span class="todo__icon todo__edit icon-edit" data-type="edit"></span>
          <span class="todo__icon todo__remove icon-trash" data-type="remove"></span>
        </li>
      `;
    });

    this.$root.innerHTML = todos.join('');
  }
}