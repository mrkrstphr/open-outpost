import EasyStar from 'easystarjs';
import Phaser from 'phaser';
import { Buildings, GameEntity, Vehicles } from '../entities';
import { Scenes } from '../consts';
import { Vehicle } from '~/entities/vehicles/Vehicle';

export default class Game extends Phaser.Scene {
  private structures: GameEntity[] = [];
  private selectedObjects: GameEntity[] = [];

  public vehicles: Vehicle[] = [];

  private map!: Phaser.Tilemaps.Tilemap;
  private tileset!: Phaser.Tilemaps.Tileset;

  private controls;

  private pathFinder!: EasyStar.js;

  constructor() {
    super(Scenes.Game);
  }

  init() {}

  debug(key, value) {
    document.getElementById(key)!.innerText = value;
  }

  create() {
    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('sands', 'tiles');

    const groundLayer = this.map.createLayer('Ground', this.tileset);
    groundLayer.setCollisionByProperty({ collision: true });

    this.configurePathFinder();
    this.configureCamera();

    this.structures.push(new Buildings.CommandCenter(this, 50, 100));
    this.structures.push(new Buildings.StructureFactory(this, 100, 50));

    const builderVehicle = new Vehicles.Builder(this, 100, 100);
    this.vehicles.push(builderVehicle);

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

    this.input.on(
      Phaser.Input.Events.POINTER_UP,
      (pointer: Phaser.Input.Pointer) => {
        const { worldX, worldY } = pointer;

        this.pathFinder.findPath(
          Math.floor(builderVehicle.getSprite()!.x / this.map.tileWidth),
          Math.floor(builderVehicle.getSprite()!.y / this.map.tileHeight),
          Math.floor(worldX / this.map.tileWidth),
          Math.floor(worldY / this.map.tileHeight),
          (path) => {
            if (path) {
              builderVehicle.setPath(
                path.map((p) => new Phaser.Math.Vector2(p.x, p.y))
              );
            }
          }
        );

        this.pathFinder.calculate();
      }
    );

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.off(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN);
      this.input.off(Phaser.Input.Events.POINTER_UP);
    });
  }

  update(time, delta) {
    this.controls.update(delta);
    this.structures.forEach((structure) => structure.update());
    this.vehicles.forEach((vehicle) => vehicle.update());
  }

  private configurePathFinder() {
    this.pathFinder = new EasyStar.js();
    this.pathFinder.enableDiagonals();

    const groundLayer = this.map.getLayer('Ground').tilemapLayer;

    const grid: number[][] = [];

    for (let y = 0; y < this.map.height; y++) {
      const col: number[] = [];

      for (let x = 0; x < this.map.width; x++) {
        col.push(this.map.getTileAt(x, y, false, groundLayer)?.index);
      }

      grid.push(col);
    }

    this.pathFinder.setGrid(grid);

    const properties = this.tileset.tileProperties;
    const acceptableTiles: number[] = [];

    for (let i = 0; i < this.tileset.total; i++) {
      if (!(i in properties)) {
        continue;
      }

      if (!properties[i].collision) acceptableTiles.push(i + 1);
      if (properties[i].cost)
        this.pathFinder.setTileCost(i + 1, properties[i].cost);
    }

    this.pathFinder.setAcceptableTiles(acceptableTiles);
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
