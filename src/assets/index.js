import tiles from './tiles/sands.png';
import map from './maps/sands.json';
import violetBuildingSprites from './buildings/violet/buildings.png';
import violetBuildingDefinition from './buildings/violet/buildings.json';
import violetVehicleSprites from './vehicles/violet/vehicles.png';
import violetVehicleDefinition from './vehicles/violet/vehicles.json';

export default {
  images: { tiles },
  tilemaps: { map },
  sprites: {
    'buildings-violet': { definition: violetBuildingDefinition, sprites: violetBuildingSprites },
    'vehicles-violet': { definition: violetVehicleDefinition, sprites: violetVehicleSprites },
  },
};
