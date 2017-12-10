'use strict';

var _obj, _obj2;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

// TODO rename
var methods = window.methods = {};

var method = {
    sprite: 'empty',
    solid: false,
    visible: 'true',
    init: function init(obj) {
        obj.loadTexture(this.sprite);
        obj.visible = this.visible;
        if (this.frame) {
            obj.frame = this.frame;
        }
    },
    create: function create() {
        return number.create();
    },
    interact: function interact(obj) {},
    remove: function remove(obj) {
        obj.state = empty.create();
    },
    tick: function tick(obj) {}
};

var empty = methods.empty = _obj = {
    interact: function interact(obj) {
        _get(_obj.__proto__ || Object.getPrototypeOf(_obj), 'interact', this).call(this, obj);
        obj.state = number.create();
        obj.init();
    },

    visible: false
};
Object.setPrototypeOf(empty, method);

var wall = methods.wall = {
    sprite: 'placeholder',
    solid: true
};
Object.setPrototypeOf(wall, method);

var grass = methods.grass = {
    sprite: 'grass'
};
Object.setPrototypeOf(grass, method);

var number = methods.number = _obj2 = {
    create: function create() {
        return {
            type: 'number',
            number: 0
        };
    },
    tick: function tick(obj) {
        _get(_obj2.__proto__ || Object.getPrototypeOf(_obj2), 'tick', this).call(this, obj);
        console.log(obj.state);
        obj.state.number++;
        obj.state.number %= 4;
        obj.frame = obj.state.number;
    },

    sprite: 'number',
    frame: 0
};
Object.setPrototypeOf(number, method);
//# sourceMappingURL=methods.js.map