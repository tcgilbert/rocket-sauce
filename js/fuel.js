const fuelArray = [];
let fuelRate = 200;
const fuelTank = new Image();
fuelTank.src = "img/fuel.png";

class Fuel {
  constructor() {
    this.x = randomStartPos();
    this.y = -20;
    this.width = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.width);
    ctx.save();
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.drawImage(
      fuelTank,
      this.x - 18,
      this.y - 20,
      this.width * 1.7,
      this.width * 1.7
    );
    ctx.restore();
  }
  update() {
    if (fuelCollected) fuelTimer--;
    if (fuelTimer === 0) {
      fuelTimer = 30;
      fuelCollected = false;
    }
    //speed of asteroid effected by boost rate
    this.y += 6;
    // this.randVel();
    this.draw();
  }
}

function handleFuel() {
  if (!gameStarted) {
    for (let i = 0; i < fuelArray.length; i++) {
      fuelArray.pop();
    }
  }
  if (elevation > 210) {
    if (frame % fuelRate === 0) {
      fuelArray.unshift(new Fuel());
    }
    for (let i = 0; i < fuelArray.length; i++) {
      fuelArray[i].update();
    }
    if (fuelArray.length > 5) {
      fuelArray.pop(fuelArray[0]);
    }
  }
}
