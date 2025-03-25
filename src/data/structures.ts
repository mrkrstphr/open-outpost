import PlymouthAgridome from '../structures/plymouth-agridome.png';
import PlymouthCommandCenter from '../structures/plymouth-command-center.png';
import PlymouthResidence from '../structures/plymouth-residence.png';
import PlymouthSmelterCommon from '../structures/plymouth-smelter-common.png';
import PlymouthLabStandard from '../structures/plymouth-standard-lab.png';
import PlymouthStructureFactory from '../structures/plymouth-structure-factory.png';
import PlymouthTokamak from '../structures/plymouth-tokamak.png';
import { BuildingTypes, ResearchType } from '../types';

export type StructureDetails = {
  name: string;
  type: BuildingTypes;
  hp: number;
  buildCost: { common?: number; rare?: number };
  kitBuildTime: number;
  requiredResearch?: Array<string>;
  workers?: number;
  scientists?: number;
  powerUsage?: number;
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
  researchType?: ResearchType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image?: any;
};

export const structureSpec: Record<BuildingTypes, StructureDetails> = {
  Agridome: {
    name: 'Agridome',
    type: BuildingTypes.Agridome,
    hp: 1000,
    buildCost: { common: 225, rare: 0 },
    kitBuildTime: 200,
    powerUsage: 20,
    workers: 1,
    scientists: 0,
    produces: { food: 36 },
    stores: { food: 1000 },
    image: PlymouthAgridome,
  },
  CommandCenter: {
    name: 'Command Center',
    type: BuildingTypes.CommandCenter,
    hp: 2500,
    buildCost: { common: 2800, rare: 0 },
    kitBuildTime: 1925,
    powerUsage: 0,
    workers: 4,
    scientists: 1,
    produces: { power: 50 },
    image: PlymouthCommandCenter,
  },
  FactoryStructure: {
    name: 'Factory, Structure',
    type: BuildingTypes.FactoryStructure,
    hp: 2000,
    // TODO: FIXME:
    buildCost: { common: 2500, rare: 0 },
    kitBuildTime: 1875,
    powerUsage: 50,
    workers: 1,
    scientists: 0,
    produces: { slots: 6 },
    image: PlymouthStructureFactory,
  },
  LabStandard: {
    name: 'Lab, Standard',
    type: BuildingTypes.LabStandard,
    hp: 1250,
    buildCost: { common: 1500, rare: 0 },
    kitBuildTime: 1025,
    powerUsage: 50,
    workers: 1,
    scientists: 0,
    researchType: 'Standard',
    image: PlymouthLabStandard,
  },
  Residence: {
    name: 'Residence',
    type: BuildingTypes.Residence,
    hp: 800,
    buildCost: { common: 600 },
    kitBuildTime: 225,
    workers: 1,
    image: PlymouthResidence,
  },
  SmelterCommon: {
    name: 'Smelter, Common Ore',
    type: BuildingTypes.SmelterCommon,
    hp: 2000,
    buildCost: { common: 2000, rare: 0 },
    kitBuildTime: 1500,
    powerUsage: 50,
    workers: 3,
    scientists: 0,
    produces: { ore: { common: 75 } },
    stores: { ore: { common: 10000 } },
    image: PlymouthSmelterCommon,
  },
  Tokamak: {
    name: 'Tokamak',
    type: BuildingTypes.Tokamak,
    hp: 1500,
    buildCost: { common: 1100 },
    kitBuildTime: 825,
    produces: { power: 250 },
    image: PlymouthTokamak,
  },
};
