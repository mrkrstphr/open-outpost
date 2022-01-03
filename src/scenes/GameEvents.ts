import Phaser from 'phaser';

const eventEmitter = new Phaser.Events.EventEmitter();

export default eventEmitter;

export enum GameEvents {
  ClearSelection = 'oo.clear-selection',
  SelectedEntities = 'oo.selected-entities',
}
