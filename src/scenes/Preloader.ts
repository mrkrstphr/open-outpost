import Phaser from 'phaser';
import { Scenes } from '../consts';
import assets from '../assets';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(Scenes.Preloader);
  }

  preload() {
    Object.entries(assets.images).map(([key, imageFile]) => this.load.image(key, imageFile));
    Object.entries(assets.tilemaps).map(([key, definition]) =>
      this.load.tilemapTiledJSON(key, definition)
    );

    Object.entries(assets.sprites).map(([key, { definition, sprites }]) =>
      this.load.atlas(key, sprites, definition)
    );
  }

  create() {
    this.scene.start(Scenes.Game).launch(Scenes.EntityDetails);
  }
}
