//DOM Elements
const startButton = document.getElementById('start');
const elevationDisplayed = document.getElementById('elevation');
//calibrate canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.height = 800;
canvas.width = 1000;

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
let yPos = 0; // Used to set the first two backgrounds
let yPosR = 0; // Used to set the repeating background

//launchStage imgs
const launchStage = new Image();
const stage2 = new Image();
const stars = new Image();
stars.src = "img/repeat.jpg";
launchStage.src = "img/launch-stage.jpg";
stage2.src = "img/stage-2.jpg";


const repeatBG = {
  x: 0,
  y1: 0,
  y2: canvas.height,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  if (yPosR === 0) {
    yPos += bgScroll * 0.2;
    ctx.drawImage(launchStage, 0, yPos, canvas.width, canvas.height);
    ctx.drawImage(stage2, 0, yPos - 800, canvas.width, canvas.height);
    ctx.drawImage(stars, 0, yPos - 1600, canvas.width, canvas.height);
  }
  if (yPos > 1600) {
    
    if (repeatBG.y1 >= repeatBG.height) repeatBG.y1 = -repeatBG.height;
    else repeatBG.y1 += bgScroll * 0.2;
    if (repeatBG.y2 >= repeatBG.height) repeatBG.y2 = -repeatBG.height;
    else repeatBG.y2 += bgScroll * 0.2;
    ctx.drawImage(stars, 0, repeatBG.y1, canvas.width, canvas.height);
    ctx.drawImage(stars, 0, repeatBG.y2, canvas.width, canvas.height);
  }
}

//game loop


//TO DO - get initial display before game loop starts
rocket.update();
rocket.draw();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  rocket.update();
  rocket.draw();
  handleAsteroids();
  requestAnimationFrame(animate);
  if(elevation > 20) frame++;
  elevationDisplayed.innerText = elevation;
}
animate();

//user input event listeners
// startButton.addEventListener('click', animate);

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowUp") upPressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowUp") upPressed = false;
});

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowLeft") leftPressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowLeft") leftPressed = false;
});

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowRight") rightPressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowRight") rightPressed = false;
});
