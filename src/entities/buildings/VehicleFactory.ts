import { BuildingEntityClass } from '../../consts';
import { Building } from './Building';

export class VehicleFactory extends Building {
  entityClass() {
    return BuildingEntityClass.VehicleFactory;
  }
}
