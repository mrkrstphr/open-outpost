export type LabType = 'Standard' | 'Advanced';

export type ResearchItem = {
  id: string;
  topic: string;
  cost: number;
  scientists: number;
  lab: LabType;
  requires: string[];
  teaser: string;
  description: string;
  result: string;
};

export enum BuildingStatus {
  Building = 'Building',
  Online = 'Online',
  Offline = 'Offline',
  NoPower = 'NoPower',
}

export enum BuildingTypes {
  Agridome = 'Agridome',
  CommandCenter = 'CommandCenter',
  FactoryStructure = 'FactoryStructure',
  LabStandard = 'LabStandard',
  Residence = 'Residence',
  SmelterCommon = 'SmelterCommon',
  Tokamak = 'Tokamak',
}

export type Building = {
  id: string;
  type: BuildingTypes;
  health: number;
  maxHealth: number;
  status: BuildingStatus;
  lastMark?: number;
  storage?: Array<BuildingTypes>;
  current?: { type: BuildingTypes; progress: number };
};
