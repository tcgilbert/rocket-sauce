
class Rocket {
    constructor() {
        this.x = 330;
        this.y = 880;
        this.vy = 0;
        this.vxr = 0;
        this.vxl = 0;
        this.width = 20;
        this.height = 20;
        this.weight = 1;
    }
    update() {
        //check canvas TOP
        if (this.y < 0 + this.height) {
            this.y = 0 + this.height;
            this.vy = 0;
        }
        //check canvas BOTTOM, and gravity
        if (this.y > canvas.height - (this.height * 3)) {
            this.y = canvas.height - (this.height * 3);
            this.vy = 0;
        } else {
            this.vy += this.weight;
            // this.vy *= .5;
            this.y += this.vy;
        }
        //check canvas left
        if (this.x < 0) {
            this.x = 0;
            this.vxl = 0;
        } else {
            this.x += (this.vxl * .5);
        }
        //check canvas right
        if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
            this.vxr = 0;
        } else {
            this.x += (this.vxr * .5);
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

    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    boost() {
        console.log('boost called');
        this.vy -= 2;
    }

    moveLeft() {
        console.log('left called');
        this.vxr = 0;
        this.vxl -= 1;
        this.x += this.vxl;
    }
    moveRight() {
        console.log('right called');
        this.vxl = 0;
        this.vxr += 1
        this.x += this.vxr;
    }
 
}

const rocket = new Rocket();
