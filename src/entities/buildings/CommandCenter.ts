import { BuildingSprites } from '../../consts';
import Game from '../../scenes/Game';
import { Building } from './Building';

export class CommandCenter extends Building {
  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y);

    this.sprite = scene.physics.add
      .sprite(x, y, 'buildings-violet', BuildingSprites.CommandCenter)
      .setInteractive({ cursor: 'pointer' })
      .setName(this.getName());
  }

  entityType() {
    return 'Command Center';
  }
}
