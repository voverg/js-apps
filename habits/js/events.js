// Обрабатывает все события keydown по $container
function keyHandler(event) {
  const keys = {
    KeyN: addHabit,
    KeyC: removeAllHabits,
    KeyD: removeHabit,
    KeyE: editHabit,
    Escape: unmarkHabit,
    Enter: checkHabit,
    KeyJ: downHabit,
    KeyK: upHabit,
    ArrowDown: downHabit,
    ArrowUp: upHabit,
  }
  // console.log(event.code);

  if (!Object.keys(keys).includes(event.code)) return;
  const id = habits.getMarkedId();
  keys[event.code](id);
}

// Обрабатывает все события click по $container
function clickHandler(event) {
  const types = {
    add: addHabit,
    remove: removeHabit,
    edit: editHabit,
    check: checkHabit,
    text: markHabit,
  }

  const target = $(event.target);
  const type = target.dataSet('type') ? target.dataSet('type') : null;

  if (!Object.keys(types).includes(type)) return;
  const id = (type !== 'add') ? target.getParent('.habit').attr('id') : null;
  types[type](id);
}

// Функции обработчики
function addHabit() {
  const modal = new Modal();
  modal.addHabit();
}

function markHabit(id) {
  habits.mark(id);
}

function unmarkHabit(id) {
  if (!id) return;
  habits.unmark();
}

function removeAllHabits() {
  clearData();
}

function removeHabit(id) {
  if (!id) return;

  const answer = confirm('Точно хочешь удалить эту задачу?');
  if (answer) {
    playSound(soundTrash);
    habits.remove(id);
  }
}

function editHabit(id) {
  if (!id) return;
  const text = habits.find(id).text;
  const modal = new Modal(id, text);
  modal.editHabit(id, text);
}

function checkHabit(id) {
  if (!id) return;
  const habit = $(`[id="${id}"]`)
  habit.find('.habit__text').addClass('habit--checked');
  habit.find('.habit__check').removeClass('icon-circle');
  habit.find('.habit__check').addClass('icon-check');
  playSound(soundCheck);

  const pauseId = setTimeout(() => {
    habits.check(id);
  }, 200);
}

function upHabit(id) {
  // if (!id) return;
  habits.upMarkedHabit()
  playSound(soundClack);
}

function downHabit(id) {
  // if (!id) return;
  habits.downMarkedHabit()
  playSound(soundClack);
}