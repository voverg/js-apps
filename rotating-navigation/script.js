const openBtn = document.querySelector('#open');
const closeBtn = document.querySelector('#close');
const $container = document.querySelector('.container');

openBtn.addEventListener('click', () => {
    $container.classList.add('show-nav');
});

closeBtn.addEventListener('click', () => {
    $container.classList.remove('show-nav');
});