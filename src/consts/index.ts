export enum BuildingKeys {
  CommandCenter = 'command-center',
  StructureFactory = 'structure-factory',
}

export enum EntityTypes {
  Building = 'building',
  Vehicle = 'vehicle',
}

export enum Scenes {
  Preloader = 'preloader',
  Game = 'game',
}

export enum VehicleEntityClass {
  Builder = 'builder-vehicle',
}

enum BuilderSprites {
  East_01 = 'builder-e-01',
  North_01 = 'builder-n-01',
  NorthEast_01 = 'builder-ne-01',
  NorthWest_01 = 'builder-nw-01',
  South_01 = 'builder-s-01',
  SouthEast_01 = 'builder-se-01',
  SouthWest_01 = 'builder-sw-01',
  West_01 = 'builder-w-01',
}

export const VehicleSprites = {
  [VehicleEntityClass.Builder]: BuilderSprites,
};
