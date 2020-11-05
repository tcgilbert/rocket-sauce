//image declarations
const wizardRocket = new Image();
const fuego1 = new Image();
fuego1.src = "img/fire.png";
wizardRocket.src = "img/wizard.png";
//variables
let lrVelocity = 0.1;

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
    this.weight = 1;
  }
  update() {
    angle += 0.06;
    let osc = Math.sin(angle) * 20;
    //check canvas top
    if (this.y < 450 + this.height + osc) {
      this.y = 450 + this.height + osc;
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
    fuel--;
    this.vy -= 2;
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
}

const rocket = new Rocket();
