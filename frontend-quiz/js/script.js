const tabs = document.querySelector('.tabs');
const blocks = document.querySelector('.blocks');

Array.from(blocks.children).forEach((elem, index) => {
    const componentEl = new Component(elem);
    const quizList = [htmlData, cssData, jsData];
    const data = quizList[index];
    new Quiz(componentEl.block, data);
});

function changeTab(event) {
    const targetTab = event.target;
    if (!targetTab.classList.contains('tab')) return;
    const targetBlock = blocks.querySelector(`#${targetTab.dataset.block}`);

    for (let i=0, length=tabs.children.length; i < length; i++) {
        tabs.children[i].classList.remove('tab--active');
        blocks.children[i].classList.add('hidden');
        document.body.classList.remove('correct', 'wrong');
    }

    targetTab.classList.add('tab--active');
    targetBlock.classList.remove('hidden');
}

tabs.addEventListener('click', changeTab);