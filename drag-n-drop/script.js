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
  const target = event.target;
  target.classList.add('selected');
  setTimeout(() => target.classList = 'invisible', 0);
}

function dragEnd(event) {
  const target = event.target;
  target.classList.add('fill');
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
  const target = event.target;
  target.classList.add('hovered');
}

function dragLeave(event) {
  const target = event.target;
  target.classList.remove('hovered');
}

function dragDrop(event) {
  const target = event.target;
  target.classList.remove('hovered');
  target.append($fill);
}
