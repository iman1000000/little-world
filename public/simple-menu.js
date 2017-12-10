'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Phaser$Group) {
    _inherits(Menu, _Phaser$Group);

    function Menu(x, y, backgroundKey) {
        var foreground = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';
        var font = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '28px sans';

        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, window.game));

        window.game.add.existing(_this);

        _this.backgroundKey = backgroundKey;
        _this.font = font;
        _this.foreground = foreground;

        _this.x = x;
        _this.y = y;

        // save so we know where to put the next button
        _this.lastButton = { bottom: 0 };
        return _this;
    }

    _createClass(Menu, [{
        key: 'addButton',
        value: function addButton(text, callback) {
            var y = this.lastButton.bottom;
            var btn = this.game.add.button(0, y, this.backgroundKey, callback);
            this.add(btn);

            if (text && text !== '') {
                var label = this.game.add.text(btn.x, btn.y, text, {
                    font: this.font,
                    fill: this.foreground,
                    align: 'center'
                });
                label.anchor.setTo(0.5, 0.5);
                label.x = btn.centerX;
                label.y = btn.centerY;
                this.add(label);
            }

            this.lastButton = btn;
        }
    }]);

    return Menu;
}(Phaser.Group);
//# sourceMappingURL=simple-menu.js.map