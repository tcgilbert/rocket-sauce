const asteroidArray = [];
let asteroidRate = 350; //change this in the handleAsteroids function
class Asteroid {
    constructor() {
        this.x = randomStartPos();
        this.y = -20;
        this.vy = 0;
        this.vxr = 0;
        this.vxl = 0;
        this.r = 40;
        
    }
    draw() {
        ctx.fillStyle = "chartreuse";
        ctx.fillRect(this.x, this.y, 30, 30);
    }

    // randVel() {
    //     this.x += 1;
    // }

    update() {
        this.y += (1 + (bgScroll * .1));
        // this.randVel();
        this.draw();
    }
}

function handleAsteroids() {
    if (frame % 350 === 0) {
        asteroidArray.unshift(new Asteroid);
    }
    for (let i = 0; i < asteroidArray.length; i++) {
        asteroidArray[i].update();
    }
    if (asteroidArray.length > 5) {
        asteroidArray.pop(asteroidArray[0]);
    }
    console.log(asteroidArray.length);
}

function randomStartPos() {
    let ranNum = Math.random();
    if (ranNum < .5) {
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

