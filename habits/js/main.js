// DOM элементы
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
// Звуки
const soundCheck = new Audio('sound/right_7.mp3');
const soundClick = new Audio('sound/click.mp3');
const soundTrash = new Audio('sound/trash.mp3');
const soundClack = new Audio('sound/clack.mp3');
// Работа с классом массива привычек
const habits = new Habits();
// Работа с датой
const currentDate = getCurrentDate();
const lastDate = getData('lastDate') ? getData('lastDate') : currentDate;
compareDates(lastDate, currentDate);

// Обработка всех событий внутри блока .container
$container.on('click', clickHandler);
document.addEventListener('keydown', keyHandler);

// Функция отрисовки в браузере
function render() {
  clearHabitBlocks();
  habits.show();

  if (!$currentHabits.has('.habit')) {
    $currentHabits.html('<div class="empty-text">На сегодня задач нет</div>');
  }

  const nextDayTitle = $nextHabits.has('.habit') ? 'Tomorrow' : '';
  $nextDate.html(nextDayTitle);
}

render();


// Обработчик для удаления всех привычек
$refreshBtn.on('click', clearData);