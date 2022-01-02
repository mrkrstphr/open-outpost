import Game from '../../scenes/Game';
import { EntityTypes } from '../../consts';
import GameEntity from '../GameEntity';

export abstract class Building extends GameEntity {
  private texturePack: string;

  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y);

    this.texturePack = `buildings-${scene.getColor()}`;

    this.sprite = scene.physics.add
      .sprite(x, y, this.texturePack, this.entityClass())
      .setInteractive({ cursor: 'pointer' })
      .setName(this.getName())
      .setScale(1.5);
  }

  entityType() {
    return EntityTypes.Building;
  }
}
