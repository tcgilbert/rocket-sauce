//image declarations
const wizardRocket = new Image();
const fuego1 = new Image();
fuego1.src = "img/fire.png";
wizardRocket.src = "img/wizard.png";
//variables
let lrVelocity = 0.1;
let blasterTimer = 400;
let upperLimit = 450;
let boostSpeed = 2;
let oscMult = 20;

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
    // restoreVars();
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

    if (upPressed) this.boost();
    if (leftPressed) this.moveLeft();
    if (rightPressed) this.moveRight();

    if (!leftPressed && this.vxl < 0) {
      this.vxl += 2;
      if (this.vxl > 0) this.vxl = 0;
    }
    if (!rightPressed && this.vxr > 0) {
      this.vxr -= 2;
      if (this.vxr < 0) this.vxr = 0;
    }
    if (!upPressed && bgScroll > 15) {
      lrVelocity = 0.2;
      if (bgScroll > 75) {
        bgScroll--;
      } else if (bgScroll > 50) {
        bgScroll -= 0.5;
      } else {
        bgScroll -= 0.25;
      }
      if (bgScroll < 15) return;
      // console.log(`scroll rate: ${bgScroll}`);
    }
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
        blasterTimer = 400;
        upperLimit = 450;
        boostSpeed = 2;
        oscMult = 20;
      }
    }

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
      if (upPressed)
        ctx.drawImage(
          fuego1,
          this.x + 35,
          this.y + 136,
          this.fireWidth,
          this.fireHeight
        );
    } else if (!blink) {
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
      if (upPressed)
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
    if (bgScroll < 100) {
      bgScroll++;
    }
    lrVelocity = 1;
    elevation++;
    if (!spacePressed) fuel--;
    this.vy -= boostSpeed;
    // console.log(`scroll rate: ${bgScroll}`);
  }

  moveLeft() {
    this.vxr = 0;
    this.vxl -= lrVelocity;
    this.x += this.vxl;
  }
  moveRight() {
    this.vxl = 0;
    this.vxr += lrVelocity;
    this.x += this.vxr;
  }
  blaster() {
    if (spacePressed) {
      if (blasterTimer > 100) {
        upperLimit = 250;
      }
      else if (upperLimit != 450) upperLimit += 2;
      if (blasterTimer > 100) {
        oscMult = 70;
      } else if (oscMult != 20) oscMult--;
      

      boostSpeed = 5;
      
      console.log(blasterTimer);
      ctx.fillStyle = "cyan";
      ctx.fillRect(
        this.x - 30,
        this.y - 400,
        this.blastWidth,
        this.blastHeight
      );
      blasterHitDetection(asteroidArray);
      blasterHitDetection(bigAsteroidArray);
    }
  }
}

const rocket = new Rocket();

function blasterHitDetection(array) {
  for (let i = 0; i < array.length; i++) {
    if (
      array[i].x < rocket.x - 30 + rocket.blastWidth &&
      array[i].x + array[i].width > rocket.x - 30 &&
      array[i].y < rocket.y - 400 + rocket.blastHeight&&
      array[i].y + array[i].width > rocket.y - 400
    ) {
      array.splice(i, 1);
      console.log("blast hit!");
      return true;
    }
  }
}

function restoreVars() {
  if (upperLimit != 450 & spacePressed == false) upperLimit+= 2;
}