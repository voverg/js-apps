const habitList = [
  {id: 1, text: 'Круглая кнопка с плюсиком - добавить новую задачу', checked: false},
  {id: 2, text: 'Кружок слева на задаче - пометить задачу выполненной', checked: false},
  {id: 3, text: 'Кнопки справа на задаче - редактировать, удалить задачу', checked: false},
  {id: 4, text: 'В правом верхнем углу приложения круглая кнопка, которая удаляет все задачи', checked: false},
  {id: 5, text: 'На следующий день все задачи переносятся в раздел Today', checked: false},
  {id: 6, text: 'Выполненные задачи переносятся на следующий день', checked: true},
  {id: 7, text: 'Если здесь пометить задачу выполненной, то она снова перенесётся на текущий день', checked: true},
];

class Habits {
  constructor() {
    this.habits = getData('habitList', habitList);
  }

  getList() {
    return this.habits;
  }

  lastId() {
    return this.habits[this.habits.length - 1].id;
  }

  add(text) {
    const id = Date.now();
    this.habits.push({id, text, checked: false});
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

  find(id) {
    return this.habits.find(habit => +habit.id === +id);
  }

  newDay() {
    this.habits.forEach(habit => habit.checked = false);
    setData('habitList', this.habits);
    render();
  }
}