
class Rocket {
    constructor() {
        this.x = 330;
        this.y = 880;
        this.vy = 0;
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
            this.y += this.vy;
        }
        //check canvas left
        if (this.x < 0) {
            this.x = 0;
        }

        if (upPressed) this.boost();
        if (leftPressed) this.moveLeft();
        if (rightPressed) this.moveRight();

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
        this.x -= 10;
    }
    moveRight() {
        console.log('right called');
        this.x += 10;
    }
 
}

const rocket = new Rocket();
