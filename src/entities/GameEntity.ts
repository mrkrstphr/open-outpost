import Phaser from 'phaser';
import { v4 as uuidv4 } from 'uuid';

export default abstract class GameEntity extends Phaser.GameObjects.Container {
  private entityName: string;
  protected isSelected = false;
  protected sprite?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.entityName = `${this.entityType()}:${uuidv4()}`;
  }

  // TODO FIXME lol?
  abstract entityType(): string;
  abstract getEntityType(): string;

  getName() {
    return this.entityName;
  }

  select() {
    this.sprite!.setTint(0xff0000);
  }

  deselect() {
    this.sprite!.clearTint();
  }

  getSprite() {
    return this.sprite;
  }
}