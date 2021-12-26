import { VehicleEntityClass, VehicleSprites } from '../../consts';
import Game from '../../scenes/Game';
import { Vehicle } from './Vehicle';

export class Builder extends Vehicle {
  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y);

    this.sprite = scene.physics.add
      .sprite(x, y, 'vehicles-violet', VehicleSprites.BuilderN01)
      .setInteractive({ cursor: 'pointer' })
      .setName(this.getName());
  }

  entityClass() {
    return VehicleEntityClass.Builder;
  }
}
