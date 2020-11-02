const wizardRocket = new Image();
wizardRocket.src = 'img/editable-wizard.png';

class Rocket {
    constructor() {
        this.x = 275;
        this.y = 620;
        this.vy = 0;
        this.vxr = 0;
        this.vxl = 0;
        this.width = 100;
        this.height = 100;
        this.wizWidth = this.width + 50;
        this.wizHeight = this.height + 50;
        this.weight = 1;
    }
    update() {
        angle += .06;
        let osc = Math.sin(angle) * 20;
        //check canvas top
        if (this.y < 400 + this.height + osc) {
            this.y = 400 + this.height + osc;
            this.vy = 0;
        }
        //check canvas BOTTOM, and gravity
        if (this.y > canvas.height - (this.height + 50)) {
            this.y = canvas.height - (this.height + 50);
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= .5;
            this.y += this.vy;
        }
        //check canvas left
        if (this.x < 20) {
            this.x = 20;
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
        if (!upPressed && bgScroll > 15) {
            if (bgScroll > 75) {
                bgScroll--
            } else if (bgScroll > 50) {
                bgScroll -= .5;
            } else {
                bgScroll -= .25;
            }
            // console.log(`scroll rate: ${bgScroll}`);
        }

    }

    draw() {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(wizardRocket, this.x - 35, this.y - 20, this.wizWidth, this.wizHeight);
    }

    boost() {
        if(bgScroll < 100) {
            bgScroll++;
        }
        this.vy -= 2;
        // console.log(`scroll rate: ${bgScroll}`);
    }

    moveLeft() {
        this.vxr = 0;
        this.vxl -= 1;
        this.x += this.vxl;
    }
    moveRight() {
        this.vxl = 0;
        this.vxr += 1
        this.x += this.vxr;
    }
 
}

const rocket = new Rocket();
