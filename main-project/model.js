const titles = [
    'expanding-cards',
    'progress-steps',
    'rotating-navigation',
    'hidden-search',
    'blurry-loading',
    'scroll-animation',
    'form-input-wave',
    'animated-navigation',
    'event-keycode',
    'faq-collaps',
    'good-todo',
    'budget',
    'notes-app',
    'drag-n-drop',
    'svg-animation',
    'piano',
    'speed-reading-test',
    'frontend-quiz',
    'shine-board',
    'split-landing-page',
    'habits',
    'sort-slider',
]

function getData(list) {
    const resultList = list.map((item, index) => {
        const titleItems = item.split('-');
        titleItems[0] = titleItems[0][0].toUpperCase() + titleItems[0].slice(1);
        const title = `${titleItems.join(' ')}`;

        const url = `./${item}/index.html`;
        const img = `./main-project/img/${item}.png`;

        return {id: index, title, url, img};
    });

    return resultList;
}

const model = getData(titles);


/* const modelExample = [
    {
        id: 2,
        title: 'Expanding cards',
        url: './expanding-cards/index.html',
        img: './main-project/img/expanding-cards.png'
    },
] */
