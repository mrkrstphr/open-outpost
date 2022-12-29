import { BuildingKeys } from '../../consts';
import { Building } from './Building';

export class VehicleFactory extends Building {
  entityClass() {
    return BuildingKeys.VehicleFactory;
  }
}
