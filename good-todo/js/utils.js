// Work with date
function formatDate(weekDay, monthName, day, month, year) {
  const formatDay = day < 10 ? `0${day}` : day;
  const formatMonth = month < 10 ? `0${month}` : month;

  // return `${weekDay}, ${formatDay}.${formatMonth}.${year}`;
  return `${weekDay}, ${formatDay} ${monthName} ${year}`;
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const weekDay = dayNames[now.getDay()];

  const monthNames = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
  const monthName = monthNames[now.getMonth()];

  const format = formatDate(weekDay, monthName, day, month, year);
  return { year, month, day, weekDay, monthName, format, };
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

function clearData(dataName, data) {
  const answer = confirm('Точно хочешь удалить все привычки?');
  if (answer) {
    data.removeAll();
    setData(dataName, data.get());
  }
}

// Проигрывание звука
function playSound(sound) {
  const clone = sound.cloneNode();
  clone.play();
}

// Валидация текста на содержание ссылок
// Ссылки вводятся в формате [текст ссылки](адрес-ссылки.com)
function checkLinks(text) {
    const pattern = /\[.+?\]\(.+?\)/gi;
    const newText = text.replace(pattern, replacer);

    function replacer(match, offset, str) {
      let link = match.split('(')[1].replace(/[\(\)]/gi, ''); // Убираем круглые скобки у ссылки
      link = link.replace(/^(https?:)?(\/\/)?(www\.)?/gi, ''); // Убираем http(s)(www.)
      const title = match.split('(')[0].replace(/[\[\]]/gi, ''); // Убираем квадратные скобки у описания ссылки
      const anchor = `<a href="https://${link}" rel="noopener noreferrer" target="_blank">${title}</a>`;

      return anchor;
    }

    return newText;
  }

