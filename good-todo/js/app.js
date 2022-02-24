// Select the elements
const wikiElem = document.querySelector('.wiki');
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const filterElem = document.querySelector('.filter');
const ul = document.querySelector('#list');
const plusButton = document.querySelector('#plus-button');
const input = document.querySelector('#input');
// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';
// Variables
let taskList, id, icons;

// Get data from localStorage
let data = localStorage.getItem('taskList');
if (data) {
    taskList = JSON.parse(data);
    id = taskList.length;

    loadList(taskList);
} else {
    wikiElem.classList.remove('hide');
    taskList = [];
    id = 0;
}

// Creat UI of loaded taskList from localStorage
function loadList(array) {
    ul.innerHTML = '';
    array.forEach(function(item) {
        if (!item.trash && !item.done) {
            addToDo(item.name, item.id, item.done, item.trash);
        }
    });
}

// Set data to localStorage
function addDataToLocalStorage() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

//Show today date
const options = {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('ru-RU', options);

// Delete active class from anactive filter UI
function deleteFilterActiveClass() {
    Array.from(filterElem.children).forEach(function(elem) {
        elem.classList.remove('filter__item-active');
    })
}
// Filter function
function taskFilter (array, status) {
    if (status === 'current') {
        loadList(taskList);
    } else if (status === 'done') {
        ul.innerHTML = '';
        array.forEach(function(item) {
            if (item.done && !item.trash) {
                addToDo(item.name, item.id, item.done, item.trash);
            }
        })
    } else if (status === 'deleted') {
        ul.innerHTML = '';
        array.forEach(function(item) {
            if (item.trash) {
                // addToDo(item.name, item.id, item.done, item.trash);
                const elem = `
                <li class="item">
                    <i class="fa fa-remove co"></i>
                    <p class="text">${item.name}</p>
                </li>
                `;
    ul.insertAdjacentHTML('beforeend', elem);
            }
        })
    }
}

// Add to-do UI function
function addToDo(toDo, id, done, trash) {
    // check if item is done
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';
    const statusEditable = done ? false : true;
    // create item UI
    const item = `
                <li class="item">
                    <i class="fa ${DONE} co" data-job="complete" data-id="${id}"></i>
                    <p class="text ${LINE}" contenteditable="${statusEditable}">${toDo}</p>
                    <i class="fa fa-trash-o de" data-job="delete" data-id="${id}"></i>
                </li>
                `;
    const position = 'beforeend';
    ul.insertAdjacentHTML(position, item);
}
//add to-do item to taskList array
function addItemToTaskList(toDo, id, done, trash) {
    taskList.push({
        name: toDo,
        id: id,
        done: done,
        trash: trash
    })

    addDataToLocalStorage();
}

// Complete to do
function completeToDo(elem) {
    elem.classList.toggle(CHECK);
    elem.classList.toggle(UNCHECK);
    elem.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    taskList[elem.dataset.id].done = taskList[elem.dataset.id].done ? false : true;

    setTimeout(() => {
        ul.removeChild(elem.parentNode)
    }, 300);

    addDataToLocalStorage();
}

function soundClick() {
    let audio = new Audio();
    audio.src = './img/right_ring.mp3';
    audio.autoplay = true;
}

// Remove to do
function removeToDo(elem) {
    taskList[elem.dataset.id].trash = true;
    ul.removeChild(elem.closest('li'));

    addDataToLocalStorage();
}

// Edit task note function
function editTask (elem) {
    const id = elem.closest('li').children[0].dataset.id;

    elem.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            elem.blur();
        }
    });

    elem.addEventListener('blur', event => {
        if (!elem.textContent.trim()) {
            taskList[id].trash = true;
            ul.removeChild(elem.closest('li'));
        } else {
            taskList[id].name = elem.textContent;
        }

        addDataToLocalStorage();
    })
}



// Search function
function searchFilter(array, val) {
    ul.innerHTML = '';
    // deleteFilterActiveClass();
    // filterElem.querySelector('[data-status="current"]').classList.add('filter__item-active');
    array.forEach(function(item) {
        let text = item.name.toLowerCase();
        if (!item.trash && text.includes(val)) {
            text = `${text.slice(0, text.search(val))}<mark>${val}</mark>${text.slice(text.search(val) + val.length)}`;
            addToDo(text, item.id, item.done, item.trash);
        }
    });
}
// Change plusButton icon
function changePlusButton () {
        plusButton.classList.remove(icons[0], icons[1]);
        plusButton.classList.add(icons[2]);
}

// --------------------------------------------- Event listeners
// Task filters
filterElem.addEventListener('click', function(event) {
    const status = event.target.dataset.status;
    if (status === 'current' || status === 'done' || status === 'deleted') {
        deleteFilterActiveClass();
        event.target.classList.add('filter__item-active');

        taskFilter(taskList, status);
    }
})
// Add item to the list by user enter key
input.addEventListener('keyup', function(event) {
    const toDo = input.value;
    if (event.keyCode == 13 && toDo.trim() != '') {
        wikiElem.classList.add('hide');
        addToDo(toDo, id, false, false);
        addItemToTaskList(toDo, id, false, false);
        // Change tab to curent and update list of the task UI
        deleteFilterActiveClass();
        filterElem.querySelector('[data-status="current"]').classList.add('filter__item-active');
        loadList(taskList);

        id++;
        input.value = '';
    }
})
// Add item to the list by click plus button
plusButton.addEventListener('click', function() {
    const toDo = input.value;
    if (plusButton.classList.contains('fa-plus-circle') && toDo.trim() != '') {
        addToDo(toDo, id, false, false);
        addItemToTaskList(toDo, id, false, false);

        id++;
        input.value = '';
    } else if (plusButton.classList.contains('fa-close')) {
        input.value = ''; 
        icons = ['fa-close', 'fa-search', 'fa-plus-circle'];
        changePlusButton(icons);
        loadList(taskList);
    }
    input.focus();
})

// Complite or remove tasks
ul.addEventListener('click', function (event) {
    const elem = event.target;
    if (elem.dataset.job) {
        const elemJob = elem.dataset.job;
        if (elemJob == 'complete') {
            soundClick();
            completeToDo(elem);
        } else  if (elemJob == 'delete') {
            const conf = confirm('Точно хочешь удалить эту задачу?');
            if (conf) {
                removeToDo(elem);
            }
        }
    } else if (elem.classList.contains('text')) {
        editTask(elem);
    }
    // input.focus();
})

// Clear localStorage
clear.addEventListener('click', function () {
    const result = confirm('Эй, ты, точно хочешь удалить все задачи?');
    if (result) {
        localStorage.clear();
        location.reload();
    }
})

// Search filter
input.addEventListener('input', function () {
    let val = input.value.toLowerCase().trim();
    if (val == '/' && val.length == 1) {
        deleteFilterActiveClass();
        filterElem.querySelector('[data-status="current"]').classList.add('filter__item-active');
        icons = ['fa-plus-circle', 'fa-close', 'fa-search'];
        changePlusButton(icons);
        loadList(taskList);
    } else if (val[0] == '/' && val.length > 1) {
        icons = ['fa-search', 'fa-plus-circle', 'fa-close'];
        changePlusButton(icons);

        val = val.slice(1).trim();
        searchFilter(taskList, val);
    } else {
        icons = ['fa-search', 'fa-close', 'fa-plus-circle'];
        changePlusButton(icons);
    }
})
