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
  const text = validateValue(elem.text);

  const $li = $(document.createElement('li'));
  $li.addClass('habit', habitDateClass, habitMarkClass);
  $li.attr('id', elem.id);
  $li.dataSet('type', 'habit');
  $li.html(`
          <span class="habit__icon habit__check icon-circle" data-type="check"></span>
          <span class="habit__text" data-type="text">${text}</span>
          <span class="habit__icon habit__edit icon-edit" data-type="edit"></span>
          <span class="habit__icon habit__remove icon-trash" data-type="remove"></span>
      `);

  return $li;
}

// Очищает все блоки с привычками
function clearHabitBlocks() {
  $currentHabits.html('');
  $nextHabits.html('');
}

// Парсит полученное значение на шаблон [text]{link}
// Если шаблон найден, делает из него ссылку
function validateValue(text) {
  const pattern = /\[.+?\]\(.+?\)/gi;
  const value = text.replace(pattern, replacer);

  function replacer(match, offset, str) {
    let link = match.split('(')[1].replace(/[\(\)]/gi, ''); // Убираем круглые скобки у ссылки
    link = link.replace(/^(https?:)?(\/\/)?(www\.)?/gi, ''); // Убираем http(s)(www.)
    const title = match.split('(')[0].replace(/[\[\]]/gi, ''); // Убираем квадратные скобки у описания ссылки
    const anchor = `<a href="https://${link}" rel="noopener noreferrer" target="_blank">${title}</a>`;

    return anchor;
  }

  return value;
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
