class ScoreText extends Phaser.Text {
    constructor(x = 320, y = 32) {
        super(window.game, x, y, '', {
            font: '64px monospace',
            fill: 'black',
            align: 'center'
        });
        this.anchor.setTo(0.5, 0);
        this.game.add.existing(this);
        this.separator = "     ";

        this.leftScore = 0;
        this.rightScore = 0;
        this.update();
    }

    update() {
        this.setText(this.leftScore + this.separator + this.rightScore);
    }
}
