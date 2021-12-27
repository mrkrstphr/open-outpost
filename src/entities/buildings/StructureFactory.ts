import { BuildingKeys } from '../../consts';
import { Building } from './Building';

export class StructureFactory extends Building {
  entityClass() {
    return BuildingKeys.StructureFactory;
  }
}
