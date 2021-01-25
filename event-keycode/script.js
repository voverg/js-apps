const $insert = document.querySelector('#insert');

function keyHandler(event) {
    event.preventDefault();
    $insert.innerHTML = `
        <div class="key">
        ${event.key === ' ' ? 'Space' : event.key}
        <small>key</small>
        </div>

        <div class="key">
        ${event.keyCode}
        <small>keyCode</small>
        </div>

        <div class="key">
        ${event.code}
        <small>code</small>
        </div>
    `;
}

window.addEventListener('keydown', keyHandler);