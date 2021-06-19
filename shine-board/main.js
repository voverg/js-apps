const boardEl = document.querySelector('#board');
const SQUARES_NUMBER = 500;
const COLORS = ['skyblue', 'orange', 'tomato', 'aqua', 'gold', 'lime'];

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  boardEl.append(square);
}

boardEl.addEventListener('mouseover', (event) => {
  const square = event.target;
  if (!square.classList.contains('square')) return;

  setColor(square);

  square.addEventListener('mouseleave', (event) => {
    const square = event.target;
    removeColor(square);
  });
});


function setColor(square) {
  const color = getColor();
  square.style.backgroundColor = color;
  square.style.boxShadow = `0 0 3px ${color}, 0 0 10px ${color}`;
}

function removeColor(square) {
  square.style.backgroundColor = '#1d1d1d';
  square.style.boxShadow = '0 0 3px #000';
}

function getColor() {
  const randomIndex = Math.floor(Math.random() * COLORS.length);

  return COLORS[randomIndex]
}
