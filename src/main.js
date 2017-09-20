const WIDTH = 640;
const HEIGHT = 480;

class InitialState extends GameState {
    preload() {
        super.preload();
    }

    create() {
        super.create();
        // this.fps = true;

        new Player();
    }
}

class Player extends Sprite {
    constructor() {
        super(WIDTH/2, HEIGHT/2);
    }

    update() {
        this.joyconMove(200);
    }
}

let game = new Game(WIDTH, HEIGHT);
game.state.add('initial', InitialState);
game.state.start('initial');
