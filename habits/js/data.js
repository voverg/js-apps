const habitList = [
  {id: 1, text: 'Круглая кнопка с плюсиком или клавиша <b>N</b> - добавить новую задачу', checked: false, marked: false},
  {id: 2, text: 'Кружок слева на задаче - пометить задачу выполненной', checked: false, marked: false},
  {id: 3, text: 'Кнопки справа на задаче - редактировать, удалить задачу', checked: false, marked: false},
  {id: 4, text: 'В правом верхнем углу приложения круглая кнопка, которая удаляет все задачи', checked: false, marked: false},
  {id: 5, text: 'На следующий день все задачи переносятся в раздел Today', checked: false, marked: false},
  {id: 6, text: 'Выполненные задачи переносятся на следующий день', checked: true, marked: false},
  {id: 7, text: 'Если здесь пометить задачу выполненной, то она снова перенесётся на текущий день', checked: true, marked: false},
];

class Habits {
  constructor() {
    this.habits = getData('habitList', habitList);
  }

  getList() {
    return this.habits;
  }

  add(text) {
    const id = Date.now();
    this.habits.push({id, text, checked: false, marked: false});
    setData('habitList', this.habits);
    render();
  }

  remove(id) {
    this.habits = this.habits.filter(habit => +habit.id !== +id);
    setData('habitList', this.habits);
    render();
  }

  removeAll() {
    this.habits = [];
    setData('habitList', this.habits);
    render();
  }

  edit(id, text) {
    this.habits.forEach(habit => {
      if (+habit.id === +id) {
        habit.text = text;
      }
    });

    setData('habitList', this.habits);
    render();
  }

  check(id) {
    this.habits.forEach(habit => {
      if (+habit.id === +id) {
        habit.checked = habit.checked ? false : true;
      }
    });

    setData('habitList', this.habits);
    render();
  }

  mark(id) {
    this.habits.forEach(habit => {
      habit.marked = (+habit.id === +id) ? true : false;
    });

    setData('habitList', this.habits);
    render();
  }

  markFirst() {
    this.unmark();
    this.habits[0].marked = true;

    setData('habitList', this.habits);
    render();
  }

  unmark() {
    this.habits.forEach(habit => habit.marked = false);
    setData('habitList', this.habits);
    render();
  }

  getMarkedId() {
    const marked = this.habits.find(habit => habit.marked);
    const id = marked ? marked.id : null;
    return id;
  }

  find(id) {
    return this.habits.find(habit => +habit.id === +id);
  }

  show() {
    this.habits.forEach(habit => {
      const habitElem = createHabit(habit);
      const $habitsBlock = !habit.checked ? $currentHabits : $nextHabits;
      $habitsBlock.append(habitElem);
    });
  }

  newDay() {
    this.habits.forEach(habit => habit.checked = false);
    setData('habitList', this.habits);
    render();
  }
}