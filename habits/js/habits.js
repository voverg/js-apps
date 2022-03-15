class Habits {
  constructor() {
    this.habits = getData('habitList', habitList);
  }

  getList() {
    return this.habits;
  }

  add(text) {
    this.unmark();
    const id = Date.now();
    this.habits.push({id, text, checked: false, marked: true});
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

  getOrder() {
    const today = [];
    const tomorrow = [];

    this.habits.forEach(habit => {
      const tmpArr = habit.checked ? tomorrow : today;
      tmpArr.push(habit);
    });

    this.habits = [...today, ...tomorrow];
  }

  upMarkedHabit() {
    this.getOrder();

    for (let i = this.habits.length - 1, len = 0; i >= 0; i--) {
      const habit = this.habits[i];
      if (i - 1 < 0) {
        this.habits[0].marked = false;
        this.habits[this.habits.length - 1].marked = true;
        break;
      }

      if (habit.marked) {
        habit.marked = false;
        this.habits[i - 1].marked = true;
        break;
      }
    }

    setData('habitList', this.habits);
    render();
  }

  downMarkedHabit() {
    this.getOrder();

    for (let i = 0, len = this.habits.length; i < len; i++) {
      const habit = this.habits[i];
      if (i + 1 === len) {
        this.habits[len - 1].marked = false;
        this.habits[0].marked = true;
        break;
      }

      if (habit.marked) {
        habit.marked = false;
        this.habits[i + 1].marked = true;
        break;
      }
    }

    setData('habitList', this.habits);
    render();
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