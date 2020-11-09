//DOM Elements
const elevationDisplayed = document.getElementById("elevation");
const livesDisplayed = document.getElementById("lives");
//calibrate canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.height = 800;
canvas.width = 1000;

//variables
let audioStarted = false;
let audioEnding = false;
let gameInit = false;
let gameStarted = false;
let gameOver = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;
let spacePressed = false;
let collision = false;
let fuelCollected = false;
let blast = false;
let blink;
let lives = 3;
let fuelTimer = 50;
let scoreAdder = 0;
let score = 0;
let timer = 140;
let fuel = 1000;
let bgScroll = 0;
let angle = 0; // wobble add to rocket
let frame = 0; // add any periodic triggers to the game
let elevation = 1;
let gameSpeed = 2; // to create parallax effect
let yPos = 0; // Used to set the first two backgrounds
let yPosR = 0; // Used to set the repeating background
let powerUps = 3;

//launchStage imgs
const keyUp = new Image();
keyUp.src = "img/key_up.png";
const keyLeft = new Image();
keyLeft.src = "img/key_left.png";
const keyRight = new Image();
keyRight.src = "img/key_right.png";
const keySpace = new Image();
keySpace.src = "img/space_bar.png";
const launchStage = new Image();
const stage2 = new Image();
const stars = new Image();
const heart = new Image();
const amp = new Image();
amp.src = "img/amp.png";
heart.src = "img/hearts.png";
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

//functions
function handleBackground() {
  if (yPosR === 0) {
    yPos += bgScroll * 0.5;
    ctx.drawImage(launchStage, 0, yPos, canvas.width, canvas.height);
    ctx.drawImage(stage2, 0, yPos - 800, canvas.width, canvas.height);
    ctx.drawImage(stars, 0, yPos - 1600, canvas.width, canvas.height);
  }
  if (yPos > 1600) {
    if (repeatBG.y1 >= repeatBG.height) repeatBG.y1 = -repeatBG.height;
    else repeatBG.y1 += bgScroll * 0.5;
    if (repeatBG.y2 >= repeatBG.height) repeatBG.y2 = -repeatBG.height;
    else repeatBG.y2 += bgScroll * 0.5;
    ctx.drawImage(stars, 0, repeatBG.y1, canvas.width, canvas.height + 30);
    ctx.drawImage(stars, 0, repeatBG.y2, canvas.width, canvas.height + 30);
  }
}

function collisionDetection() {
  if (asteroidHit(asteroidArray)) {
    blink = true;
    heartloss.play();
    lives--;
  }
  if (asteroidHit(bigAsteroidArray)) {
    heartloss.play();
    lives--;
  }
  if (fuelHit(fuelArray)) {
    if (fuel >= 800) {
      fuelAdd.play();
      fuel = 1000;
    } else {
      fuelAdd.play();
      fuel += 200;
    }
  }
}

function asteroidHit(array) {
  if (!collision && !gameOver && !spacePressed) {
    for (let i = 0; i < array.length; i++) {
      if (
        array[i].x < rocket.x + rocket.width &&
        array[i].x + array[i].width > rocket.x &&
        array[i].y < rocket.y + rocket.width &&
        array[i].y + array[i].width > rocket.y &&
        !array[i].blasted
      ) {
        collision = true;
        return true;
      }
    }
  }
}

function fuelHit(array) {
  if (!fuelCollected && !collision && !gameOver) {
    for (let i = 0; i < array.length; i++) {
      if (
        array[i].x < rocket.x + rocket.width &&
        array[i].x + array[i].width > rocket.x &&
        array[i].y < rocket.y + rocket.width &&
        array[i].y + array[i].width > rocket.y
      ) {
        array.splice(i, 1);
        fuelCollected = true;
        return true;
      }
    }
  }
}

function playerInfo() {
  //fuel meter
  ctx.save();
  ctx.font = "30px VT323";
  ctx.fillStyle = "red";
  ctx.fillRect(870, 40, 100, 10);
  ctx.shadowBlur = 30;
  ctx.shadowColor = "yellow";
  ctx.fillStyle = "yellow";
  ctx.fillRect(870, 40, fuel / 10, 10);
  if (fuel >= 1000) {
    ctx.fillText(`FUEL: MAX`, 867, 30);
  } else if (fuel > 0) {
    ctx.fillText(`FUEL: ${parseInt(fuel)}`, 867, 30);
  } else {
    ctx.fillText(`FUEL: EMPTY`, 855, 30);
  }
  ctx.restore();
  //hearts
  if (lives > 0) ctx.drawImage(heart, 800, 8, 50, 50);
  if (lives > 1) ctx.drawImage(heart, 750, 8, 50, 50);
  if (lives === 3) ctx.drawImage(heart, 700, 8, 50, 50);
  //power up
  powerBar();
  //elevation display
  ctx.save();
  ctx.font = "30px VT323";
  ctx.shadowBlur = 30;
  ctx.shadowColor = "yellow";
  ctx.fillStyle = "yellow";
  ctx.fillText(`SCORE: ${score} PTS`, 10, 35);
  ctx.restore();
}

function powerBar() {
  let maxed = (elevation / 3) % 700;
  if (maxed === 0) {
    fuel += 200;
    ampAdd.play();
    powerUps++;
  }
  ctx.fillStyle = "white";
  ctx.save();
  ctx.shadowBlur = 10;
  ctx.shadowColor = "cyan";
  ctx.fillRect(980, 780, 5, -700);
  ctx.fillStyle = "royalblue";
  ctx.fillRect(980, 780, 5, -maxed);
  ctx.restore();

  ctx.save();
  for (let i = 0; i < powerUps; i++) {
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.drawImage(amp, 890, 90 + i * 80, 80, 80);
  }
  ctx.restore();
}

function randomStartPos() {
  let ranNum = Math.random();
  if (ranNum < 0.5) {
    let leftStart;
    leftStart = Math.floor(Math.random() * 350);
    return leftStart;
  } else {
    let rightStart;
    rightStart = Math.floor(Math.random() * 350) + 350;
    return rightStart;
  }
}

function gameOverMan() {
  if (fuel <= 0 || lives === 0) {
    gameOver = true;
    clearInterval(smallAsteroidInterval);
    ctx.save();
    ctx.font = "100px VT323";
    ctx.shadowBlur = 30;
    ctx.shadowColor = "yellow";
    ctx.fillStyle = "yellow";
    ctx.fillText(`GAME OVER`, 310, 350);
    ctx.font = "20px VT323";
    ctx.fillText(`(click to restart)`, 425, 380);
    ctx.restore();
  }
}

function init() {
  clearInterval(smallAsteroidInterval);
  clearInterval(bigAsteroidInterval);
  rocket.x = 410;
  intervalStarted = false;
  intervalStarted2 = false;
  gameStarted = false;
  gameOver = false;
  upPressed = false;
  leftPressed = false;
  rightPressed = false;
  spacePressed = false;
  collision = false;
  fuelCollected = false;
  blast = false;
  lives = 3;
  fuelTimer = 50;
  scoreAdder = 0;
  score = 0;
  timer = 140;
  fuel = 1000;
  bgScroll = 0;
  angle = 0; // wobble add to rocket
  frame = 0; // add any periodic triggers to the game
  elevation = 1;
  gameSpeed = 2; // to create parallax effect
  yPos = 0; // Used to set the first two backgrounds
  yPosR = 0; // Used to set the repeating background
  powerUps = 3;
}

function handleAudio() {
  if (!gameStarted && !audioStarted) {
    gameEnding.pause();
    crowdNoise.play();
  } else if (!gameOver && !audioStarted){
    theme.play();
    audioStarted = true;
    audioEnding = false;
  } 
  if (elevation > 200) {
    crowdNoise.pause();
  }
  if (gameOver && !audioEnding) {
    theme.pause();
    theme.currentTime = 0;
    gameEnding.play();
    audioEnding = true;
    audioStarted = false;
  }
}

function startScreen() {
  if (!gameInit) {
    ctx.drawImage(stars, 0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.shadowBlur = 5;
    ctx.shadowColor = "yellow";
    ctx.fillStyle = "goldenrod";
    ctx.fillRect(224, 140, 560, 520);
    ctx.restore();
    //background1
    ctx.fillStyle = "#111";
    ctx.fillRect(234, 150, 540, 500);
    ctx.save();
    //title
    ctx.font = "100px VT323";
    ctx.shadowBlur = 13;
    ctx.shadowColor = "yellow";
    ctx.fillStyle = "yellow";
    ctx.fillText(`ROCKET SAUCE`, 265, 230);
    ctx.font = "20px VT323";
    //click to start
    ctx.fillText(`(click to start)`, 440, 630);
    ctx.restore();
    //controls
    ctx.fillStyle = "white";
    ctx.font = "30px VT323";
    ctx.fillText(`Press`, 340, 500);
    ctx.drawImage(keyUp, 425, 480, 30, 30);
    ctx.fillText(`to boost upward`, 480, 500);
    ctx.fillText(`Press`, 310, 540);
    ctx.drawImage(keyLeft, 380, 519, 30, 30);
    ctx.drawImage(keyRight, 415, 519, 30, 30);
    ctx.fillText(`to move side to side`, 460, 540);
    ctx.fillText(`Press`, 330, 580);
    ctx.drawImage(keySpace, 400, 560, 110, 30);
    ctx.fillText(`use power-up`, 520, 580);
    //instructions
    ctx.fillStyle = "yellow";
    ctx.font = "19px VT323";
    ctx.fillText(`"It's a long way to the top if you want to rock n' roll..."`, 280, 260);
    ctx.fillStyle = "white";
    ctx.font = "26px VT323";
    ctx.fillText(`-Collect fuel`, 310, 340);
    ctx.fillText(`-Avoid Asteroids`, 520, 340);
    ctx.fillText(`-Fill power-bar by gaining elevation`, 310, 375);
    ctx.fillText(`to earn power-ups`, 320, 400);
    //headings
    ctx.fillStyle = "cyan";
    ctx.font = "27px VT323";
    ctx.fillText(`OBJECTIVES`, 440, 305);
    ctx.fillText(`CONTROLS`, 455, 460);
    requestAnimationFrame(startScreen);
  }
}


//game loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  updateParameters();
  rocket.update();
  rocket.draw();
  handleAsteroids();
  handleFuel();
  console.log(smallAsteroidInterval);
  if (gameStarted) handleBlaster();
  if (gameStarted) collisionDetection();
  if (gameStarted) frame++;
  if (gameStarted) gameOverMan();
  playerInfo();
  handleAudio();
  requestAnimationFrame(animate);
}

startScreen();

//user input event listeners
window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowUp" && !gameOver) upPressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowUp") upPressed = false;
});

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowLeft" && !gameOver) leftPressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowLeft") leftPressed = false;
});

window.addEventListener("keydown", function (e) {
  if (e.code === "ArrowRight" && !gameOver) rightPressed = true;
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowRight") rightPressed = false;
});

window.addEventListener("keydown", function (e) {
  if (e.code === "Space" && powerUps > 0 && !gameOver) {
    if (blasterTimer > 390) powerUps--;
    blastAudio.play();
    spacePressed = true;
  }
});

window.addEventListener("keyup", function (e) {
  if (e.code === "ArrowDown") {
    theme.play();
    animate();
  }
});

canvas.addEventListener("click", function (e) {
  if (gameOver) init();
  if (!gameInit) {
    gameInit = true;
    animate();
  }
});
