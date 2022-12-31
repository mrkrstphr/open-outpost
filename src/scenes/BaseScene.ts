import Phaser from 'phaser';

export default abstract class BaseScene extends Phaser.Scene {
  protected DEBUG = false;

  protected canvasWidth = 0;
  protected canvasHeight = 0;
  protected tileSize = 8;
  protected sidebarWidth = 240;
  protected minimapHeight = 192;
  protected tabbarHeight = 32;

  protected mapStartX = this.tileSize;
  protected mapStartY = this.tileSize;
  protected mapWidth = 0;
  protected mapHeight = 0;

  protected sidebarStartX = 0;
  protected sidebarStartY = this.tileSize;

  create() {
    this.canvasWidth = this.game.canvas.width;
    this.canvasHeight = this.game.canvas.height;

    this.mapWidth = this.canvasWidth - this.sidebarWidth - this.tileSize * 2;
    this.mapHeight = this.canvasHeight - this.tileSize * 2;

    this.sidebarStartX = this.canvasWidth - this.sidebarWidth;

    if (this.DEBUG) {
      this.add
        .rectangle(this.mapStartX, this.mapStartY, this.mapWidth, this.mapHeight, 0xbb0000)
        .setOrigin(0, 0)
        .setAlpha(0.5);

      this.add
        .rectangle(
          this.sidebarStartX,
          this.sidebarStartY,
          this.sidebarWidth - this.tileSize,
          this.mapHeight,
          0x00bb00
        )
        .setOrigin(0, 0)
        .setAlpha(0.5);

      const mmX = this.sidebarStartX;
      const mmY = this.sidebarStartY;
      const mmW = this.sidebarWidth - this.tileSize;
      const mmH = this.minimapHeight;

      this.add.rectangle(mmX, mmY, mmW, mmH, 0xff33ff).setOrigin(0, 0).setAlpha(0.5);
    }
  }
}
