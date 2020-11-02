class Asteroid {
    constructor() {
        this.x = 350;
        this.y = 400;
        this.vy = 0;
        this.vxr = 0;
        this.vxl = 0;
        this.r = 40;
        
    }
    update() {

    }

    draw() {
        ctx.strokeStyle = "chartreuse";
        ctx.arc(this.x, this.y, this.r, 0, (2 * Math.PI));
        ctx.stroke();
    }
}

const firstAsteroid = new Asteroid;