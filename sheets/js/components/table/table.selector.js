/**
 * Get target cell of selected cell group
 * @param  {HTMLElement} $root The table main DOM elemnt
 * @param  {Event} event       Event
 * @return {void}         void
 */
export function selectorHandler($root, event) {
  return new Promise((resolve) => {
    // $table.classList.add('touch-action-none');
    // Get selectors
    const $selector = event.target;
    let $targetSelector = event.target;
    // Current and target blocks
    const current = $selector.getBoundingClientRect();
    let target = $targetSelector.getBoundingClientRect();
    // Coords
    let coords = getCoords();
    // Create selection block
    const selection = document.createElement('div');
    selection.classList.add('selector-selection');
    document.body.append(selection);

    function getCoords() {
      const startX = Math.min(current.x, target.x);
      const startY = Math.min(current.y, target.y);
      const endX = startX === current.x ? target.x + target.width : current.x + current.width;
      const endY = startY === current.y ? target.y + target.height : current.y + current.height;

      return { startX, startY, endX, endY};
    }

    function changeSelection() {
      selection.style.display = 'block';
      selection.style.top = `${coords.startY}px`;
      selection.style.width = `${coords.endX - coords.startX}px`;
      selection.style.height = `${coords.endY - coords.startY}px`;
      selection.style.left = `${coords.startX}px`;
    }

    document.onpointerover = (e) => {
      // console.log('over')
      if (e.target.dataset.type === 'cell') {
        $targetSelector = e.target;
        target = $targetSelector.getBoundingClientRect();
        coords = getCoords();
        changeSelection();
      }
    }

    document.onpointermove = (e) => {
      // const $el = document.elementFromPoint(e.pageX, e.pageY);
      // console.log('move:');
    }

    document.onpointercancel = (e) => {
      // console.log('Pointer cancel')
    }

    document.onpointerup = (e) => {
      // console.log('up')
      resolve($targetSelector);

      // Reset selection block
      selection.style.display = 'none';
      document.querySelector('.selector-selection').remove();

      // Reset events
      document.onpointerover = null;
      document.onpointermove = null;
      document.onpointerup = null;
    }
  });

}
