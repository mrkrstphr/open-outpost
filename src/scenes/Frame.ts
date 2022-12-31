import Phaser from 'phaser';
import { Scenes } from '../consts';

export default class FramScene extends Phaser.Scene {
  private DEBUG = false;

  private canvasWidth = 0;
  private canvasHeight = 0;
  private tileSize = 8;
  private sidebarWidth = 240;
  private minimapHeight = 192;
  private tabbarHeight = 32;

  private mapStartX = this.tileSize;
  private mapStartY = this.tileSize;
  private mapWidth = 0;
  private mapHeight = 0;

  private sidebarStartX = 0;
  private sidebarStartY = this.tileSize;

  constructor() {
    super(Scenes.Frame);
  }

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

    this.drawOuterBorder();
    this.drawGameBorder();
    this.drawSidebarBorder();
  }

  /**
   * The outer border wraps the whole window with an 8x8 tile border. Each side, plus each
   * corner have a different tile to make a connected border.
   */
  drawOuterBorder() {
    const { canvasHeight, canvasWidth, tileSize } = this;

    // the x where we draw the right most tiles
    const rightTileEdge = canvasWidth - tileSize;
    // the y where we draw the bottom most tiles
    const bottomTileEdge = canvasHeight - tileSize;

    this.drawUiTile('ui-top-left', 0, 0);
    this.drawUiTile('ui-top-right', rightTileEdge, 0);
    this.drawUiTile('ui-bottom-left', 0, bottomTileEdge);
    this.drawUiTile('ui-bottom-right', rightTileEdge, bottomTileEdge);

    for (let x = 1; x < canvasWidth / tileSize - 1; x++) {
      this.drawUiTile('ui-top-center', x * tileSize, 0);
      this.drawUiTile('ui-bottom-center', x * tileSize, bottomTileEdge);
    }

    for (let y = 1; y < canvasHeight / tileSize - 1; y++) {
      this.drawUiTile('ui-center-left', 0, y * tileSize);
      this.drawUiTile('ui-center-right', rightTileEdge, y * tileSize);
    }

    // draw the border between the game and the sidebar
    for (let y = 0; y < canvasHeight / tileSize - 2; y++) {
      this.drawUiTile('ui-center', this.sidebarStartX - tileSize, (y + 1) * tileSize);
    }
  }

  /**
   * The game border wraps the gameplay area with an 8x8 tile border. It is offset by 8
   * pixels on the left, top and bottom, and ends on the right 8 pixels before the sidebar
   * starts.
   */
  drawGameBorder() {
    const { mapHeight, mapWidth, tileSize } = this;

    this.drawUiTile('ui-top-left-trans', this.mapStartX, this.mapStartY);
    this.drawUiTile('ui-bottom-left-trans', this.mapStartX, mapHeight);
    this.drawUiTile('ui-top-right-trans', mapWidth, this.mapStartY);
    this.drawUiTile('ui-bottom-right-trans', mapWidth, mapHeight);

    // adjust width to remove corners
    const adjustedWidth = mapWidth - tileSize * 2;

    for (let x = 0; x < adjustedWidth / tileSize; x++) {
      this.drawUiTile('ui-top-center-trans', x * tileSize + tileSize * 2, tileSize);
      this.drawUiTile('ui-bottom-center-trans', x * tileSize + tileSize * 2, mapHeight);
    }

    // adjust height to remove corners
    const adjustedHeight = mapHeight - tileSize * 2;

    // left + right borders
    for (let y = 0; y < adjustedHeight / tileSize; y++) {
      this.drawUiTile('ui-center-left-trans', this.mapStartX, y * tileSize + tileSize * 2);
      this.drawUiTile('ui-center-right-trans', mapWidth, y * tileSize + tileSize * 2);
    }
  }

  drawSidebarBorder() {
    this.drawMinimapBorder();
    this.drawTabBarFill();
    this.drawTabPanelBorder();
  }

  drawMinimapBorder() {
    const { canvasWidth, minimapHeight, sidebarWidth, tileSize } = this;

    const minimapBorderEndY = minimapHeight + this.sidebarStartY - tileSize;

    this.drawUiTile('ui-top-left-inner', this.sidebarStartX, this.sidebarStartY);
    this.drawUiTile('ui-bottom-left-inner', this.sidebarStartX, minimapBorderEndY);
    this.drawUiTile('ui-top-right-inner', canvasWidth - tileSize * 2, this.sidebarStartY);
    this.drawUiTile('ui-bottom-right-inner', canvasWidth - tileSize * 2, minimapBorderEndY);

    // sidebarWidth - 3 tiles, each corner + outer border
    const xBorderWidth = sidebarWidth - tileSize * 3;

    const tilesWide = xBorderWidth / tileSize;

    for (let i = 0; i < tilesWide; i++) {
      const tilesX = this.sidebarStartX + (i + 1) * tileSize;

      this.drawUiTile('ui-top-center', tilesX, tileSize);
      this.drawUiTile('ui-bottom-center', tilesX, minimapHeight + this.sidebarStartY - tileSize);
    }

    const yBorderHeight = minimapHeight;
    const tilesTall = yBorderHeight / tileSize - 2;

    // draw side borders (- 2 to offset the corners)
    for (let i = 0; i < tilesTall; i++) {
      // + tileSize to offset the corner tile
      const tilesY = this.sidebarStartY + i * tileSize + tileSize;

      this.drawUiTile('ui-center-left', this.sidebarStartX, tilesY);
      this.drawUiTile('ui-center-right', canvasWidth - tileSize * 2, tilesY);
    }

    for (let x = 0; x < tilesWide; x++) {
      for (let y = 0; y < tilesTall; y++) {
        this.drawUiTile(
          'ui-center',
          this.sidebarStartX + (x + 1) * tileSize,
          this.sidebarStartY + y * tileSize + tileSize
        );
      }
    }
  }

  drawTabBarFill() {
    const { canvasWidth, minimapHeight, sidebarWidth, tileSize } = this;

    const sbx = canvasWidth - sidebarWidth;
    const py = minimapHeight + tileSize;

    const tilesWide = sidebarWidth / tileSize - 1;
    const tilesTall = this.tabbarHeight / tileSize;

    for (let x = 0; x < tilesWide; x++) {
      for (let y = 0; y < tilesTall; y++) {
        this.drawUiTile('ui-center', sbx + x * tileSize, py + y * tileSize);
      }
    }
  }

  drawTabPanelBorder() {
    const { canvasHeight, canvasWidth, minimapHeight, sidebarWidth, tileSize } = this;

    const sbx = canvasWidth - sidebarWidth;
    const py = minimapHeight + this.tabbarHeight + tileSize;

    const tilesHorizontalY = canvasHeight - tileSize * 2;
    const tilesVerticalX = canvasWidth - tileSize * 2;

    this.drawUiTile('ui-top-left-inner', this.sidebarStartX, py);
    this.drawUiTile('ui-bottom-left-inner', this.sidebarStartX, tilesHorizontalY);
    this.drawUiTile('ui-top-right-inner', tilesVerticalX, py);
    this.drawUiTile('ui-bottom-right-inner', tilesVerticalX, tilesHorizontalY);

    const tilesWide = sidebarWidth / tileSize - 3;

    for (let i = 0; i < tilesWide; i++) {
      const tilesX = sbx + tileSize + i * tileSize;

      this.drawUiTile('ui-top-center', tilesX, py);
      this.drawUiTile('ui-bottom-center', tilesX, tilesHorizontalY);
    }

    const tilesTall = (canvasHeight - py) / tileSize - 3;

    for (let i = 0; i < tilesTall; i++) {
      const tilesY = py + tileSize * (i + 1);

      this.drawUiTile('ui-center-left', this.sidebarStartX, tilesY);
      this.drawUiTile('ui-center-right', tilesVerticalX, tilesY);
    }

    for (let x = 0; x < tilesWide; x++) {
      for (let y = 0; y < tilesTall; y++) {
        this.drawUiTile('ui-center', sbx + tileSize + x * tileSize, py + (y + 1) * tileSize);
      }
    }
  }

  drawUiTile(tile: string, x: number, y: number) {
    return this.physics.add
      .sprite(x, y, 'ui', tile)
      .setOrigin(0, 0)
      .setAlpha(this.DEBUG ? 0.5 : 1);
  }
}
