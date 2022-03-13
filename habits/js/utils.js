// Work with date
function formatDate(day, month, year) {
  const formatDay = day < 10 ? `0${day}` : day;
  const formatMonth = month < 10 ? `0${month}` : month;

  return `${formatDay}.${formatMonth}.${year}`;
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const format = formatDate(day, month, year);

  return { year, month, day, format, };
}

function compareDates(lastDate, currentDate) {
  if (lastDate.day !== currentDate.day || lastDate.month !== currentDate.month || lastDate.year !== currentDate.year) {
    setData('lastDate', currentDate);
    habits.newDay();
  }
}

// Work with localStorage
function getData(dataName, defaultData = null) {
  let data = localStorage.getItem(dataName);
  data = data ? JSON.parse(data) : defaultData;

  return data;
}

function setData(dataName, data) {
  localStorage.setItem(dataName, JSON.stringify(data));
}

function clearData() {
  const answer = confirm('Точно хочешь удалить все привычки?');
  if (answer) {
    // localStorage.clear();
    // location.reload();
    habits.removeAll();
  }
}

// Work with habits
function createHabit(elem) {
  const habitDateClass = elem.checked ? 'next-habit' : 'current-habit';

  const $li = $(document.createElement('li'));
  $li.addClass('habit', habitDateClass);
  $li.dataSet('id', elem.id);
  $li.html(`
            <span class="habit__icon habit__check">&#9898;</span>
            <span class="habit__text">${elem.text}</span>
            <img src="img/edit.png" title="Редактировать" alt="edit icon" class="habit__icon habit__edit">
            <img src="img/trash.png" title="Удалить" alt="trash icon" class="habit__icon habit__remove">
        `);

  return $li;
}

// Очищает все блоки с привычками
function clearHabitBlocks() {
  $currentHabits.html('');
  $nextHabits.html('');
}

// Обрабатывает все клики по .container
function eventHandler(event) {
  const target = $(event.target);
  const getId = () => target.getParent('.habit').dataSet('id');
  
  if (target.hasClass('habit__remove')) {
    habits.remove(getId());
  } else if (target.hasClass('habit__edit')) {
    const id = getId();
    const text = habits.find(id).text;

    const modal = new Modal(id, text);
    modal.open();
    modal.editHabit(id, text);
    modal.close();
  } else if (target.hasClass('habit__check') || target.hasClass('habit__text')) {
    playSound(soundCheck);
    target.getParent('.habit').find('.habit__text').addClass('habit--checked');
    target.getParent('.habit').find('.habit__check').html('&#10004;');

    const pauseId = setTimeout(() => {
      habits.check(getId());
    }, 200);
  } else if (target.hasClass('add-btn') || event.code === 'KeyN') {
    const modal = new Modal();
    modal.open();
    modal.addHabit();
    modal.close();
  }
}

// Проигрывание звука
function playSound(sound) {
  const clone = sound.cloneNode();
  clone.play();
}

// Check an item type
function isString(item) {
  return typeof item === 'string';
}

function isUndefined(item) {
  return typeof item === 'undefined';
}

function isNull(item) {
  return item === null;
}
