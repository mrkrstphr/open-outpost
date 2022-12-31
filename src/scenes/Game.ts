import EasyStar from 'easystarjs';
import Phaser from 'phaser';
import { Scenes } from '../consts';
import { Buildings, GameEntity, Vehicles } from '../entities';
import { Vehicle } from '../entities/vehicles/Vehicle';
import BaseScene from './BaseScene';
import eventEmitter, { GameEvents } from './GameEvents';

export default class Game extends BaseScene {
  private structures: GameEntity[] = [];
  private selectedStructure?: GameEntity;

  public vehicles: Vehicle[] = [];
  private selectedVehicles: Vehicle[] = [];

  private map!: Phaser.Tilemaps.Tilemap;
  private tileset!: Phaser.Tilemaps.Tileset;

  private controls;

  private pathFinder!: EasyStar.js;

  constructor() {
    super(Scenes.Game);
  }

  init() {}

  getColor() {
    // TODO FIXME the user can choose their color
    return 'violet';
  }

  create() {
    super.create();

    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('sands', 'tiles');

    const groundLayer = this.map.createLayer('Ground', this.tileset);
    groundLayer.setCollisionByProperty({ collision: true });

    this.configurePathFinder();
    this.configureCamera();
    this.configureInputHandling();

    // create some test buildings + vehicles
    this.structures.push(new Buildings.CommandCenter(this, 50, 100));
    this.structures.push(new Buildings.StructureFactory(this, 100, 50));
    this.structures.push(new Buildings.VehicleFactory(this, 255, 80));

    const builderVehicle = new Vehicles.Builder(this, 100, 100);
    this.vehicles.push(builderVehicle);
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
      if (properties[i].cost) this.pathFinder.setTileCost(i + 1, properties[i].cost);
    }

    this.pathFinder.setAcceptableTiles(acceptableTiles);
  }

  private configureCamera() {
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

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

  private configureInputHandling() {
    this.input.mouse.disableContextMenu();

    this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer, [object]) => {
      // we didn't select anything, so clear everything
      if (!object) {
        // move any selected vehicles on right click
        if (this.selectedVehicles.length && pointer.rightButtonDown()) {
          this.moveSelectedVehicles(pointer);
          return;
        }

        this.selectedStructure && this.selectedStructure.deselect();
        this.selectedVehicles.length &&
          this.selectedVehicles.forEach((vehicle) => vehicle.deselect());
        this.selectedStructure = undefined;
        this.selectedVehicles = [];

        eventEmitter.emit(GameEvents.ClearSelection);

        return;
      }

      this.handleSelectionChange(object);
    });

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.off(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN);
      this.input.off(Phaser.Input.Events.POINTER_UP);
    });
  }

  private handleSelectionChange(object: Phaser.Physics.Arcade.Sprite) {
    const building = this.structures.find((structure) => structure.getName() === object?.name);

    if (building) {
      // if we clicked on a building, deselect any currently selected building, set
      // the clicked building to selected. Finally, deselect any selected vehicles
      this.selectedStructure && this.selectedStructure.deselect();
      this.selectedStructure = building;
      building.select();

      this.selectedVehicles.map((vehicle) => vehicle.deselect());
      this.selectedVehicles = [];
    }

    const vehicle = this.vehicles.find((vehicles) => vehicles.getName() === object?.name);

    if (vehicle) {
      // if we clicked on a vehicle, deselect any currently selected vehicles, set
      // the clicked vehicle to selected. Finally, deselect any selected building.
      this.selectedVehicles.map((vehicle) => vehicle.deselect());
      this.selectedVehicles = [vehicle];
      vehicle.select();

      this.selectedStructure && this.selectedStructure.deselect();
      this.selectedStructure = undefined;
    }

    if (this.selectedStructure || this.selectedVehicles.length) {
      eventEmitter.emit(
        GameEvents.SelectedEntities,
        this.selectedStructure || this.selectedVehicles
      );
    }
  }

  private moveSelectedVehicles(pointer: Phaser.Input.Pointer) {
    const { worldX, worldY } = pointer;

    this.selectedVehicles.forEach((selectedVehicle) => {
      this.pathFinder.findPath(
        Math.floor(selectedVehicle.getSprite()!.x / this.map.tileWidth),
        Math.floor(selectedVehicle.getSprite()!.y / this.map.tileHeight),
        Math.floor(worldX / this.map.tileWidth),
        Math.floor(worldY / this.map.tileHeight),
        (path) => {
          if (path) {
            selectedVehicle.setPath(path.map((p) => new Phaser.Math.Vector2(p.x, p.y)));
          }
        }
      );
      this.pathFinder.calculate();
    });

    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.off(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN);
      this.input.off(Phaser.Input.Events.POINTER_UP);
    });
  }
}
