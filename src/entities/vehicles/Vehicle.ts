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
      // TODO FIXME
      this.sprite!.setTexture('vehicles-violet', VehicleSprites.BuilderNW01);
      this.sprite!.x -= speed;
      this.sprite!.y -= speed;
    } else if (right && up) {
      // TODO FIXME
      this.sprite!.setTexture('vehicles-violet', VehicleSprites.BuilderNE01);
      this.sprite!.x += speed;
      this.sprite!.y -= speed;
    } else if (left && down) {
      // TODO FIXME
      this.sprite!.setTexture('vehicles-violet', VehicleSprites.BuilderSW01);
      this.sprite!.x -= speed;
      this.sprite!.y += speed;
    } else if (right && down) {
      // TODO FIXME
      this.sprite!.setTexture('vehicles-violet', VehicleSprites.BuilderSE01);
      this.sprite!.x += speed;
      this.sprite!.y += speed;
    } else if (left) {
      // TODO FIXME
      this.sprite!.setTexture('vehicles-violet', VehicleSprites.BuilderW01);
      this.sprite!.x -= speed;
    } else if (right) {
      // TODO FIXME
      this.sprite!.setTexture('vehicles-violet', VehicleSprites.BuilderE01);
      this.sprite!.x += speed;
    } else if (down) {
      // TODO FIXME
      this.sprite!.setTexture('vehicles-violet', VehicleSprites.BuilderS01);
      this.sprite!.y += speed;
    } else if (up) {
      // TODO FIXME
      this.sprite!.setTexture('vehicles-violet', VehicleSprites.BuilderN01);
      this.sprite!.y -= speed;
    } else {
      // const direction =
      //   this.sprite!.anims.currentAnim.key.split('-').pop() ?? 'down';
      // this.sprite!.play(`idle-${direction}`, true);
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
