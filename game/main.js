const startBtn = document.querySelector('#start');
const screenEls = document.querySelectorAll('.screen');
const timeListEl = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const boardEl = document.querySelector('#board');

let time = 0;
let score = 0;
let intervalId;
const colors = ['skyblue', 'aqua', 'tomato', 'gold', 'lime', 'orange'];
const clickSound = new Audio('sound/sound-1.mp3');

startBtn.addEventListener('click', (event) => {
  event.preventDefault();

  screenEls[0].classList.add('up');
});

timeListEl.addEventListener('click', (event) => {
  const timeBtn = event.target;
  if (!timeBtn.classList.contains('time-btn')) return;

  time = +timeBtn.dataset.time;
  startGame();
});

boardEl.addEventListener('click', (event) => {
  const circleEl = event.target;
  if (!circleEl.classList.contains('circle')) return;

  score++;
  circleEl.remove();
  playSound(clickSound);
  createRandomCircle();
});


function startGame() {
  screenEls[1].classList.add('up');
  intervalId = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
}

function setTime(value) {
  timeEl.textContent = `00:${value}`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  circle.classList.add('circle');

  const diameter = getRandomNumber(30, 100);
  const x = getRandomNumber(10, boardEl.clientWidth - diameter - 10);
  const y = getRandomNumber(10, boardEl.clientHeight - diameter - 10);
  const color = colors[getRandomNumber(0, colors.length)];

  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = color;

  boardEl.append(circle);
}

function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  return randomNumber;
}

function finishGame() {
  timeEl.closest('h3').classList.add('invisible');
  boardEl.innerHTML = `<h1 class="board__inner">Game is over!</h1>
                       <h2 class="board__inner">Your score: <span class="primary">${score}</span></h2>
                       <div class="board__inner"><button type="button" class="start" id="new-game">Начать новую игру</button></div>`;

  clearInterval(intervalId);

  document.querySelector('#new-game').addEventListener('click', startNewGame);
}

function startNewGame() {
  time = 0;
  score = 0;

  screenEls[1].classList.remove('up');
  timeEl.closest('h3').classList.remove('invisible');
  boardEl.innerHTML = '';
}

// Utils
function playSound(soundObj) {
  const clone = soundObj.cloneNode();
  clone.play();
}
