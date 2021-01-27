const $fill = document.querySelector('.fill');
const $empties = document.querySelectorAll('.empty');

$fill.addEventListener('dragstart', dragStart);
$fill.addEventListener('dragend', dragEnd);

for(const empty of $empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
}

function dragStart(event) {
    this.classList.add('hold');
    setTimeout(() => this.classList = 'invisible', 0);
}

function dragEnd() {
    this.classList.add('fill');
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    this.classList.add('hovered');
}

function dragLeave() {
    this.classList.remove('hovered');
}

function dragDrop() {
    console.log('Drag drop', this);
    $fill.classList = 'fill';
    this.classList = 'empty';
    this.append($fill);
}