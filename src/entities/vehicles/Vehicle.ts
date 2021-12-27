import { EntityTypes, VehicleSprites } from '../../consts';
import { GameEntity } from '..';

export abstract class Vehicle extends GameEntity {
  private path: Phaser.Math.Vector2[] = [];

  entityType() {
    return EntityTypes.Vehicle;
  }

  setPath(path: Phaser.Math.Vector2[]) {
    this.path = path;
  }

  update() {
    const { left, right, up, down } = this.determineMovement();

    const speed = 1;

    if (left && up) {
      this.sprite!.setTexture('vehicles-violet', VehicleSprites[this.entityClass()].NorthWest_01);
      this.sprite!.x -= speed;
      this.sprite!.y -= speed;
    } else if (right && up) {
      this.sprite!.setTexture('vehicles-violet', VehicleSprites[this.entityClass()].NorthEast_01);
      this.sprite!.x += speed;
      this.sprite!.y -= speed;
    } else if (left && down) {
      this.sprite!.setTexture('vehicles-violet', VehicleSprites[this.entityClass()].SouthWest_01);
      this.sprite!.x -= speed;
      this.sprite!.y += speed;
    } else if (right && down) {
      this.sprite!.setTexture('vehicles-violet', VehicleSprites[this.entityClass()].SouthEast_01);
      this.sprite!.x += speed;
      this.sprite!.y += speed;
    } else if (left) {
      this.sprite!.setTexture('vehicles-violet', VehicleSprites[this.entityClass()].West_01);
      this.sprite!.x -= speed;
    } else if (right) {
      this.sprite!.setTexture('vehicles-violet', VehicleSprites[this.entityClass()].East_01);
      this.sprite!.x += speed;
    } else if (down) {
      this.sprite!.setTexture('vehicles-violet', VehicleSprites[this.entityClass()].South_01);
      this.sprite!.y += speed;
    } else if (up) {
      this.sprite!.setTexture('vehicles-violet', VehicleSprites[this.entityClass()].North_01);
      this.sprite!.y -= speed;
    }
  }

  private determineMovement() {
    const movement = {
      left: false,
      right: false,
      up: false,
      down: false,
    };

    if (this.path.length <= 0) {
      return movement;
    }

    const target = this.path[0];
    const { x, y } = this.sprite;
    const tx = target.x * 8 + 4;
    const ty = target.y * 8 + 4;

    const dx = Math.abs(x - tx);
    const dy = Math.abs(y - ty);

    if (dx <= 0 && dy <= 0) {
      this.path.shift();
      return this.determineMovement();
    }

    if (x > tx) {
      movement.left = true;
    }

    if (x < tx) {
      movement.right = true;
    }

    if (y > ty) {
      movement.up = true;
    }

    if (y < ty) {
      movement.down = true;
    }

    return movement;
  }
}
