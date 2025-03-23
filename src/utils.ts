import { v4 } from 'uuid';
import {
  Agridome,
  BuildingStatus,
  BuildingType,
  CommandCenter,
  FactoryStructure,
  LabStandard,
  type LabType,
  type ResearchItem,
} from './types';

export function filterAvailableResearch(
  targetLab: LabType,
  allTopics: ResearchItem[],
  finishedTopics: string[]
) {
  return allTopics
    .filter(({ id }) => !finishedTopics.includes(id))
    .filter(({ lab }) => lab === targetLab)
    .filter(({ requires }) => {
      const unsatisfiedPrerequisites = requires.filter(
        (requirement) => !finishedTopics.includes(requirement)
      );

      return unsatisfiedPrerequisites.length === 0;
    });
}

export function createStructure(
  x: number,
  y: number,
  type: BuildingType['type'],
  maxHealth: number,
  buildCost: { common: number; rare: number },
  buildingStatus?: BuildingStatus
): BuildingType {
  const status = buildingStatus ?? BuildingStatus.Building;

  return {
    id: v4(),
    type,
    health: status === BuildingStatus.Building ? 0 : maxHealth,
    status,
    maxHealth,
    buildCost,
  };
}

export function createAgridome(x: number, y: number, status?: BuildingStatus): Agridome {
  return createStructure(x, y, 'Agridome', 1500, { common: 225, rare: 0 }, status) as Agridome;
}

export function createCommandCenter(x: number, y: number, status?: BuildingStatus): CommandCenter {
  return createStructure(
    x,
    y,
    'CommandCenter',
    2500,
    { common: 0, rare: 0 },
    status
  ) as CommandCenter;
}

export function createStandardLab(x: number, y: number, status?: BuildingStatus): LabStandard {
  return createStructure(x, y, 'LabStandard', 1250, { common: 0, rare: 0 }, status) as LabStandard;
}

export function createStructureFactory(
  x: number,
  y: number,
  status?: BuildingStatus
): FactoryStructure {
  return createStructure(
    x,
    y,
    'FactoryStructure',
    2000,
    { common: 0, rare: 0 },
    status
  ) as FactoryStructure;
}

export function createSmelterCommon(x: number, y: number, status?: BuildingStatus): BuildingType {
  return createStructure(x, y, 'SmelterCommon', 2000, { common: 0, rare: 0 }, status);
}
