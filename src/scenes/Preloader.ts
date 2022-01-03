import Phaser from 'phaser';
import { Scenes } from '../consts';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(Scenes.Preloader);
  }

  preload() {
    this.load.image('tiles', 'assets/tiles/sands.png');
    this.load.tilemapTiledJSON('map', 'assets/maps/sands.json');

    this.load.atlas(
      'buildings-violet',
      'assets/buildings/violet/buildings.png',
      'assets/buildings/violet/buildings.json'
    );

    this.load.atlas(
      'vehicles-violet',
      'assets/vehicles/violet/vehicles.png',
      'assets/vehicles/violet/vehicles.json'
    );
  }

  create() {
    this.scene.start(Scenes.Game).launch(Scenes.EntityDetails);
  }
}
