"use strict";

var DIAGONAL = Math.sqrt(2) * 0.5;

var joycon = void 0;
if (navigator.platform == "Nintendo Switch") {

    joycon = {
        get pad() {
            if (navigator.getGamepads().length > 0 && navigator.getGamepads()[0]) {
                return navigator.getGamepads()[0];
            }
            var buttons = [];
            for (var i = 0; i < 17; i++) {
                buttons.push({ value: 0, pressed: false });
            }
            return {
                buttons: buttons,
                axes: [0, 0, 0, 0]
            };
        },

        get a() {
            return joycon.pad.buttons[1].pressed;
        },

        get b() {
            return joycon.pad.buttons[0].pressed;
        },

        get y() {
            return joycon.pad.buttons[2].pressed;
        },

        get l() {
            return joycon.pad.buttons[4].pressed;
        },

        get r() {
            return joycon.pad.buttons[5].pressed;
        },

        get zl() {
            return joycon.pad.buttons[6].pressed;
        },

        get zr() {
            return joycon.pad.buttons[7].pressed;
        },

        get leftStick() {
            return joycon.pad.buttons[10].pressed;
        },

        get rightStick() {
            return joycon.pad.buttons[11].pressed;
        },

        get up() {
            return joycon.pad.buttons[12].pressed;
        },

        get down() {
            return joycon.pad.buttons[13].pressed;
        },

        get left() {
            return joycon.pad.buttons[14].pressed;
        },

        get right() {
            return joycon.pad.buttons[15].pressed;
        },

        get leftAxisX() {
            return joycon.pad.axes[0];
        },

        get leftAxisY() {
            return joycon.pad.axes[1];
        },

        get axisX() {
            return joycon.leftAxisX;
        },

        get axisY() {
            return joycon.leftAxisY;
        },

        get rightAxisX() {
            return joycon.pad.axes[2];
        },

        get rightAxisY() {
            return joycon.pad.axes[3];
        },

        p1: {
            get axisX() {
                return joycon.pad.axes[1];
            },

            get axisY() {
                return -joycon.pad.axes[0];
            },

            get a() {
                return joycon.pad.buttons[14].pressed;
            },

            get b() {
                return joycon.pad.buttons[12].pressed;
            },

            get y() {
                return joycon.pad.buttons[15].pressed;
            }
        },

        p2: {
            get axisX() {
                return -joycon.pad.axes[3];
            },

            get axisY() {
                return joycon.pad.axes[2];
            },

            get a() {
                return joycon.pad.buttons[1].pressed;
            },

            get b() {
                return joycon.pad.buttons[0].pressed;
            },

            get y() {
                return joycon.pad.buttons[2].pressed;
            }
        }
    };
} else {

    joycon = {
        get a() {
            return window.game.input.keyboard.isDown(Phaser.Keyboard.Z);
        },

        get b() {
            return window.game.input.keyboard.isDown(Phaser.Keyboard.X);
        },

        get y() {
            return window.game.input.keyboard.isDown(Phaser.Keyboard.C);
        },

        get l() {
            // TODO
        },

        get r() {
            // TODO
        },

        get zl() {
            // TODO
        },

        get zr() {
            // TODO
        },

        get leftStick() {
            // TODO
        },

        get rightStick() {
            // TODO
        },

        get up() {
            // TODO
        },

        get down() {
            // TODO
        },

        get left() {
            // TODO
        },

        get right() {
            // TODO
        },

        get leftAxisX() {
            var up = window.game.input.keyboard.isDown(Phaser.Keyboard.UP);
            var down = window.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
            var left = window.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
            var right = window.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

            if (right && !left) {
                if (up ^ down) {
                    return DIAGONAL;
                }
                return 1;
            } else if (left && !right) {
                if (up ^ down) {
                    return -DIAGONAL;
                }
                return -1;
            }
            return 0;
        },

        get leftAxisY() {
            var up = window.game.input.keyboard.isDown(Phaser.Keyboard.UP);
            var down = window.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
            var left = window.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
            var right = window.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

            if (down && !up) {
                if (left ^ right) {
                    return DIAGONAL;
                }
                return 1;
            } else if (up && !down) {
                if (left ^ right) {
                    return -DIAGONAL;
                }
                return -1;
            }
            return 0;
        },

        get rightAxisX() {
            // TODO
        },

        get rightAxisY() {
            // TODO
        },

        get axisX() {
            return this.leftAxisX;
        },

        get axisY() {
            return this.leftAxisY;
        },

        p1: {
            get axisX() {
                var up = window.game.input.keyboard.isDown(Phaser.Keyboard.UP);
                var down = window.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
                var left = window.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
                var right = window.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

                if (right && !left) {
                    if (up ^ down) {
                        return DIAGONAL;
                    }
                    return 1;
                } else if (left && !right) {
                    if (up ^ down) {
                        return -DIAGONAL;
                    }
                    return -1;
                }
                return 0;
            },

            get axisY() {
                var up = window.game.input.keyboard.isDown(Phaser.Keyboard.UP);
                var down = window.game.input.keyboard.isDown(Phaser.Keyboard.DOWN);
                var left = window.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
                var right = window.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);

                if (down && !up) {
                    if (left ^ right) {
                        return DIAGONAL;
                    }
                    return 1;
                } else if (up && !down) {
                    if (left ^ right) {
                        return -DIAGONAL;
                    }
                    return -1;
                }
                return 0;
            },

            get a() {
                return window.game.input.keyboard.isDown(Phaser.Keyboard.Z);
            },

            get b() {
                return window.game.input.keyboard.isDown(Phaser.Keyboard.X);
            },

            get y() {
                return window.game.input.keyboard.isDown(Phaser.Keyboard.C);
            }
        },

        p2: {
            get axisX() {
                var up = window.game.input.keyboard.isDown(Phaser.Keyboard.I);
                var down = window.game.input.keyboard.isDown(Phaser.Keyboard.K);
                var left = window.game.input.keyboard.isDown(Phaser.Keyboard.J);
                var right = window.game.input.keyboard.isDown(Phaser.Keyboard.L);

                if (right && !left) {
                    if (up ^ down) {
                        return DIAGONAL;
                    }
                    return 1;
                } else if (left && !right) {
                    if (up ^ down) {
                        return -DIAGONAL;
                    }
                    return -1;
                }
                return 0;
            },

            get axisY() {
                var up = window.game.input.keyboard.isDown(Phaser.Keyboard.I);
                var down = window.game.input.keyboard.isDown(Phaser.Keyboard.K);
                var left = window.game.input.keyboard.isDown(Phaser.Keyboard.J);
                var right = window.game.input.keyboard.isDown(Phaser.Keyboard.L);

                if (down && !up) {
                    if (left ^ right) {
                        return DIAGONAL;
                    }
                    return 1;
                } else if (up && !down) {
                    if (left ^ right) {
                        return -DIAGONAL;
                    }
                    return -1;
                }
                return 0;
            },

            get a() {
                return window.game.input.keyboard.isDown(Phaser.Keyboard.ONE);
            },

            get b() {
                return window.game.input.keyboard.isDown(Phaser.Keyboard.TWO);
            },

            get y() {
                return window.game.input.keyboard.isDown(Phaser.Keyboard.THREE);
            }
        }
    };
}
//# sourceMappingURL=joycon.js.map