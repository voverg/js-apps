// Select html elements
const balanceElem = document.querySelector('.balance__value');
const incomeTotalElem = document.querySelector('.income__total');
const outcomeTotalElem = document.querySelector('.outcome__total');
const incomeElem = document.querySelector('.dashboard__income');
const expenseElem = document.querySelector('.dashboard__expense');
const allElem = document.querySelector('.dashboard__all');
const income_ul = document.querySelector('.dashboard__income .list');
const expense_ul = document.querySelector('.dashboard__expense .list');
const all_ul = document.querySelector('.dashboard__all .list');
// Select the tab buttons
const incomeBtn = document.querySelector('.income-tab');
const expenseBtn = document.querySelector('.expense-tab');
const allBtn = document.querySelector('.all-tab');
// Select the inputs
const incomeAddBtn = document.querySelector('.add-income');
const incomeTitleInput = document.querySelector('.income-title-input');
const incomeAmountInput = document.querySelector('.income-amount-input');

const expenseAddBtn = document.querySelector('.add-expense');
const expenseTitleInput = document.querySelector('.expense-title-input');
const expenseAmountInput = document.querySelector('.expense-amount-input');
// Variables
let entryList = [];
let balance = 0, income = 0, outcome = 0;
const del = 'delete', edit = 'edit';

// Set data to lacal storage
function setDataToLocalStorage () {
    localStorage.setItem('entryList', JSON.stringify(entryList));
}
// Get data from local storage
let data = localStorage.getItem('entryList');
if (data) {
    entryList = JSON.parse(data);
} else {
    entryList = [];
}
updateUI();

// --------------- Functions ----------------------------
function updateUI() {
    income = calculateTotal('income', entryList);
    outcome = calculateTotal('expense', entryList);
    balance = calculateBalance(income, outcome);

    balanceElem.innerHTML = `${balance}<small> RUR</small>`;
    incomeTotalElem.innerHTML = `${income}<small> RUR</small>`;
    outcomeTotalElem.innerHTML = `${outcome}<small> RUR</small>`;

    clearElements( [expense_ul, income_ul, all_ul] );

    entryList.forEach((entry, index) => {
        if (entry.type === 'income') {
            showEntry(income_ul, entry.type, entry.title, entry.amount, index);
        } else if (entry.type === 'expense') {
            showEntry(expense_ul, entry.type, entry.title, entry.amount, index);
        }
        showEntry(all_ul, entry.type, entry.title, entry.amount, index);
    })

    updateChart(income, outcome);
    setDataToLocalStorage();
}

function showEntry(list, type, title, amount, id) {
    const operation = type == 'income' ? '+' : '-';
    const entry = `<li id="${id}" class="li__${type}">
                        <div class="entry">${title}:&nbsp;&nbsp; ${operation}${amount} руб.</div>
                        <div class="edit"></div>
                        <div class="delete"></div>
                    </li>`

    list.insertAdjacentHTML('afterbegin', entry);
}

function clearElements( elements ) {
    elements.forEach(elem => {
        elem.innerHTML = '';
    })
}

function calculateTotal(type, list) {
    let sum = 0;
    list.forEach(item => {
        if (item.type === type) {
            sum += item.amount;
        }
    })
    return sum;
}

function calculateBalance(income, outcome) {
    return income - outcome;
}

// ------------- Add notes
// Add a new income note
function addIncomeNote(btn) {
    btn.parentNode.firstElementChild.focus()
    if (!incomeTitleInput.value.trim() || !incomeAmountInput.value.trim()) return;

    let income = {
        type: 'income',
        title: incomeTitleInput.value,
        amount: parseInt(incomeAmountInput.value)
    }
    entryList.push(income);

    updateUI();
    clearInputs( [incomeTitleInput, incomeAmountInput] );
}

function addExpenseNote(btn) {
    btn.parentNode.firstElementChild.focus();
    if (!expenseTitleInput.value.trim() || !expenseAmountInput.value.trim()) return;

    let expense = {
        type: 'expense',
        title: expenseTitleInput.value,
        amount: parseInt(expenseAmountInput.value)
    }
    entryList.push(expense);

    updateUI();
    clearInputs( [expenseTitleInput, expenseAmountInput] );
}

// Clear inputs after added notes
function clearInputs( inputs ) {
    inputs.forEach(input => {
        input.value = '';
    })
}


// ------------- Delete or edit notes (li elements)
function deleteOrEdit(event) {
    const targetBtn = event.target;
    const entry = targetBtn.parentNode;

    if (targetBtn.classList.contains('delete')) {
        const conf = confirm('Точно хочешь удалить эту запись?');
        if (!conf) return;
        deleteEntry(entry);
    } else if (targetBtn.classList.contains('edit')) {
        editEntry(entry);
    }

    updateUI();
}

function deleteEntry(entry) {
    entryList.splice(parseInt(entry.id), 1);
    entry.remove();
}

function editEntry(entryElem) {
    let entry = entryList[entryElem.id];

    if (entry.type === 'income') {
        incomeTitleInput.value = entry.title;
        incomeAmountInput.value = entry.amount;
    } else if (entry.type === 'expense') {
        expenseTitleInput.value = entry.title;
        expenseAmountInput.value = entry.amount;
    }

    deleteEntry(entryElem);
}

// -------------Show and hide tabs and dashboard screens categories
function show(elem) {
    elem.classList.remove('hide');
}

function hide( array ) {
    array.forEach(elem => {
        elem.classList.add('hide');
    });
}

function active(tab) {
    tab.classList.add('active');
}

function inactive( arrayTabs ) {
    arrayTabs.forEach(tab => {
        tab.classList.remove('active');
    });
}

// ------------------------------ Event listeners
// Show and hide tabs
incomeBtn.addEventListener('click', function() {
    show(incomeElem);
    hide( [expenseElem, allElem] );
    active(incomeBtn);
    inactive( [expenseBtn, allBtn] );
    incomeTitleInput.focus();
})
expenseBtn.addEventListener('click', function() {
    show(expenseElem);
    hide( [incomeElem, allElem] );
    active(expenseBtn);
    inactive( [incomeBtn, allBtn] );
    expenseTitleInput.focus();
})
allBtn.addEventListener('click', function() {
    show(allElem);
    hide( [expenseElem, incomeElem] );
    active(allBtn);
    inactive( [expenseBtn, incomeBtn] );
})

// Add notes
incomeAddBtn.addEventListener('click', event => {
    addIncomeNote(event.target);
});
incomeAmountInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        addIncomeNote(event.target);
    }
})
expenseAddBtn.addEventListener('click', event => {
    addExpenseNote(event.target);
});
expenseAmountInput.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        addExpenseNote(event.target);
    }
})

// Edit or delete notes handlers
income_ul.addEventListener('click', deleteOrEdit);
expense_ul.addEventListener('click', deleteOrEdit);
all_ul.addEventListener('click', deleteOrEdit);