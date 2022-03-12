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

function getLastDate() {
  const lastDate = getLocalStorage('lastDate');
  if (isNull(lastDate)) {
    setLocalStorage('lastDate', getCurrentDate());
  }

  return lastDate;
}

function compareDates(lastDate, currentDate) {
  if (lastDate.day !== currentDate.day || lastDate.month !== currentDate.month || lastDate.year !== currentDate.year) {
    setLocalStorage('lastDate', currentDate);

    habits.forEach(elem => {
      elem.checked = false;
    });

    // Записать в localStorage изменённый массив habits
    setLocalStorage('habitList', habits);
  }
}

// Work with localStorage
function getLocalStorage(dataName, defaultData = null) {
  let data = localStorage.getItem(dataName);
  data = data ? JSON.parse(data) : defaultData;

  return data;
}

function setLocalStorage(dataName, data) {
  localStorage.setItem(dataName, JSON.stringify(data));
}

function clearLocalStorage() {
  const answer = confirm('Точно хочешь удалить все привычки?');
  if (answer) {
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
function clearHabits() {
  $currentHabits.html('');
  $nextHabits.html('');
}

// Обрабатывает все клики по .container
function clickHandler(event) {
  const target = $(event.target);
  const getId = () => target.getParent('.habit').dataSet('id');

  if (target.hasClass('habit__remove')) {
    habits.remove(getId());
  } else if (target.hasClass('habit__edit')) {
    const text = habits.find(getId()).text;
    console.log(text);
    // editHabit(getId(), text);
  } else if (target.hasClass('habit__check') || target.hasClass('habit__text')) {
    palySound(soundCheck);
    target.getParent('.habit').find('.habit__text').addClass('habit--checked');
    target.getParent('.habit').find('.habit__check').html('&#10004;');

    const pauseId = setTimeout(() => {
      habits.check(getId());
    }, 200);
  } else if (target.hasClass('add-btn') || event.code === 'KeyN') {
    addHabit();
  }
}

function addHabit() {
  handleModal();
}

function palySound(sound) {
  const clone = sound.cloneNode();
  clone.play();
}

function handleModal() {
  $modal.addClass('open');
  setTimeout(() => {
    $modalText.focus();
  }, 600);

  function submitHandler(event) {
    event.preventDefault();
    value = $modalText.value();
    $modalText.value('');
    habits.add(value);
    closeModal();
  }

  $modal.on('submit', submitHandler);

  // Закрывает форму обратной связи
  // По нажатию клавиши Escape
  document.addEventListener('keydown', escapeHandler);

  function escapeHandler(event) {
    if (event.code !== 'Escape') return;
      closeModal();
  }
  //По клику на тёмной области
  $modal.on('click', closeModal);

  function closeModal() {
    $modalText.value('');
    $modal.removeClass('open');
    $modal.off('submit', submitHandler);
    $modal.off('click', closeModal);
    document.removeEventListener('keydown', escapeHandler);
  }
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
