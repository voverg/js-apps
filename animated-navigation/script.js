const toggleBtn = document.querySelector('#toggle');
const navEl = document.querySelector('#nav');

toggleBtn.addEventListener('click', () => {
    navEl.classList.toggle('active');
})