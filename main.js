//calibrate canvas
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.height = 800;
canvas.width = 700;

//variables
let upPressed = false;
let leftPressed = false;
let rightPressed = false;
let spacePressed = false;
let angle = 0; // tilt rocket when not boosting MAY NOT USE
let frame = 0; // add any periodic triggers to the game
let elevation = 0;
let gameSpeed = 2; // to create parallax effect
ctx.fillStyle = 'white';


//background img
const background = new Image();
console.log(background);
background.src = 'img/stage-1.jpg';
const BG = {
    x: 0,
    y1: 0,
    y2: canvas.height,
    width: canvas.width,
    height: canvas.height
}

function handleBackground(){
    if (BG.y1 >= BG.height) BG.y1 = canvas.height;
    // else BG.y1 += .5;
    ctx.drawImage(background, BG.x, BG.y1, BG.width, BG.height);
}

//game loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    rocket.update();
    rocket.draw();
    //create animation loop
    requestAnimationFrame(animate);
}
animate();

//user input event listeners
window.addEventListener('keydown', function(e){
    if (e.code === 'ArrowUp') upPressed = true;
});

window.addEventListener('keyup', function(e){
    if (e.code === 'ArrowUp') upPressed = false;
});

window.addEventListener('keydown', function(e){
    if (e.code === 'ArrowLeft') leftPressed = true;
});

window.addEventListener('keyup', function(e){
    if (e.code === 'ArrowLeft') leftPressed = false;
});

window.addEventListener('keydown', function(e){
    if (e.code === 'ArrowRight') rightPressed = true;
});

window.addEventListener('keyup', function(e){
    if (e.code === 'ArrowRight') rightPressed = false;
});
