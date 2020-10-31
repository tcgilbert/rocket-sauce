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



//game loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

