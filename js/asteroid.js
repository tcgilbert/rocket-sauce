const asteroidArray = [];
const bigAsteroidArray = [];
let bigAsteroidInterval;
let smallAsteroidInterval;
let intervalStarted = false;
let intervalStarted2 = false;
let smallAsteroidRate = 500;
let bigAsteroidRate = 7000; 
let asteroidRate = .6;
let rateRandomizer;

const asteroidSmall = new Image();
const asteroidBig = new Image();
asteroidBig.src = "img/big-asteroid.png";
asteroidSmall.src = "img/meteor1.png";

class Asteroid {
  constructor() {
    this.x = randomStartPos();
    this.y = -20;
    this.width = 60;
    this.blasted = false;
  }
  draw() {
    if (!this.blasted){
      ctx.save();
      ctx.shadowBlur = 30;
      ctx.shadowColor = "red";
      ctx.drawImage(
        asteroidSmall,
        this.x - 40,
        this.y - 20,
        this.width * 2,
        this.width * 2
      );
      ctx.restore();
    } else {
      ctx.save();
      ctx.font = "30px VT323";
      ctx.shadowBlur = 30;
      ctx.shadowColor = "yellow";
      ctx.fillText(`+500pts`, this.x - 40, this.y - 20,);
      ctx.restore();
    }
  }
  update() {
    //speed of asteroid effected by boost rate
    this.y += 10;
    if (this.x < 350) this.x += Math.random() * 1.5;
    if (this.x > 350) this.x -= Math.random() * 1.5;
    this.draw();
  }
}

class bigAsteroid {
  constructor() {
    this.x = randomStartPos();
    this.y = -20;
    this.width = 200;
    this.blasted = false;
  }
  draw() {
    if (!this.blasted) {
      ctx.fillStyle = "cyan";
      ctx.save();
      ctx.shadowBlur = 30;
      ctx.shadowColor = "red";
      ctx.drawImage(
        asteroidBig,
        this.x - 70,
        this.y - 70,
        this.width * 1.7,
        this.width * 1.7
      );
      ctx.restore();
    } else {
      ctx.save();
      ctx.font = "50px VT323";
      ctx.shadowBlur = 30;
      ctx.shadowColor = "yellow";
      ctx.fillText(`+1000pts`, this.x - 40, this.y - 20,);
      ctx.restore();
    }
  }
  update() {
    this.y += 5;
    this.draw();
  }
}

function handleAsteroids() {
  if (!gameStarted) {
    for (let i = 0; i < asteroidArray.length; i++) {
      asteroidArray.pop();
    }
    for (let i = 0; i < bigAsteroidArray.length; i++) {
      bigAsteroidArray.pop();
    }
  }
  if (elevation > 100) {
    //BIG asteroids
    if (!intervalStarted2){
      bigAsteroidInterval = setInterval(spawnAsteroidBig, bigAsteroidRate);
      intervalStarted2 = true;
    }
    for (let i = 0; i < bigAsteroidArray.length; i++) {
      bigAsteroidArray[i].update();
    }
    if (bigAsteroidArray.length > 4) {
      bigAsteroidArray.pop(bigAsteroidArray[0]);
    }
    
    //small asteroids
    if (!intervalStarted){
      smallAsteroidInterval = setInterval(spawnAsteroidSmall, smallAsteroidRate);
      intervalStarted = true;
    }
    for (let i = 0; i < asteroidArray.length; i++) {
      asteroidArray[i].update();
    }
    if (asteroidArray.length > 5) {
      asteroidArray.pop(asteroidArray[0]);
    } 
  }
}

function spawnAsteroidSmall() {
  rateRandomizer = Math.random();
  if (rateRandomizer < asteroidRate) asteroidArray.unshift(new Asteroid);
}

function spawnAsteroidBig() {
  bigAsteroidArray.unshift(new bigAsteroid);
}