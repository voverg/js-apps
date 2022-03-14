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
    habits.newDay();
  }

  setData('lastDate', currentDate);
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
    habits.removeAll();
  }
}

// Work with habits
function createHabit(elem) {
  const habitDateClass = elem.checked ? 'next-habit' : 'current-habit';
  const habitMarkClass = elem.marked ? 'habit--mark' : 'default';

  const $li = $(document.createElement('li'));
  $li.addClass('habit', habitDateClass, habitMarkClass);
  // $li.dataSet('id', elem.id);
  $li.attr('id', elem.id);
  $li.dataSet('type', 'habit');
  $li.html(`
            <span class="habit__icon habit__check" data-type="check">&#9898;</span>
            <span class="habit__text" data-type="text">${elem.text}</span>
            <img src="img/edit.svg" title="Редактировать" alt="edit icon" class="habit__icon habit__edit" data-type="edit">
            <img src="img/trash.svg" title="Удалить" alt="trash icon" class="habit__icon habit__remove" data-type="remove">
        `);

  return $li;
}

// Очищает все блоки с привычками
function clearHabitBlocks() {
  $currentHabits.html('');
  $nextHabits.html('');
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
