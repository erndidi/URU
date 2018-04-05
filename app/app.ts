'use strict';


window.onload = () => {
  let main_state = new MainState();

  let game = new Phaser.Game(window.innerWidth/2, window.innerHeight/2, Phaser.AUTO, '', '');
  game.state.add('BootState', new BootState());
  game.state.add('PreloadState', new PreloadState());
  game.state.add('GameState',new GameState());
  game.state.start('BootState');
}
