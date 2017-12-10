const SAVE_VERSION = 1;

const WIDTH = 512;
const HEIGHT = 768;

const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;
const TILE_SIZE = 32;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

// In milliseconds
const TIMER_INTERVAL = 10000;

let DEBUG = false;
if (location.host == 'localhost:8080') {
    DEBUG = true;
}

function tile(x) {
    return (Math.round(x/TILE_SIZE));
}

let gameData = window.gameData = {};
let gridObjects = [];

let targetSprite;

class InitialState extends GameState {
    preload() {
        super.preload();

        window.game.makeImage('placeholder', 'red');

        window.game.load.image('abtn', 'images/button64a.png');
        window.game.load.image('bbtn', 'images/button64b.png');
        window.game.load.image('analog', 'images/button128.png');
        window.game.load.image('target', 'images/target.png');
        window.game.load.spritesheet('number', 'images/numbers.png', 32, 32);
        window.game.makeImage('empty', 'rgba(0,0,0,0)');
        window.game.makeImage('grass', 'green');
    }

    create() {
        super.create();
        this.fps = true;

        // load data if possible
        if (localStorage.getItem('little-world-data')) {
            this.loadSave();
        } else {
            this.newSave();
        }

        // create GridObjects
        for (let x = 0; x < MAP_HEIGHT; x++) {
            gridObjects.push([]);
            for (let y = 0; y < MAP_WIDTH; y++) {
                gridObjects[x].push(new GridObject(x, y));
            }
        }

        // begin autosaving and ticking
        setInterval(() => {
            this.tickCatchUp();
            // autosave
            localStorage.setItem('little-world-data', JSON.stringify(gameData));
        }, 1000);

        new Player();
        targetSprite = new Sprite(0, 0, 'target');
    }

    tick(currentTime) {
        gameData.time = currentTime;
        for (let column of gridObjects) {
            for (let go of column) {
                go.methods.tick(go);
            }
        }
    }

    tickCatchUp() {
        while(gameData.time < Date.now() - TIMER_INTERVAL) {
            this.tick(gameData.time + TIMER_INTERVAL);
        }
    }

    loadSave() {
        let saveData = localStorage.getItem('little-world-data');
        gameData = JSON.parse(saveData);
        this.updateSave();
        this.tickCatchUp();
    }

    updateSave(saveData) {
        if (!gameData.version) {
            gameData.version = 0;
        }
        // Yes, this is one of the rare cases where switch fallthrough is used
        switch (gameData.version) {
            case 0:
                gameData.time = date.Now();
        }
        gameData.version = SAVE_VERSION;
        return;
    }

    newSave() {
        // initialize the grid data
        gameData.grid = [];
        for (let x = 0; x < MAP_HEIGHT; x++) {
            gameData.grid.push([]);
            for (let y = 0; y < MAP_WIDTH; y++) {
                gameData.grid[x].push({type: 'empty', x:x, y:y});
            }
        }

        gameData.time = Date.now();

        gameData.version = SAVE_VERSION;
    }
}

class Player extends Sprite {
    constructor() {
        super(64, 64);

        this.body.drag = 1200;
        this.body.maxVelocity = 400;
        this.touchPad = new TouchPad(96, 768-128, 512-96, 768-128, 512 - 2*96, 768 - 128);
        if (DEBUG) {
            this.touchPad = joycon;
        }

        this.facing = UP;
    }

    update() {
        // TODO Document TouchPad and deal with textures
        // TODO make movement Dpad
        this.joyconAcc(2300, this.touchPad);
        this.wallClamp();

        this.updateFacing();
        this.updateTarget();

        // clamp within bounds
        if (this.bottom > MAP_HEIGHT * TILE_SIZE) {
            this.bottom = MAP_HEIGHT * TILE_SIZE;
            if (this.dy > 0) {
                this.dy = 0;
            }
        }

        for (let column of gridObjects) {
            this.collide(column, (_, that) => {
                // only collide with solid objects
                return that.methods.solid;
            });
        }

        this.updateButtons();
    }

    updateTarget() {
        let x = tile(this.x);
        let y = tile(this.y);
        switch (this.facing) {
            case UP:
                y = tile(this.y - 1.5 * TILE_SIZE);
                break;
            case DOWN:
                y = tile(this.y + 1.5 * TILE_SIZE);
                break;
            case LEFT:
                x = tile(this.x - 1.5 * TILE_SIZE);
                break;
            case RIGHT:
                x = tile(this.x + 1.5 * TILE_SIZE);
                break;
        }
        this.target = [x, y];
        targetSprite.x = x * TILE_SIZE;
        targetSprite.y = y * TILE_SIZE;

        if (y >= MAP_HEIGHT) {
            targetSprite.y = -TILE_SIZE;
        }
    }

    updateFacing() {
        if (this.body.acceleration.y < 0 && -this.body.acceleration.y > Math.abs(this.body.acceleration.x)) {
            this.facing = UP;
        }

        if (this.body.acceleration.y > 0 && this.body.acceleration.y > Math.abs(this.body.acceleration.x)) {
            this.facing = DOWN;
        }

        if (this.body.acceleration.x < 0 && -this.body.acceleration.x > Math.abs(this.body.acceleration.y)) {
            this.facing = LEFT;
        }

        if (this.body.acceleration.x > 0 && this.body.acceleration.x > Math.abs(this.body.acceleration.y)) {
            this.facing = RIGHT;
        }
    }

    updateButtons() {
        // TODO put a system for doing this in the library

        // interact when A is just pressed
        if (!this.aDown && this.touchPad.a) {
            this.interact();
        }
        this.aDown = this.touchPad.a;

        // remove when B is just pressed
        if (!this.bDown && this.touchPad.b) {
            this.remove();
        }
        this.bDown = this.touchPad.b;
    }

    interact() {
        if (this.target[0] < MAP_WIDTH && this.target[1] < MAP_HEIGHT &&
                this.target[0] >= 0 && this.target[1] >= 0) {
            let go = gridObjects[this.target[0]][this.target[1]];
            methods[go.state.type].interact(go);
        }
    }

    remove() {
        if (this.target[0] < MAP_WIDTH && this.target[1] < MAP_HEIGHT &&
                this.target[0] >= 0 && this.target[1] >= 0) {
            let go = gridObjects[this.target[0]][this.target[1]];
            methods[go.state.type].remove(go);
        }
    }
}

class GridObject extends Sprite {
    constructor(gridX, gridY) {
        super(gridX * TILE_SIZE, gridY * TILE_SIZE, 'empty');
        this.gridX = gridX;
        this.gridY = gridY;

        this.body.immovable = true;

        this.init();
        this._type = this.state.type;

        // TODO just pressed wrappers
        this.aDown = false;
    }

    get state() {
        return gameData.grid[this.gridX][this.gridY];
    }

    set state(d) {
        gameData.grid[this.gridX][this.gridY] = d;
    }

    get methods() {
        return methods[this.state.type];
    }

    init() {
        methods[this.state.type].init(this);
    }

    update() {
        // re-init when type is changed
        if (this.state.type != this._type) {
            this._type = this.state.type;
            this.init();
        }
    }
}

let game = new Game(WIDTH, HEIGHT);
game.state.add('initial', InitialState);
game.state.start('initial');
