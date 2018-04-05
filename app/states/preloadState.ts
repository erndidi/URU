class PreloadState{
    game : Phaser.Game;

    preload(){
        this.game.load.image('logo', 'assets/images/phaser.png');
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale(2,2);
        this.game.renderer.renderSession.roundPixels = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/platform.png');              
        this.game.load.atlas('unicorn', 'assets/spritesheets/unicorn/unicorn.png', 'assets/spritesheets/unicorn/unicorn.json');
        this.game.load.atlas('roc', 'assets/spritesheets/roc/roc.png', 'assets/spritesheets/roc/roc.json');
        this.game.load.image('bullet', 'assets/UnicornBullet.png');
        this.game.load.image('leftBorder','assets/lftBoundary.png');
        this.game.load.image('rightBorder', 'assets/rhtBoundary.png');
    }

    create(){
        this.game.state.start('GameState');
    }

}