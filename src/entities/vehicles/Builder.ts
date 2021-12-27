import { VehicleEntityClass } from '../../consts';
import { Vehicle } from './Vehicle';

export class Builder extends Vehicle {
  entityClass() {
    return VehicleEntityClass.Builder;
  }
}
