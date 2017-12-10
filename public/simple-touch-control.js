'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TouchControl = function (_Sprite) {
    _inherits(TouchControl, _Sprite);

    function TouchControl(x, y, radius, key) {
        _classCallCheck(this, TouchControl);

        var _this = _possibleConstructorReturn(this, (TouchControl.__proto__ || Object.getPrototypeOf(TouchControl)).call(this, x, y, key));

        _this.radius = radius;
        _this.activeRadius = radius * 1.5;
        _this.anchor.setTo(0.5, 0.5);
        return _this;
    }

    _createClass(TouchControl, [{
        key: 'pressed',
        get: function get() {
            var pointers = this.game.input.pointers;
            for (var i = 0; i < pointers.length; i++) {
                var pointer = pointers[i];
                var distance = game.input.getLocalPosition(this, pointer).getMagnitude();
                if (distance < this.activeRadius && pointer.isDown) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: 'axisX',
        get: function get() {
            var pointers = this.game.input.pointers;
            for (var i = 0; i < pointers.length; i++) {
                var pointer = pointers[i];
                var relativeX = game.input.getLocalPosition(this, pointer).x;
                var distance = game.input.getLocalPosition(this, pointer).getMagnitude();
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
    }, {
        key: 'axisY',
        get: function get() {
            var pointers = this.game.input.pointers;
            for (var i = 0; i < pointers.length; i++) {
                var pointer = pointers[i];
                var relativeY = game.input.getLocalPosition(this, pointer).y;
                var distance = game.input.getLocalPosition(this, pointer).getMagnitude();
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
    }]);

    return TouchControl;
}(Sprite);

var TouchPad = function (_Phaser$Group) {
    _inherits(TouchPad, _Phaser$Group);

    function TouchPad() {
        var analogX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 86;
        var analogY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 320 - 86;
        var aX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
        var aY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 320 - 86;
        var bX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 400;
        var bY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 320 - 86;

        _classCallCheck(this, TouchPad);

        var _this2 = _possibleConstructorReturn(this, (TouchPad.__proto__ || Object.getPrototypeOf(TouchPad)).call(this, window.game));

        _this2.analog = new TouchControl(analogX, analogY, 64, 'analog');
        _this2.aBtn = new TouchControl(aX, aY, 32, 'abtn');
        _this2.bBtn = new TouchControl(bX, bY, 32, 'bbtn');

        _this2.add(_this2.analog);
        _this2.add(_this2.aBtn);
        _this2.add(_this2.bBtn);
        return _this2;
    }

    _createClass(TouchPad, [{
        key: 'a',
        get: function get() {
            return this.aBtn.pressed;
        }
    }, {
        key: 'b',
        get: function get() {
            return this.bBtn.pressed;
        }
    }, {
        key: 'axisX',
        get: function get() {
            return this.analog.axisX;
        }
    }, {
        key: 'axisY',
        get: function get() {
            return this.analog.axisY;
        }
    }]);

    return TouchPad;
}(Phaser.Group);
//# sourceMappingURL=simple-touch-control.js.map