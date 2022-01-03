import { Scenes } from '../consts';
import Phaser from 'phaser';
import eventEmitter, { GameEvents } from './GameEvents';
import { GameEntity } from 'entities';

export default class EntityDetailsScene extends Phaser.Scene {
  private text!: Phaser.GameObjects.Text;
  private selectedEntities: GameEntity[] = [];

  constructor() {
    super(Scenes.EntityDetails);
  }

  create() {
    this.text = this.add
      .text(8, 620, '', { font: 'bold 24px Arial' })
      .setColor('#000')
      .setScale(0.5)
      .setAlign('center')
      .setOrigin(0, 0);

    eventEmitter.on(GameEvents.SelectedEntities, (selected) => {
      this.selectedEntities = Array.isArray(selected) ? selected : [selected];
    });

    eventEmitter.on(GameEvents.ClearSelection, () => {
      this.selectedEntities = [];
    });
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
