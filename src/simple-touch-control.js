class TouchControl extends Sprite {
    constructor(x, y, radius, key) {
        super(x, y, key);
        this.radius = radius;
        this.activeRadius = radius * 1.5;
        this.anchor.setTo(0.5, 0.5);
    }

    get pressed() {
        let pointers = this.game.input.pointers;
        for (let i = 0; i < pointers.length; i++) {
            let pointer = pointers[i];
            let distance = game.input.getLocalPosition(this, pointer).getMagnitude();
            if (distance < this.activeRadius && pointer.isDown) {
                return true;
            }
        }
        return false;
    }

    get axisX() {
        let pointers = this.game.input.pointers;
        for (let i = 0; i < pointers.length; i++) {
            let pointer = pointers[i];
            let relativeX = game.input.getLocalPosition(this, pointer).x;
            let distance = game.input.getLocalPosition(this, pointer).getMagnitude();
            if (distance < this.activeRadius && pointer.isDown) {
                if (relativeX > this.radius) {
                    return 1;
                } else if (relativeX < -this.radius) {
                    return -1;
                }
                return relativeX / this.radius;
            }
        }
        return 0;
    }

    get axisY() {
        let pointers = this.game.input.pointers;
        for (let i = 0; i < pointers.length; i++) {
            let pointer = pointers[i];
            let relativeY = game.input.getLocalPosition(this, pointer).y;
            let distance = game.input.getLocalPosition(this, pointer).getMagnitude();
            if (distance < this.activeRadius && pointer.isDown) {
                if (relativeY > this.radius) {
                    return 1;
                } else if (relativeY < -this.radius) {
                    return -1;
                }
                return relativeY / this.radius;
            }
        }
        return 0;
    }
}

class TouchPad extends Phaser.Group{
    constructor(analogX = 86, analogY = 320-86, aX = 500, aY = 320-86) {
        super(window.game);
        this.analog = new TouchControl(analogX, analogY, 64, 'analog');
        this.aBtn = new TouchControl(aX, aY, 32, 'abtn');

        this.add(this.analog);
        this.add(this.aBtn);
    }

    get a() {
        return this.aBtn.pressed;
    }

    get axisX() {
        return this.analog.axisX;
    }
    
    get axisY() {
        return this.analog.axisY;
    }
}
