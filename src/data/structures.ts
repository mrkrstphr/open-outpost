import { BuildingType } from '../types';

export type StructureDetails = {
  name: string;
  type: BuildingType['type'];
  hp: number;
  buildCost: { common: number; rare: number };
  requiredResearch?: Array<string>;
  workers?: number;
  scientists?: number;
  powerUsage: number;
  produces?: {
    food?: number;
    power?: number;
    ore?: { common?: number; rare?: number };
    slots?: number;
  };
  stores?: {
    food?: number;
    ore?: { common?: number; rare?: number };
  };
};

export const structureSpec: Record<BuildingType['type'], StructureDetails> = {
  Agridome: {
    name: 'Agridome',
    type: 'Agridome',
    hp: 1000,
    buildCost: { common: 225, rare: 0 },
    powerUsage: 20,
    workers: 1,
    scientists: 0,
    produces: { food: 36 },
  },
  CommandCenter: {
    name: 'Command Center',
    type: 'CommandCenter',
    hp: 2500,
    // TODO: FIXME:
    buildCost: { common: 0, rare: 0 },
    powerUsage: 0,
    workers: 4,
    scientists: 1,
    // TODO: FIXME:
    produces: { power: 0 },
  },
  FactoryStructure: {
    name: 'Factory, Structure',
    type: 'FactoryStructure',
    hp: 2000,
    // TODO: FIXME:
    buildCost: { common: 0, rare: 0 },
    // TODO: FIXME:
    powerUsage: 0,
    workers: 1,
    scientists: 0,
    produces: { slots: 6 },
  },
  LabStandard: {
    name: 'Lab, Standard',
    type: 'LabStandard',
    hp: 1250,
    // TODO: FIXME:
    buildCost: { common: 0, rare: 0 },
    powerUsage: 50,
    workers: 1,
    scientists: 0,
  },
  // Residence: {
  //   buildCost: {common: 225},
  // },
  SmelterCommon: {
    name: 'Smelter, Common Ore',
    type: 'SmelterCommon',
    hp: 2000,
    // TODO: FIXME:
    buildCost: { common: 0, rare: 0 },
    // TODO: FIXME:
    powerUsage: 0,
    // TODO: FIXME:
    workers: 0,
    scientists: 0,
    produces: { ore: { common: 75 } },
    stores: { ore: { common: 10000 } },
  },
  // Tokamak: {
  //   name: 'Tokamak',
  //   type: 'Tokamak',
  //   hp: 1500,
  //   produces: { power: 250 },
  // },
};
