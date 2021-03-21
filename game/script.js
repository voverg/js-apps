const startBtn = document.querySelector('#start');
const gameEl = document.querySelector('#game');
const timeEl = document.querySelector('#time');
const timeHeaderEl = document.querySelector('#time-header');
const resultHeaderEl = document.querySelector('#result-header');
const resultEl = document.querySelector('#result');
const gameTimeEl = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

function show(el) {
    el.classList.remove('hidden');
}

function hide(el) {
    el.classList.add('hidden');
}

function startGame() {
    isGameStarted = true;
    score = 0;
    setGameTime();
    gameTimeEl.setAttribute('disabled', 'true');

    hide(startBtn);
    gameEl.style.backgroundColor = '#fff';

    const interval = setInterval(() => {
        const time = parseFloat(timeEl.textContent);

        if (time <= 0) {
            clearInterval(interval);
            endGame();
        } else {
            timeEl.textContent = (time - 0.1).toFixed(1);
        }
    }, 100);

    renderBox();
}

function endGame() {
    isGameStarted = false;
    gameEl.innerHTML = null;
    gameEl.style.backgroundColor = '#ccc';

    show(startBtn);
    show(resultHeaderEl);
    hide(timeHeaderEl);
    
    setGameScore();
    gameTimeEl.removeAttribute('disabled');
}

function setGameScore() {
    resultEl.textContent = score;
}

function renderBox() {
    gameEl.innerHTML = null;

    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.box = 'true';

    const boxSize = getRandom(20, 100);
    const gameSize = gameEl.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;

    box.style.width = box.style.height = `${boxSize}px`;
    box.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`;
    box.style.top = `${getRandom(10, maxTop - 10)}px`;
    box.style.left = `${getRandom(10, maxLeft - 10)}px`;

    gameEl.append(box);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

startBtn.addEventListener('click', startGame);

function handleBoxClick(event) {
    if (!isGameStarted) {
        return;
    }

    if (event.target.dataset.box) {
        score++;
        renderBox();
    }
}

gameEl.addEventListener('click', handleBoxClick);

function setGameTime() {
    hide(resultHeaderEl);
    show(timeHeaderEl);
    timeEl.textContent = parseFloat(gameTimeEl.value).toFixed(1);
}

gameTimeEl.addEventListener('input', setGameTime);