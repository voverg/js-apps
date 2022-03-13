const $refreshBtn = $('.refresh');
const $container = $('.container');
const $currentHabits = $('.current-habits');
const $addBtn = $('.add-btn');
const $nextDate = $('.next-date');
const $nextHabits = $('.next-habits');
// Элементы модального окна
const $modal = $('.modal');
const $modalContent = $('.modal__content');
const $modalText = $('.modal__text');

const soundCheck = new Audio('sound/right_7.mp3');
const currentDate = getCurrentDate();
const lastDate = getData('lastDate') ? getLastDate('lastDate') : currentDate;
const habits = new Habits();

// Сравнивает последнюю и текущую даты открытия приложения
// Если они не совпадают, то записывает в localStorage текущую даду
// и обновляет список привычек
compareDates(lastDate, currentDate);

// Обработка всех кликов внутри блока .container
$container.on('click', clickHandler);
document.addEventListener('keydown', clickHandler);

// Предотвращает всплытие события при нажатии на форму
$modalContent.on('click', (event) => {
  event.stopPropagation();
});

// Функция отрисовки в браузере
function render() {
  clearHabits();

  habits.getList().forEach(elem => {
    const habit = createHabit(elem);

    if (!elem.checked) {
      $currentHabits.append(habit);
    } else {
      $nextHabits.append(habit);
    }
  });

  if (!$currentHabits.has('.habit')) {
    $currentHabits.html('<div class="empty-text">На сегодня привычек нет</div>');
  }

  if (!$nextHabits.has('.habit')) {
    $nextDate.html('');
  } else {
    $nextDate.html('Tomorrow');
  }
}

render();


// Очищаем localStorage
$refreshBtn.on('click', clearData);