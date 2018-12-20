const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.clientHeight = window.innerHeight - 110;


// Color

ctx.strokeStyle = '#BADA55'
// what to do when lines meet other lines
ctx.lineJoin = 'round'
// determines how the lines end (round, square, etc)
// Lookup online!
ctx.lineCap = 'round';

// create variable to store line width
ctx.lineWidth = 100;


//variable to determine whether to draw or no draw
// create a 'flag'
// very commmon in JS
let isDrawing = false;

// this will determine the starting coordinates for X and Y
let lastX = 0;
let lastY = 0;
// control the hue of hsl element
let hue = 0;
let direction = true;

// create the draw function 
// draw function is called whenever mouse moves across the canvas 

function draw(e) {
    // stop the function from running when not mouse down
    if(!isDrawing) return;
    console.log(e);
    // HSL - (hue = 0-360, saturation = 0-100%, lightness = 0-100%)
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from x and y
    ctx.moveTo(lastX, lastY); 
    // move to another x and y
    // go to this x, y
    ctx.lineTo(e.offsetX, e.offsetY);
    // lines wont appear until we call stroke();
    ctx.stroke();
    // lastX = e.offsetX;
    // lastY = e.offsetY;

    // ES6 TRICK — Destructuring an array 
    // can also set both lastX and lastY variable in a single line
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    } 
    
    if(direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }

}


// call the draw function whenever the mouse moves on the canvas
canvas.addEventListener('mousemove', draw);
// create event listener that changes the flag for isDrawing to true when user clicks down on canvas
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    // need to update lastX and lastY so starting point is not always where you last left off
    // Starting point should always be the current x,y coordinates of the mouse
    // this works b/c the 'mousemove' event listener is constantly grabbing the current coordinates of the mosue 
    [lastX, lastY] = [e.offsetX, e.offsetY];
 

});
// create event listener that changes  isDrawing flag to flase, when user clicks up on canvas
canvas.addEventListener('mouseup', () => isDrawing = false);
// edge case = create event listener when user exits the canvas 
canvas.addEventListener('mouseout', () => isDrawing = false);


// create drawing board below canvas

// for(var i = 0; i < 12; i++) {
//     let colorBox = document.createElement('div');
//     colorBox.className = `colorSelector${i}`;
//     document.querySelector(`.colorSelector${i}`).addEventListener('click',() => console.log(`clicked${i}`) )
//     colorBox.style.width = '100px';
//     colorBox.style.height = '100px';
//     colorBox.style.background = `hsl(${30 * i}, 100%, 50%)`
//     colorBox.addEventListener('click', () => {
//         console.log('clicked')
//         hue+= 30;
//     }); 
//     colorBox.style.display = 'inline-block' 
//     document.body.appendChild(colorBox);
// }

