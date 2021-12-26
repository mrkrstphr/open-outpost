import { VehicleSprites } from '../../consts';
import { GameEntity } from '..';

export abstract class Vehicle extends GameEntity {
  private path: Phaser.Math.Vector2[] = [];

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

    // if (left) {
    //   this.sprite!.setFlipX(true);
    //   this.sprite!.play('walk-side', true);
    //   this.sprite!.x -= speed;
    // } else if (right) {
    //   this.sprite!.setFlipX(false);
    //   this.sprite!.play('walk-side', true);
    //   this.sprite!.x += speed;
    // } else if (up) {
    //   this.sprite!.play('walk-up', true);
    //   this.sprite!.y -= speed;
    // } else if (down) {
    //   this.sprite!.play('walk-down', true);
    //   this.sprite!.y += speed;
    // } else {
    // }

    /*

    let dx = 0;
    let dy = 0;

    if (this.moveToTarget) {
      console.log(this.moveToTarget);
      dx = this.moveToTarget.x - this.x;
      dy = this.moveToTarget.y - this.y;

      if (Math.abs(dx) < 5) {
        dx = 0;
      }
      if (Math.abs(dy) < 5) {
        dy = 0;
      }

      if (dx === 0 && dy === 0) {
        if (this.movePath.length > 0) {
          this.moveToVector(this.movePath.shift()!);
          return;
        }

        this.moveToTarget = undefined;
      }
      
    }

    // this logic is the same except we determine
    // if a key is down based on dx and dy
    const leftDown = dx < 0;
    const rightDown = dx > 0;
    const upDown = dy < 0;
    const downDown = dy > 0;

    const speed = 100;

    if (leftDown) {
      //   this.anims.play('faune-run-side', true);
      //   this.setVelocity(-speed, 0);
      //   this.flipX = true;
    } else if (rightDown) {
      //   this.anims.play('faune-run-side', true);
      //   this.setVelocity(speed, 0);
      //   this.flipX = false;
    } else if (upDown) {
      //   this.anims.play('faune-run-up', true);
      //   this.setVelocity(0, -speed);
    } else if (downDown) {
      //   this.anims.play('faune-run-down', true);
      //   this.setVelocity(0, speed);
    } else {
      //   const parts = this.anims.currentAnim.key.split('-');
      //   parts[1] = 'idle';
      //   this.anims.play(parts.join('-'));
      //   this.setVelocity(0, 0);
    }
    */
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

    // if (x > tx && y > ty) {
    //   movement.left = true;
    //   movement.up = true;
    // } else if (x > tx && y < ty) {
    //   movement.left = true;
    //   movement.down = true;
    // } else if (x < tx && y > ty) {
    //   movement.right = true;
    //   movement.up = true;
    // } else if (x < tx && y < ty) {
    //   movement.right = true;
    //   movement.down = true;
    // }

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
