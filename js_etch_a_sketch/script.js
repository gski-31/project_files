// • SELECT THE ELEMENTS ON THE PAGE
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 50;

// destructured variables for w & h
const { width } = canvas;
const { height } = canvas;

// create random starting points for dot
function randomPoint(dimension) {
        return Math.floor(Math.random() * dimension);
}

let x = randomPoint(width);
let y = randomPoint(height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 8;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// • WRITE DRAW FUNCTION
function draw({ key }) {
        // change hue on movement
        hue += 5;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        // start the dot
        ctx.beginPath();
        ctx.moveTo(x, y);
        // move the dot
        switch (key) {
                case 'ArrowUp':
                        y -= MOVE_AMOUNT;
                        break;
                case 'ArrowDown':
                        y += MOVE_AMOUNT;
                        break;
                case 'ArrowLeft':
                        x -= MOVE_AMOUNT;
                        break;
                case 'ArrowRight':
                        x += MOVE_AMOUNT;
                        break;
                default:
                        break;
        }
        ctx.lineTo(x, y);
        ctx.stroke();
}

// • WRITE KEY HANDLER
function handleKey(e) {
        if (e.key.includes('Arrow')) {
                e.preventDefault();
                draw({ key: e.key });
        }
}
// • WRITE SHAKE FUNCTION
function clearCanvas() {
        canvas.classList.add('shake');
        ctx.clearRect(0, 0, width, height);
        canvas.addEventListener(
                'animationend',
                function() {
                        console.log('Done the shake!');
                        canvas.classList.remove('shake');
                },
                { once: true }
        );
}

// • LISTEN FOR ARROW KEYS
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);
