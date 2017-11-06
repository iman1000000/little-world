const DIAGONAL = Math.sqrt(2) * 0.5;
const TAU = Math.PI * 2;
window.circle = 'circle';
window.square = 'square';

class GameState {
    constructor() {
        this._fps = false;
    }
    preload() {
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.scale.pageAlignHorizontally = true;
        window.game.makeImage('default', 'white', 32, 32);

        // right click breaks things
        window.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
    }

    create() {
        // game.input.keyboard.addKeyCapture([Phaser.Keyboard.DOWN, Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.ENTER, Phaser.Keyboard.SPACE]);
        game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    render() {
        if (this._fps) {
            game.debug.text(game.time.fps + 'fps', 2, 14);
        }
    }

    set fps(val) {
        window.game.time.advancedTiming = val;
        this._fps = val;
    }

    get fps() {
        return this._fps;
    }
}

class Game extends Phaser.Game {
    constructor(width, height, gameState, debug = true) {
        super({
            width: width,
            height: height,
            renderer: Phaser.CANVAS,
            antialias: false,
            enableDebug: debug,
            scaleMode: Phaser.ScaleManager.SHOW_ALL,
            state: gameState
        });

        if (window.game) {
            window.game.destroy();
        }
        window.game = this;

    }

    makeImage(key, color, width = 32, height = 32) {
        let img = document.createElement('canvas');
        img.width = width;
        img.height = height;
        let ctx = img.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
        this.load.image(key, img.toDataURL());
    }
}

class Sprite extends Phaser.Sprite {
    constructor(x = 16, y = 16, image = 'default') {
        super(window.game, x, y, image);

        this.smoothed = false;

        window.game.add.existing(this);
        window.game.physics.enable(this, Phaser.Physics.ARCADE);
    }

    overlap(that, callback) {
        window.game.physics.arcade.overlap(this, that, undefined, (a, b) => {
            callback(b);
        }, this);
    }

    collide(that) {
        window.game.physics.arcade.collide(this, that);
    }

    wallClamp() {
        if (this.top <= 0) {
            this.top = 0;
            if (this.dy < 0) {
                this.dy = 0;
            }
        }
        if (this.bottom >= window.game.world.height) {
            this.bottom = window.game.world.height;
            if (this.dy > 0) {
                this.dy = 0;
            }
        }
        if (this.left < 0) {
            this.left = 0;
            if (this.dx < 0) {
                this.dx = 0;
            }
        }
        if (this.right >= window.game.world.width) {
            this.right = window.game.world.width;
            if (this.dx > 0) {
                this.dx = 0;
            }
        }
    }

    arrowMove(speed) {
        var up = window.game.input.keyboard.isDown(Phaser.Keyboard.UP);
        var down = window.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
        var left = window.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        var right = window.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

        this.dy = 0;
        this.dx = 0;

        // Cardinal
        if ( (up && !down && !left && !right) ||
             (up && !down && left && right) ) {
            this.dy = -speed;
         }
        if ( (!up && down && !left && !right) ||
             (!up && down && left && right) ) {
            this.dy = speed;
         }
        if ( (!up && !down && left && !right) ||
             (up && down && left && !right) ) {
            this.dx = -speed;
         }
        if ( (!up && !down && !left && right) ||
             (up && down && !left && right) ) {
            this.dx = speed;
         }

        // Diagonal
        if (up && !down && !left && right) {
            this.dy = -speed * DIAGONAL;
            this.dx = speed * DIAGONAL;
         }
        if (up && !down && left && !right) {
            this.dy = -speed * DIAGONAL;
            this.dx = -speed * DIAGONAL;
         }
        if (!up && down && !left && right) {
            this.dy = speed * DIAGONAL;
            this.dx = speed * DIAGONAL;
         }
        if (!up && down && left && !right) {
            this.dy = speed * DIAGONAL;
            this.dx = -speed * DIAGONAL;
        }
    }

    joyconMove(speed, pad) {
        if (pad) {
            this.dx = pad.axisX * speed;
            this.dy = pad.axisY * speed;
        } else {
            this.dx = joycon.leftAxisX * speed;
            this.dy = joycon.leftAxisY * speed;
        }
    }

    joyconAcc(acc, pad) {
        if (pad) {
            this.body.acceleration.x = pad.axisX * acc;
            this.body.acceleration.y = pad.axisY * acc;
        } else {
            this.body.acceleration.x = joycon.leftAxisX * acc;
            this.body.acceleration.y = joycon.leftAxisY * acc;
        }
    }

    set wallBounce(wb) {
        if (wb) {
            this.body.collideWorldBounds = true;
            this.body.worldBounce = new Phaser.Point(1, 1);
        } else {
            this.body.collideWorldBounds = false;
        }
    }

    get wallBounce() {
        return this.body.collideWorldBounds;
    }

    set dx(val) {
        this.body.velocity.x = val;
    }

    get dx() {
        return this.body.velocity.x;
    }

    set dy(val) {
        this.body.velocity.y = val;
    }

    get dy() {
        return this.body.velocity.y;
    }

    set vel(val) {
        this.dx = val[0];
        this.dy = val[1];
    }

    get vel() {
        return [this.dx, this,dy];
    }

    set pos(val) {
        this.x = val[0];
        this.y = val[1];
    }

    get pos() {
        return [this.x, this.y];
    }
}
