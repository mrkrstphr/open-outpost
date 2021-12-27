import { BuildingKeys } from '../../consts';
import { Building } from './Building';

export class CommandCenter extends Building {
  entityClass() {
    return BuildingKeys.CommandCenter;
  }
}
