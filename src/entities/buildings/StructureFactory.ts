import { BuildingEntityClass } from '../../consts';
import { Building } from './Building';

export class StructureFactory extends Building {
  entityClass() {
    return BuildingEntityClass.StructureFactory;
  }
}
