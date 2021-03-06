//image declarations
const wizardRocket = new Image();
const fuego1 = new Image();
const blast1 = new Image();
blast1.src = "img/wave1.png";
fuego1.src = "img/fire.png";
wizardRocket.src = "img/wizard.png";
//variables
let lrVelocity = 0.1;
let blasterTimer = 400;
let upperLimit = 400;
let boostSpeed = 2;
let oscMult = 20;
let scrollLimit = 100;
let scrollAdder = 1;

class Rocket {
  constructor() {
    this.x = 410;
    this.y = 620;
    this.vy = 0;
    this.vxr = 0;
    this.vxl = 0;
    this.width = 120;
    this.height = 120;
    this.fireWidth = this.width - 20;
    this.fireHeight = this.height - 40;
    this.blastWidth = 200;
    this.blastHeight = 500;
    this.weight = 1;
  }
  update() {
    this.blaster();
    angle += 0.06;
    let osc = Math.sin(angle) * oscMult;
    //check canvas top
    if (this.y < upperLimit + this.height + osc) {
      this.y = upperLimit + this.height + osc;
      this.vy = 0;
    }
    //check canvas BOTTOM, and gravity
    if (this.y > canvas.height - (this.height + 50)) {
      this.y = canvas.height - (this.height + 50);
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.5;
      this.y += this.vy;
    }
    //check canvas left
    if (this.x < 20) {
      this.x = 20;
      this.vxl = 0;
    } else {
      this.x += this.vxl * 0.5;
    }
    //check canvas right
    if (this.x > canvas.width - this.width) {
      this.x = canvas.width - this.width;
      this.vxr = 0;
    } else {
      this.x += this.vxr * 0.5;
    }
    //left and right movement
    if (!leftPressed && this.vxl < 0) {
      this.vxl += 2;
      if (this.vxl > 0) this.vxl = 0;
    }
    if (!rightPressed && this.vxr > 0) {
      this.vxr -= 2;
      if (this.vxr < 0) this.vxr = 0;
    }
    //limits left and right movement when not boosting
    if (!upPressed && bgScroll > 15) {
      this.weight = 3;
      lrVelocity = 0.1;
      if (bgScroll > 75) {
        bgScroll--;
      } else if (bgScroll > 50) {
        bgScroll -= 0.5;
      } else {
        bgScroll -= 0.25;
      }
      if (bgScroll < 15) return;
    }

    if (upPressed) {
      this.weight = 1;
      this.boost();
    }
    if (leftPressed) this.moveLeft();
    if (rightPressed) this.moveRight();
  }

  draw() {
    if (!collision) {
      ctx.fillStyle = "red";
      //   ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = "white";
      ctx.drawImage(
        wizardRocket,
        this.x - 35,
        this.y - 20,
        this.width + 50,
        this.height + 50
      );
      ctx.restore();
      if (upPressed && !gameOver)
        if (spacePressed) {
          ctx.save();
          ctx.shadowBlur = 8;
          ctx.shadowColor = "red";
          ctx.drawImage(
            fuego1,
            this.x + 35,
            this.y + 136,
            this.fireWidth,
            this.fireHeight
          );
          ctx.restore();
        } else {
          ctx.save();
          ctx.shadowBlur = 8;
          ctx.shadowColor = "red";
          ctx.drawImage(
            fuego1,
            this.x + 35,
            this.y + 136,
            this.fireWidth,
            this.fireHeight
          );
          ctx.restore();
        }
    } else if (!blink) {
      ctx.fillStyle = "red";
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = "white";
      ctx.drawImage(
        wizardRocket,
        this.x - 35,
        this.y - 20,
        this.width + 50,
        this.height + 50
      );
      ctx.restore();
      if (upPressed && !gameOver)
        ctx.drawImage(
          fuego1,
          this.x + 35,
          this.y + 136,
          this.fireWidth,
          this.fireHeight
        );
    }
  }

  boost() {
    if (!gameOver) {
      gameStarted = true;
      if (bgScroll < scrollLimit) {
        bgScroll += scrollAdder;
      }
      lrVelocity = 1;
      elevation++;
      score = score + (1 + scoreAdder);
      if (!spacePressed) fuel--;
      this.vy -= boostSpeed;
    }
  }

  moveLeft() {
    this.vxr = 0;
    this.vxl -= lrVelocity;
    this.x += this.vxl;
    if (!upPressed && !spacePressed) fuel -= 0.2;
  }
  moveRight() {
    this.vxl = 0;
    this.vxr += lrVelocity;
    this.x += this.vxr;
    if (!upPressed && !spacePressed) fuel -= 0.2;
  }
  blaster() {
    if (spacePressed) {
      blast = true;
      if (blasterTimer > 100) {
        scoreAdder = 5;
      } else if (scrollLimit != 100) {
        bgScroll -= 5;
        scrollLimit -= 5;
      }
      blasterHitDetection(asteroidArray);
      blasterHitDetection2(bigAsteroidArray);
    }
  }
}

const rocket = new Rocket();
function blasterHitDetection(array) {
  for (let i = 0; i < array.length; i++) {
    if (
      array[i].x < rocket.x - 30 + rocket.blastWidth &&
      array[i].x + array[i].width > rocket.x - 30 &&
      array[i].y < rocket.y - 400 + rocket.blastHeight &&
      array[i].y + array[i].width > rocket.y - 400 &&
      !array[i].blasted
    ) {
      score += 500;
      array[i].blasted = true;
      return true;
    }
  }
}

function blasterHitDetection2(array) {
  for (let i = 0; i < array.length; i++) {
    if (
      array[i].x < rocket.x - 30 + rocket.blastWidth &&
      array[i].x + array[i].width > rocket.x - 30 &&
      array[i].y < rocket.y - 400 + rocket.blastHeight &&
      array[i].y + array[i].width > rocket.y - 400 &&
      !array[i].blasted
    ) {
      score += 1000;
      array[i].blasted = true;
      return true;
    }
  }
}


function updateParameters() {
  
  if (collision) {
    timer--;
  }
  if (timer % 15 == 0) {
    if (blink) {
      blink = false;
    } else {
      blink = true;
    }
  }
  if (timer === 0) {
    timer = 140;
    collision = false;
  }
  if (spacePressed) {
    blasterTimer--;
    if (blasterTimer === 0) {
      spacePressed = false;
      blast = false;
      blasterTimer = 400;
      scrollLimit = 100;
      bgScroll = 99;
      boostSpeed = 2;
      scrollAdder = 1;
      scoreAdder = 0;
    }
  }
}
