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
      ctx.drawImage(fuelTank, this.x - 18, this.y -20, this.width * 1.7, this.width * 1.7)
      
    }
    update() {
      //speed of asteroid effected by boost rate
      this.y += 6;
      // this.randVel();
      this.draw();
    }
  }


function handleFuel() {
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

