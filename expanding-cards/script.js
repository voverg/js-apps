const $container = document.querySelector('.container');

function clickHandler(event) {
     Array.from(event.currentTarget.children).forEach(elem => {
        elem.classList.remove('active');
    });

    event.target.classList.add('active');
}

$container.addEventListener('click', clickHandler);
