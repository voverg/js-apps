const $boxes = document.querySelectorAll('.box');

// Add event listener for window object on scroll event
window.addEventListener('scroll', checkBoxes);

checkBoxes();

function checkBoxes() {
    // Get the 4/5 current window height in pixels
    const triggerBottom = window.innerHeight / 5 * 4;

    $boxes.forEach(box => {
        // Get the top coordanate of each box (in scroll time)
        const boxTop = box.getBoundingClientRect().top;

        if(boxTop < triggerBottom) {
            box.classList.add('show');
        } else {
            box.classList.remove('show');
        }
    });
}