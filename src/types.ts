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

export type Building = {
  id: string;
  health: number;
  maxHealth: number;
  status: BuildingStatus;
  buildCost: { common: number; rare: number };
  lastMark?: number;
};

export type Agridome = Building & {
  type: 'Agridome';
};

export type CommandCenter = Building & {
  type: 'CommandCenter';
};

export type FactoryStructure = Building & {
  type: 'FactoryStructure';
};

export type LabStandard = Building & {
  type: 'LabStandard';
};

export type SmelterCommon = Building & {
  type: 'SmelterCommon';
};

export type BuildingType =
  | Agridome
  | CommandCenter
  | FactoryStructure
  | SmelterCommon
  | LabStandard;

export type GameState = {
  tick: number;
  mark: number;
  buildings: Array<BuildingType>;
  currentResearchTopic?: ResearchItem & { counter: number };
  finishedResearch: string[];
  gameLog: string[];
  ore: { common: number; rare: number };
};
