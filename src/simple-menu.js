class Menu extends Phaser.Group {
    constructor(x, y, backgroundKey, foreground = 'black', font = '28px sans') {
        super(window.game);
        window.game.add.existing(this);

        this.backgroundKey = backgroundKey;
        this.font = font;
        this.foreground = foreground;

        this.x = x;
        this.y = y;

        // save so we know where to put the next button
        this.lastButton = {bottom: 0};
    }

    addButton(text, callback) {
        let y = this.lastButton.bottom;
        let btn = this.game.add.button(0, y, this.backgroundKey, callback);
        this.add(btn);

        if (text && text !== '') {
            let label = this.game.add.text(btn.x, btn.y, text, {
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
}
