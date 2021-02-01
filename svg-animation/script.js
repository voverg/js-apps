const progressEl = document.querySelector('#progress');

// Create diagram progress circle elements and add them to html
const data = [
    {title: 'Кошки', value: 90},
    {title: 'Собаки', value: 30},
    {title: 'Слоны', value: 60},
    {title: 'Попугаи', value: 85},
    {title: 'Утки', value: 80},
    {title: 'Зайцы', value: 70},
];
const progressItems = [];

function createElem(data, id) {
    const newBlock = `
        <div class="progress__item" data-id="${id}">
            <svg>
                <circle cx="50" cy="50" r="40"></circle>
                <circle cx="50" cy="50" r="40" class="progress__circle" data-persent="${data.value}"></circle>
            </svg>
            <div class="progress__persents"><span>0</span>%</div>
            <div class="progress__text">
                ${data.title}
            </div>
        </div>
    `;

    return newBlock;
}

data.forEach((item, index) => {
    const newItem = createElem(item, index);
    progressItems.push(newItem);
});

progressEl.innerHTML = progressItems.join('\n');

// Progress bars elements
const circles = document.querySelectorAll('.progress__circle');
const persentsEl = document.querySelectorAll('.progress__persents span');
const radius = circles[0].r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// Progress bar functions
function setProgress(persent, index) {
    let current = 0;
    const progress = circumference / 100 * persent;
    let intervalId = setInterval(() => {
        if (current > progress) {
            clearInterval(intervalId);
        } else {
            circles[index].style.strokeDashoffset = circumference - current;
            persentsEl[index].textContent =  Math.round(current / 2.51);
        }
        current++;
    }, 1)
}

let checkAnimate = 0;
function startAnimate() {
    if (checkAnimate > 0) return

    circles.forEach((elem, index) => {
        const persent = elem.dataset.persent;
        setProgress(persent, index);
    })

    checkAnimate++;
}

startAnimate();