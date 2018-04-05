class GameState{
    game: Phaser.Game;

    init(){

    }

    preload(){

    }

    create(){
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        logo.anchor.setTo(0.75, 0.75);
    
    }

    update(){

    }

    render(){

    }
}