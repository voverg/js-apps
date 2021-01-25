let notesEl = document.querySelector('#notes');
const addBtn = document.querySelector('#add');

let noteId, data;

// LocalStorage
const fromLocalStorage = localStorage.getItem('notesData');
if (fromLocalStorage) {
    data = JSON.parse(fromLocalStorage);

    render();
} else {
    data = [];
    noteId = 0;
}

function setToLocalStorage() {
    localStorage.setItem('notesData', JSON.stringify(data));
}

function render() {
    noteId = 0;
    notesEl.innerHTML = '';
    data.forEach(cardText => {
        addCard(cardText);
    });
}

function addCard(text='') {
    const card = `
        <div class="note" data-id="${noteId}">
            <div class="note__content">
                <div class="note__tools">
                    <button class="note--edit" data-id="edit">
                        <i class="fas fa-edit" data-id="edit"></i>
                    </button>
                    <button class="note--delete" data-id="delete">
                        <i class="fas fa-trash-alt" data-id="delete"></i>
                    </button>
                </div>
                <div class="main ${text ? "" : "hidden"}">${marked(text)}</div>
                <textarea class="${text ? "hidden" : ""}" data-id="text">${text}</textarea>
            </div>
        </div>
    `

    notesEl.insertAdjacentHTML('beforeend', card);
    noteId++;

    return text;
}

function addNote() {
    const text = addCard();
    data.push(text);

    setToLocalStorage();
}

addBtn.addEventListener('click', () => addNote());

function notesHandler(event) {
    const elem = event.target;
    const parent = elem.closest('.note');

    if (elem.dataset.id === 'edit') {
        const textArea = parent.querySelector('textarea');
        const main = parent.querySelector('.main');

        textArea.classList.toggle('hidden');
        main.classList.toggle('hidden');

        textArea.focus();
    } else if (elem.dataset.id === 'delete') {
        data.splice(parent.dataset.id, 1);

        setToLocalStorage();
        render();
    }
}

function textHandler(event) {
    const elem = event.target;
    const parent = elem.closest('.note');

    if (elem.dataset.id === 'text') {
        const textareaValue = parent.querySelector('textarea').value;
        data[parent.dataset.id] = textareaValue;

        setToLocalStorage();
        render();
    }
}

notesEl.addEventListener('focusout', textHandler);
notesEl.addEventListener('click', notesHandler);