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
// Работа с датой
const currentDate = getCurrentDate();
const lastDate = getData('lastDate') ? getLastDate('lastDate') : currentDate;
compareDates(lastDate, currentDate);
// Работа с классом массива привычек
const habits = new Habits();

// Обработка всех событий внутри блока .container
$container.on('click', eventHandler);
document.addEventListener('keydown', eventHandler);

// Функция отрисовки в браузере
function render() {
  clearHabitBlocks();
  habits.show();

  if (!$currentHabits.has('.habit')) {
    $currentHabits.html('<div class="empty-text">На сегодня задач нет</div>');
  }

  const nextDayTitle = $nextHabits.has('.habit') ? 'Tomorrow' : '';
  $nextDate.html(nextDayTitle);

  // Снова навешиваем событие для добавление новой задачи
  document.addEventListener('keydown', eventHandler);
}

render();


// Обработчик для удаления всех привычек
$refreshBtn.on('click', clearData);