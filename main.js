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
let bgScroll = 0;
let angle = 0; // wobble add to rocket
let frame = 0; // add any periodic triggers to the game
let elevation = 0;
let gameSpeed = 2; // to create parallax effect
ctx.fillStyle = 'white';


//launchStage imgs

const launchStage = new Image();
const stage2 = new Image();
launchStage.src = 'img/launch-stage.jpg';
stage2.src = 'img/staage-2.jpg'

const BG = {
    x: 0,
    y1: 0,
    y2: canvas.height,
    width: canvas.width,
    height: canvas.height
}

function handlelaunchStage(){
    BG.y1 += (bgScroll * .12);
    ctx.drawImage(launchStage, BG.x, BG.y1, BG.width, BG.height);
    ctx.drawImage(stage2, BG.x, BG.y1 - BG.height, BG.width, BG.height)
}

//game loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handlelaunchStage();
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
