import Phaser from 'phaser';
import { Scenes } from '../consts';
import { GameEntity } from '../entities';
import eventEmitter, { GameEvents } from './GameEvents';

export default class EntityDetailsScene extends Phaser.Scene {
  private text!: Phaser.GameObjects.Text;
  private selectedEntities: GameEntity[] = [];

  private canvasWidth = 0;
  private canvasHeight = 0;
  private sidebarWidth = 240;
  private tileSize = 8;
  private minimapHeight = 192;
  private tabbarHeight = 32;

  private sidebarStartX = 0;
  private sidebarStartY = this.tileSize;

  constructor() {
    super(Scenes.EntityDetails);
  }

  create() {
    this.canvasWidth = this.game.canvas.width;
    this.canvasHeight = this.game.canvas.height;

    this.sidebarStartX = this.canvasWidth - this.sidebarWidth;

    eventEmitter.on(GameEvents.SelectedEntities, (selected) => {
      this.selectedEntities = Array.isArray(selected) ? selected : [selected];
    });

    eventEmitter.on(GameEvents.ClearSelection, () => {
      this.selectedEntities = [];
    });

    this.text = this.add
      .text(
        this.sidebarStartX + this.tileSize * 2,
        this.sidebarStartY + this.minimapHeight + this.tabbarHeight + this.tileSize * 2,
        '',
        {
          fontFamily: 'Arial',
          fontSize: '12px',
        }
      )
      .setColor('#fff')
      .setScale(1)
      .setAlign('left')
      .setOrigin(0, 0);
  }

  update() {
    if (this.selectedEntities.length) {
      this.text.setText(
        `Selected: ${this.selectedEntities.map((e) => e.entityClass()).join(', ')}`
      );
    } else {
      this.text.setText('');
    }
  }
}
