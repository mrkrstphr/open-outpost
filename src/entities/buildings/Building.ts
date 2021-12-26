import { EntityTypes } from '../../consts';
import GameEntity from '../GameEntity';

export abstract class Building extends GameEntity {
  getEntityType() {
    return EntityTypes.Building;
  }
}
