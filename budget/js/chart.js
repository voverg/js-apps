// Select the chart html element
const chartElem = document.querySelector('.chart');
// Create a canvas element
const canvas = document.createElement('canvas');
canvas.width = 50;
canvas.height = 50;

chartElem.appendChild(canvas);

const ctx = canvas.getContext('2d'); // Get context of canvas
ctx.lineWidth = 8; // Change the line width
const r = 20; // Circle radius

function drawCircle(color, ratio, anticlockwise) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, r, 0, ratio * 2 * Math.PI, anticlockwise);
    ctx.stroke();
}

function updateChart(income, outcome) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let ratio = income / (income + outcome);

    drawCircle('#39C55DFF', - ratio, true);
    drawCircle('#f0624d', 1 - ratio, false);
}
