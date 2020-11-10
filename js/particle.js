let red = 255;
let green = 0;
let blue = 0;
let alpha = 0;
let blasterArray = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 35;
    this.weight = -50;
    this.directionX = 1;
  }

  update() {
    let osc = Math.sin(angle) * 50;
    colors();
    if (this.y < 0) {
      this.y = rocket.y - 10;
      this.weight = -25;
    }
    this.x = rocket.x + 50 + osc;
    this.weight -= 0.01;
    this.y += this.weight;
    this.draw();
  }
  draw() {
    // ctx.fillStyle = `rgba(${red}, ${green}, ${blue})`;
    var gradient = ctx.createLinearGradient(this.x - 30, 0, 400, 400);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1 / 6, `rgba(${red}, ${green}, ${blue})`);
    gradient.addColorStop(2 / 6, "yellow");
    gradient.addColorStop(3 / 6, "green");
    gradient.addColorStop(4 / 6, "blue");
    gradient.addColorStop(5 / 6, "indigo");
    gradient.addColorStop(1, `rgba(${red}, ${green}, ${blue})`);
    ctx.fillStyle = gradient;
    // ctx.fillStyle = `red`;
    ctx.beginPath();
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = `white`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function handleBlaster() {
  if (blast) {
    if (frame % 2 === 0) {
      blasterArray.push(new Particle(350, rocket.y - 20));
    }
    for (let i = 0; i < blasterArray.length; i++) {
      blasterArray[i].update();
    }
    if (blasterArray.length > 50) blasterArray.pop();
  } else {
    for (let i = 0; i < blasterArray.length; i++) {
      blasterArray.pop();
    }
  }
}

function colors() {
  green = Math.cos(angle * 0.9) * 255;
  blue = Math.sin(angle * 0.3) * 255;
}
