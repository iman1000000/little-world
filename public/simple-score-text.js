'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoreText = function (_Phaser$Text) {
    _inherits(ScoreText, _Phaser$Text);

    function ScoreText() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 320;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 32;

        _classCallCheck(this, ScoreText);

        var _this = _possibleConstructorReturn(this, (ScoreText.__proto__ || Object.getPrototypeOf(ScoreText)).call(this, window.game, x, y, '', {
            font: '64px monospace',
            fill: 'black',
            align: 'center'
        }));

        _this.anchor.setTo(0.5, 0);
        _this.game.add.existing(_this);
        _this.separator = "     ";

        _this.leftScore = 0;
        _this.rightScore = 0;
        _this.update();
        return _this;
    }

    _createClass(ScoreText, [{
        key: 'update',
        value: function update() {
            this.setText(this.leftScore + this.separator + this.rightScore);
        }
    }]);

    return ScoreText;
}(Phaser.Text);
//# sourceMappingURL=simple-score-text.js.map