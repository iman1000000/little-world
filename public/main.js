'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SAVE_VERSION = 1;

var WIDTH = 512;
var HEIGHT = 768;

var MAP_WIDTH = 16;
var MAP_HEIGHT = 16;
var TILE_SIZE = 32;

var UP = 0;
var RIGHT = 1;
var DOWN = 2;
var LEFT = 3;

// In milliseconds
var TIMER_INTERVAL = 10000;

var DEBUG = false;
if (location.host == 'localhost:8080') {
    DEBUG = true;
}

function tile(x) {
    return Math.round(x / TILE_SIZE);
}

var gameData = window.gameData = {};
var gridObjects = [];

var targetSprite = void 0;

var InitialState = function (_GameState) {
    _inherits(InitialState, _GameState);

    function InitialState() {
        _classCallCheck(this, InitialState);

        return _possibleConstructorReturn(this, (InitialState.__proto__ || Object.getPrototypeOf(InitialState)).apply(this, arguments));
    }

    _createClass(InitialState, [{
        key: 'preload',
        value: function preload() {
            _get(InitialState.prototype.__proto__ || Object.getPrototypeOf(InitialState.prototype), 'preload', this).call(this);

            window.game.makeImage('placeholder', 'red');

            window.game.load.image('abtn', 'images/button64a.png');
            window.game.load.image('bbtn', 'images/button64b.png');
            window.game.load.image('analog', 'images/button128.png');
            window.game.load.image('target', 'images/target.png');
            window.game.load.spritesheet('number', 'images/numbers.png', 32, 32);
            window.game.makeImage('empty', 'rgba(0,0,0,0)');
            window.game.makeImage('grass', 'green');
        }
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            _get(InitialState.prototype.__proto__ || Object.getPrototypeOf(InitialState.prototype), 'create', this).call(this);
            this.fps = true;

            // load data if possible
            if (localStorage.getItem('little-world-data')) {
                this.loadSave();
            } else {
                this.newSave();
            }

            // create GridObjects
            for (var x = 0; x < MAP_HEIGHT; x++) {
                gridObjects.push([]);
                for (var y = 0; y < MAP_WIDTH; y++) {
                    gridObjects[x].push(new GridObject(x, y));
                }
            }

            // begin autosaving and ticking
            setInterval(function () {
                // tick
                if (Date.now() >= gameData.time + TIMER_INTERVAL) {
                    _this2.tick(Date.now());
                }
                // autosave
                localStorage.setItem('little-world-data', JSON.stringify(gameData));
            }, 1000);

            new Player();
            targetSprite = new Sprite(0, 0, 'target');
        }
    }, {
        key: 'tick',
        value: function tick(currentTime) {
            gameData.time = currentTime;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = gridObjects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var column = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = column[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var go = _step2.value;

                            go.methods.tick(go);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'tickCatchUp',
        value: function tickCatchUp() {
            while (gameData.time < Date.now() - TIMER_INTERVAL) {
                this.tick(gameData.time + TIMER_INTERVAL);
            }
        }
    }, {
        key: 'loadSave',
        value: function loadSave() {
            var saveData = localStorage.getItem('little-world-data');
            gameData = JSON.parse(saveData);
            this.updateSave();
            this.tickCatchUp();
        }
    }, {
        key: 'updateSave',
        value: function updateSave(saveData) {
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
    }, {
        key: 'newSave',
        value: function newSave() {
            // initialize the grid data
            gameData.grid = [];
            for (var x = 0; x < MAP_HEIGHT; x++) {
                gameData.grid.push([]);
                for (var y = 0; y < MAP_WIDTH; y++) {
                    gameData.grid[x].push({ type: 'empty', x: x, y: y });
                }
            }

            gameData.time = Date.now();

            gameData.version = SAVE_VERSION;
        }
    }]);

    return InitialState;
}(GameState);

var Player = function (_Sprite) {
    _inherits(Player, _Sprite);

    function Player() {
        _classCallCheck(this, Player);

        var _this3 = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, 64, 64));

        _this3.body.drag = 1200;
        _this3.body.maxVelocity = 400;
        _this3.touchPad = new TouchPad(96, 768 - 128, 512 - 96, 768 - 128, 512 - 2 * 96, 768 - 128);
        if (DEBUG) {
            _this3.touchPad = joycon;
        }

        _this3.facing = UP;
        return _this3;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update() {
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

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = gridObjects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var column = _step3.value;

                    this.collide(column, function (_, that) {
                        // only collide with solid objects
                        return that.methods.solid;
                    });
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.updateButtons();
        }
    }, {
        key: 'updateTarget',
        value: function updateTarget() {
            var x = tile(this.x);
            var y = tile(this.y);
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
    }, {
        key: 'updateFacing',
        value: function updateFacing() {
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
    }, {
        key: 'updateButtons',
        value: function updateButtons() {
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
    }, {
        key: 'interact',
        value: function interact() {
            if (this.target[0] < MAP_WIDTH && this.target[1] < MAP_HEIGHT && this.target[0] >= 0 && this.target[1] >= 0) {
                var go = gridObjects[this.target[0]][this.target[1]];
                methods[go.state.type].interact(go);
            }
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (this.target[0] < MAP_WIDTH && this.target[1] < MAP_HEIGHT && this.target[0] >= 0 && this.target[1] >= 0) {
                var go = gridObjects[this.target[0]][this.target[1]];
                methods[go.state.type].remove(go);
            }
        }
    }]);

    return Player;
}(Sprite);

var GridObject = function (_Sprite2) {
    _inherits(GridObject, _Sprite2);

    function GridObject(gridX, gridY) {
        _classCallCheck(this, GridObject);

        var _this4 = _possibleConstructorReturn(this, (GridObject.__proto__ || Object.getPrototypeOf(GridObject)).call(this, gridX * TILE_SIZE, gridY * TILE_SIZE, 'empty'));

        _this4.gridX = gridX;
        _this4.gridY = gridY;

        _this4.body.immovable = true;

        _this4.init();
        _this4._type = _this4.state.type;

        // TODO just pressed wrappers
        _this4.aDown = false;
        return _this4;
    }

    _createClass(GridObject, [{
        key: 'init',
        value: function init() {
            methods[this.state.type].init(this);
        }
    }, {
        key: 'update',
        value: function update() {
            // re-init when type is changed
            if (this.state.type != this._type) {
                this._type = this.state.type;
                this.init();
            }
        }
    }, {
        key: 'state',
        get: function get() {
            return gameData.grid[this.gridX][this.gridY];
        },
        set: function set(d) {
            gameData.grid[this.gridX][this.gridY] = d;
        }
    }, {
        key: 'methods',
        get: function get() {
            return methods[this.state.type];
        }
    }]);

    return GridObject;
}(Sprite);

var game = new Game(WIDTH, HEIGHT);
game.state.add('initial', InitialState);
game.state.start('initial');
//# sourceMappingURL=main.js.map