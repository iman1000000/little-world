// TODO rename
let methods = window.methods = {};

let method = {
    sprite: 'empty',
    solid: false,
    visible: 'true',
    init(obj) {
        obj.loadTexture(this.sprite);
        obj.visible = this.visible;
        if (this.frame) {
            obj.frame = this.frame;
        }
    },
    create() {
        return number.create();
    },
    interact(obj) {},
    remove(obj) {
        obj.state = empty.create();
    },
    tick(obj) {
    }
};

let empty = methods.empty = {
    interact(obj) {
        super.interact(obj);
        obj.state = number.create();
        obj.init();
    },
    visible: false
};
Object.setPrototypeOf(empty, method);

let wall = methods.wall = {
    sprite: 'placeholder',
    solid: true
};
Object.setPrototypeOf(wall, method);

let grass = methods.grass = {
    sprite: 'grass'
};
Object.setPrototypeOf(grass, method);

let number = methods.number = {
    create() {
        return {
            type: 'number',
            number: 0
        };
    },
    tick(obj) {
        super.tick(obj);
        console.log(obj.state);
        obj.state.number++;
        obj.state.number %= 4;
        obj.frame = obj.state.number;
    },
    sprite: 'number',
    frame: 0
};
Object.setPrototypeOf(number, method);
