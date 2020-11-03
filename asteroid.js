const asteroidArray = [];
const bigAsteroidArray = [];
let smallAsteroidRate = 200;
let bigAsteroidRate = 400; //change this in the handleAsteroids function
class Asteroid {
  constructor() {
    this.x = randomStartPos();
    this.y = -20;
    this.width = 60;
  }
  draw() {
    ctx.fillStyle = "chartreuse";
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }
  update() {
    //speed of asteroid effected by boost rate
    this.y += 1 + bgScroll * 0.1;
    // this.randVel();
    if (elevation > 600) smallAsteroidRate = 100;
    this.draw();
  }
}

class bigAsteroid {
  constructor() {
    this.x = randomStartPos();
    this.y = -20;
    this.width = 200;
  }
  draw() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(this.x, this.y, this.width, this.width);
  }
  update() {
    this.y += 3;
    this.draw();
  }
}

function handleAsteroids() {
  if (elevation > 210) {
    //small asteroids
    if (frame % smallAsteroidRate === 0) {
      asteroidArray.unshift(new Asteroid());
    }
    for (let i = 0; i < asteroidArray.length; i++) {
        asteroidArray[i].update();
    }
    if (asteroidArray.length > 5) {
      asteroidArray.pop(asteroidArray[0]);
    }
    //BIG asteroids
    if (frame % bigAsteroidRate === 0 && elevation > 1000) {
      bigAsteroidArray.unshift(new bigAsteroid());
    }
    for (let i = 0; i < bigAsteroidArray.length; i++) {
      bigAsteroidArray[i].update();
    }
    if (bigAsteroidArray.length > 4) {
      bigAsteroidArray.pop(bigAsteroidArray[0]);
    }
  }
}

function randomStartPos() {
  let ranNum = Math.random();
  if (ranNum < 0.5) {
    let leftStart;
    leftStart = Math.floor(Math.random() * 350);
    console.log(`left: ${leftStart}`);
    return leftStart;
  } else {
    let rightStart;
    rightStart = Math.floor(Math.random() * 350) + 330;
    console.log(`right: ${rightStart}`);
    return rightStart;
  }
}
