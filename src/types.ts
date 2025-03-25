export type ResearchType = 'Standard' | 'Advanced';

export enum Colony {
  Eden = 'Eden',
  Plymouth = 'Plymouth',
}

export type ResearchItem = {
  id: string;
  topic: string;
  cost: number;
  scientists: number;
  lab: ResearchType;
  requires: string[];
  teaser: string;
  description: string;
  result: string;
};

export enum StructureStatus {
  Building = 'Building',
  Online = 'Online',
  Offline = 'Offline',
  NoPower = 'NoPower',
}

export enum StructureTypes {
  Agridome = 'Agridome',
  CommandCenter = 'CommandCenter',
  FactoryStructure = 'FactoryStructure',
  LabStandard = 'LabStandard',
  Residence = 'Residence',
  SmelterCommon = 'SmelterCommon',
  Tokamak = 'Tokamak',
}

export type LabResearchTopic = ResearchItem & {
  startMark: number;
  progress: number;
  assignedScientists: number;
};

export type Structure = {
  id: string;
  type: StructureTypes;
  health: number;
  maxHealth: number;
  status: StructureStatus;
  lastMark?: number;
  storage?: Array<StructureTypes>;
  current?: { type: StructureTypes; progress: number };
  researchTopic?: LabResearchTopic;
};
