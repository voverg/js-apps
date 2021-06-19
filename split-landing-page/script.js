const containerEl = document.querySelector('.container');
const mainSlideEl = document.querySelector('.main-slide');
const sidebarEl = document.querySelector('.sidebar');
const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');

const screenHeight = containerEl.clientHeight;
const slidesCount = sidebarEl.children.length;
let activeSlideIndex = 0;

sidebarEl.style.top = `-${(slidesCount - 1) * screenHeight}px`;

// Управление кнопками в приложении
upBtn.addEventListener('click', () => {
  changeSlide('up');
});

downBtn.addEventListener('click', () => {
  changeSlide('down');
});

// Управление кнопками клавиатуры вверк-вниз
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    changeSlide('up');
  } else if (event.key === 'ArrowDown') {
    changeSlide('down');
  } else {
    event.preventDefault();
  }
});

// Меняем слайды
function changeSlide(direction) {
  if (direction === 'up') {
    activeSlideIndex++;
    if (activeSlideIndex === slidesCount) {
      activeSlideIndex = 0;
    }
  } else if (direction === 'down') {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesCount - 1;
    }
  }

  mainSlideEl.style.transform = `translateY(-${activeSlideIndex * screenHeight}px)`;
  sidebarEl.style.transform = `translateY(${activeSlideIndex * screenHeight}px)`;
}
