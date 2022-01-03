import Phaser from 'phaser';
import Preloader from './scenes/Preloader';
import Game from './scenes/Game';
import EntityDetailsScene from './scenes/EntityDetails';

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

export default new Phaser.Game(config);
