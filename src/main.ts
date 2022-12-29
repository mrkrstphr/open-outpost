import Phaser from 'phaser';
import EntityDetailsScene from './scenes/EntityDetails';
import Game from './scenes/Game';
import Preloader from './scenes/Preloader';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  parent: 'root',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scale: {
    // zoom: 2,
  },
  scene: [Preloader, Game, EntityDetailsScene],
};

let game;

function create() {
  if (game) return;
  game = new Phaser.Game(config);
}

function destroy() {
  if (!game) return;
  game.destroy(true);
  game.runDestroy();
  game = null;
}

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.dispose(destroy);
  // @ts-ignore
  module.hot.accept(create);
}

if (!game) create();
