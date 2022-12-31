import Phaser from 'phaser';
import { Scenes } from '../consts';
import { GameEntity } from '../entities';
import BaseScene from './BaseScene';
import eventEmitter, { GameEvents } from './GameEvents';

export default class EntityDetailsScene extends BaseScene {
  private text!: Phaser.GameObjects.Text;
  private selectedEntities: GameEntity[] = [];

  constructor() {
    super(Scenes.EntityDetails);
  }

  create() {
    super.create();

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
