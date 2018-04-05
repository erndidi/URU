/// <reference path="../tsDefs/phaser.d.ts" />

'use strict';

class MainState {
  game: Phaser.Game;

  init() {
  }

  preload() {
  
  }

  create() {
   
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  update() {
  }

  render() {
    //note: most things in phaser is automatically rendered.
  }

};
