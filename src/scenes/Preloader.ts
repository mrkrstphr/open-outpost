import Phaser from 'phaser';
import { Scenes } from '../consts';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(Scenes.Preloader);
  }

  preload() {
    this.load.image('tiles', 'assets/tiles/sands.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/sands.json');

    this.load.spritesheet(
      'buildings-violet',
      'assets/buildings/violet/buildings.png',
      { frameWidth: 18, frameHeight: 18 }
    );
  }

  create() {
    this.scene.start(Scenes.Game);
  }
}
