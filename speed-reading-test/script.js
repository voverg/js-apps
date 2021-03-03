const tab1 = document.querySelector('.tab-1');
const tab2 = document.querySelector('.tab-2');
const block1 = document.querySelector('.block-1');
const block2 = document.querySelector('.block-2');

start();

function start() {
    createBlock(block1, data.block1);
    startTest();
}

function createBlock(block, blockContent) {
    block.innerHTML = blockContent;
    // Object.keys(obj).forEach(item => {
    //     const elem = document.createElement(item);
    //     elem.classList.add(...obj[item][0]);
    //     elem.innerHTML = obj[item][1];
    //     block.append(elem);
    // });
}

function changeTab(tab1, block1, tab2, block2) {
    tab1.classList.add('tab--active');
    block1.classList.remove('hidden');
    tab2.classList.remove('tab--active');
    block2.classList.add('hidden');
}

tab1.addEventListener('click', () => {
    changeTab(tab1, block1, tab2, block2);
    start();
});

tab2.addEventListener('click', () => {
    changeTab(tab2, block2, tab1, block1);
    findReadingTime();
});

