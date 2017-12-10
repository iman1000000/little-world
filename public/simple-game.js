'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DIAGONAL = Math.sqrt(2) * 0.5;
var TAU = Math.PI * 2;
window.circle = 'circle';
window.square = 'square';

var GameState = function () {
    function GameState() {
        _classCallCheck(this, GameState);

        this._fps = false;
    }

    _createClass(GameState, [{
        key: 'preload',
        value: function preload() {
            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
            this.scale.pageAlignHorizontally = true;
            window.game.makeImage('default', 'white', 32, 32);

            // right click breaks things
            window.game.canvas.oncontextmenu = function (e) {
                e.preventDefault();
            };
        }
    }, {
        key: 'create',
        value: function create() {
            // game.input.keyboard.addKeyCapture([Phaser.Keyboard.DOWN, Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.ENTER, Phaser.Keyboard.SPACE]);
            game.physics.startSystem(Phaser.Physics.ARCADE);
        }
    }, {
        key: 'render',
        value: function render() {
            if (this._fps) {
                game.debug.text(game.time.fps + 'fps', 2, 14);
            }
        }
    }, {
        key: 'fps',
        set: function set(val) {
            window.game.time.advancedTiming = val;
            this._fps = val;
        },
        get: function get() {
            return this._fps;
        }
    }]);

    return GameState;
}();

var Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game(width, height, gameState) {
        var debug = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, {
            width: width,
            height: height,
            renderer: Phaser.CANVAS,
            antialias: false,
            enableDebug: debug,
            scaleMode: Phaser.ScaleManager.SHOW_ALL,
            state: gameState
        }));

        if (window.game) {
            window.game.destroy();
        }
        window.game = _this;

        return _this;
    }

    _createClass(Game, [{
        key: 'makeImage',
        value: function makeImage(key, color) {
            var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 32;
            var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 32;

            var img = document.createElement('canvas');
            img.width = width;
            img.height = height;
            var ctx = img.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
            this.load.image(key, img.toDataURL());
        }
    }]);

    return Game;
}(Phaser.Game);

var Sprite = function (_Phaser$Sprite) {
    _inherits(Sprite, _Phaser$Sprite);

    function Sprite() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
        var image = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

        _classCallCheck(this, Sprite);

        var _this2 = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, window.game, x, y, image));

        _this2.smoothed = false;

        window.game.add.existing(_this2);
        window.game.physics.enable(_this2, Phaser.Physics.ARCADE);
        return _this2;
    }

    _createClass(Sprite, [{
        key: 'overlap',
        value: function overlap(that, callback) {
            window.game.physics.arcade.overlap(this, that, undefined, function (a, b) {
                callback(b);
            }, this);
        }
    }, {
        key: 'collide',
        value: function collide(that) {
            var process = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
                return true;
            };

            window.game.physics.arcade.collide(this, that, undefined, process);
        }
    }, {
        key: 'wallClamp',
        value: function wallClamp() {
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
    }, {
        key: 'arrowMove',
        value: function arrowMove(speed) {
            var up = window.game.input.keyboard.isDown(Phaser.Keyboard.UP);
            var down = window.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
            var left = window.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
            var right = window.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

            this.dy = 0;
            this.dx = 0;

            // Cardinal
            if (up && !down && !left && !right || up && !down && left && right) {
                this.dy = -speed;
            }
            if (!up && down && !left && !right || !up && down && left && right) {
                this.dy = speed;
            }
            if (!up && !down && left && !right || up && down && left && !right) {
                this.dx = -speed;
            }
            if (!up && !down && !left && right || up && down && !left && right) {
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
    }, {
        key: 'joyconMove',
        value: function joyconMove(speed, pad) {
            if (pad) {
                this.dx = pad.axisX * speed;
                this.dy = pad.axisY * speed;
            } else {
                this.dx = joycon.leftAxisX * speed;
                this.dy = joycon.leftAxisY * speed;
            }
        }
    }, {
        key: 'joyconAcc',
        value: function joyconAcc(acc, pad) {
            if (pad) {
                this.body.acceleration.x = pad.axisX * acc;
                this.body.acceleration.y = pad.axisY * acc;
            } else {
                this.body.acceleration.x = joycon.leftAxisX * acc;
                this.body.acceleration.y = joycon.leftAxisY * acc;
            }
        }
    }, {
        key: 'wallBounce',
        set: function set(wb) {
            if (wb) {
                this.body.collideWorldBounds = true;
                this.body.worldBounce = new Phaser.Point(1, 1);
            } else {
                this.body.collideWorldBounds = false;
            }
        },
        get: function get() {
            return this.body.collideWorldBounds;
        }
    }, {
        key: 'dx',
        set: function set(val) {
            this.body.velocity.x = val;
        },
        get: function get() {
            return this.body.velocity.x;
        }
    }, {
        key: 'dy',
        set: function set(val) {
            this.body.velocity.y = val;
        },
        get: function get() {
            return this.body.velocity.y;
        }
    }, {
        key: 'vel',
        set: function set(val) {
            this.dx = val[0];
            this.dy = val[1];
        },
        get: function get() {
            return [this.dx, this, dy];
        }
    }, {
        key: 'pos',
        set: function set(val) {
            this.x = val[0];
            this.y = val[1];
        },
        get: function get() {
            return [this.x, this.y];
        }
    }]);

    return Sprite;
}(Phaser.Sprite);
//# sourceMappingURL=simple-game.js.map