import { BuildingSprites } from '../../consts';
import Game from '../../scenes/Game';
import GameEntity from '../GameEntity';

export class StructureFactory extends GameEntity {
  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y);

    this.sprite = scene.physics.add
      .sprite(x, y, 'buildings-violet', BuildingSprites.StructureFactory)
      .setInteractive({ cursor: 'pointer' })
      .setName(this.getName());
  }

  entityType() {
    return 'Structure Factory';
  }
}
