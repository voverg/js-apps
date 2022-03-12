const habitList = [
  {id: 1, text: 'Чтение английского', checked: false},
  {id: 2, text: 'Урок по сальфеджио', checked: true},
  {id: 3, text: 'Ежедневная протирка эл. плитки', checked: false},
  {id: 4, text: 'Ещё привычка', checked: true},
  {id: 5, text: 'Тестовая привычка', checked: true},
];

class Habits {
  constructor() {
    this.habits = getLocalStorage('habitList', []);
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
    setLocalStorage('habitList', this.habits);
    render();
  }

  remove(id) {
    this.habits = this.habits.filter(habit => +habit.id !== +id);
    setLocalStorage('habitList', this.habits);
    render();
  }

  removeAll() {
    this.habits = [];
    setLocalStorage('habitList', this.habits);
    render();
  }

  edit(id, text) {
    this.habits.forEach(habit => {
      if (+habit.id === +id) {
        habit.text = text;
      }
    });

    setLocalStorage('habitList', this.habits);
    render();
  }

  check(id) {
    this.habits.forEach(habit => {
      if (+habit.id === +id) {
        habit.checked = habit.checked ? false : true;
      }
    });

    setLocalStorage('habitList', this.habits);
    render();
  }

  find(id) {
    return this.habits.find(habit => +habit.id === +id);
  }
}