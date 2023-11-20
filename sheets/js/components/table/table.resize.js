export function resizeTable($root, event) {
  const typeResize = event.target.dataset.resize;
  const $resizer = event.target;
  $resizer.style.opacity = 1;

  if (typeResize === 'col') {
      $resizer.style.bottom = '-100vh';
    } else if (typeResize === 'row') {
      $resizer.style.width = '100vw';
    }
  

  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getBoundingClientRect();
  let value = null;

  document.onpointermove = (e) => {
    if (typeResize === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resizer.style.right = -delta + 'px';
    } else if (typeResize === 'row') {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resizer.style.bottom = -delta + 'px';
    }
  }

  document.onpointerup = (e) => {
    if (typeResize === 'col') {
      const cells = $root.querySelectorAll(`[data-col="${$parent.dataset.col}"]`);
      cells.forEach((cell) => cell.style.width = value + 'px');
    } else if (typeResize === 'row') {
      $parent.style.height = value + 'px';
      $resizer.style.width = '100%';
    }

    $resizer.style.opacity = 0;
    $resizer.style.bottom = 0;
    $resizer.style.right = 0;


    document.onpointermove = null;
    document.onpointerup = null;
  }
}