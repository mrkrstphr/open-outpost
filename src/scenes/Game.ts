import Phaser from 'phaser';
import { v4 as uuidv4 } from 'uuid';
import { Scenes } from '../consts';

abstract class GameEntity extends Phaser.GameObjects.Container {
  private entityName: string;
  protected isSelected = false;
  protected sprite?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.entityName = `${this.entityType()}:${uuidv4()}`;
  }

  abstract entityType(): string;

  getName() {
    return this.entityName;
  }

  select() {
    this.sprite!.setTint(0xff0000);
  }

  deselect() {
    this.sprite!.clearTint();
  }
}

class CommandCenter extends GameEntity {
  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y);

    this.sprite = scene.physics.add
      .sprite(x, y, 'buildings-violet', 3)
      .setInteractive({ cursor: 'pointer' })
      .setName(this.getName());
  }

  entityType() {
    return 'Command Center';
  }
}

class StructureFactory extends GameEntity {
  constructor(scene: Game, x: number, y: number) {
    super(scene, x, y);

    this.sprite = scene.physics.add
      .sprite(x, y, 'buildings-violet', 2)
      .setInteractive({ cursor: 'pointer' })
      .setName(this.getName());
  }

  entityType() {
    return 'Structure Factory';
  }
}

export default class Game extends Phaser.Scene {
  private structures: GameEntity[] = [];
  private selectedObjects: GameEntity[] = [];

  private map;
  private controls;

  constructor() {
    super(Scenes.Game);
  }

  init() {}

  debug(key, value) {
    document.getElementById(key)!.innerText = value;
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    const tileset = this.map.addTilesetImage('sands', 'tiles');

    this.map.createLayer('Ground', tileset);

    const rocksEtcLayer = this.map.createLayer('Terrain', tileset);
    rocksEtcLayer.setCollisionByProperty({ collides: true });

    this.configureCamera();

    this.structures.push(new CommandCenter(this, 50, 100));
    this.structures.push(new StructureFactory(this, 100, 50));

    this.input.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      (pointer, [object]) => {
        this.checkSelected(object);

        this.debug(
          'selectedEntity',
          this.selectedObjects.length
            ? this.selectedObjects.map((s) => s.getName()).join(', ')
            : '[none]'
        );
      }
    );
  }

  update(time, delta) {
    this.controls.update(delta);
  }

  private configureCamera() {
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    const cursors = this.input.keyboard.createCursorKeys();
    var controlConfig = {
      camera: this.cameras.main,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      speed: 0.25,
    };
    this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
  }

  private checkSelected(object?) {
    if (!object) {
      this.deselectAllSelectedObjects();
      this.selectedObjects = [];
      return;
    }

    const structure = this.structures.find(
      (structure) => structure.getName() === object?.name
    );

    if (structure) {
      if (this.selectedObjects.includes(structure)) {
        structure.deselect();
        this.selectedObjects = this.selectedObjects.filter(
          (o) => o.getName() !== structure.getName()
        );
      } else {
        this.deselectAllSelectedObjects();
        structure.select();
        this.selectedObjects = [structure];
      }
    }
  }

  private deselectAllSelectedObjects() {
    this.selectedObjects.forEach((selectedObject) => selectedObject.deselect());
  }
}
