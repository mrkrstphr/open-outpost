import { v4 } from 'uuid';
import { StructureDetails, structureSpec } from './data/structures';
import { Building, BuildingStatus, GameState, type LabType, type ResearchItem } from './types';

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

export function createNewStructure(
  structure: StructureDetails,
  buildingStatus?: BuildingStatus
): Building {
  const status = buildingStatus ?? BuildingStatus.Building;

  return {
    id: v4(),
    type: structure.type,
    health: status === BuildingStatus.Building ? 0 : structure.hp,
    status,
    maxHealth: structure.hp,
  };
}

export const canBuildStructure = (
  ore: GameState['ore'],
  structure: Pick<StructureDetails, 'buildCost'>
) => {
  return (
    (ore.common ?? 0) >= (structure.buildCost.common ?? 0) &&
    (ore.rare ?? 0) >= (structure.buildCost.rare ?? 0)
  );
};

export const sortStructures = (structures: Array<Building>) =>
  [...structures].sort((a, b) => {
    const firstLabel = `${a.type}-${a.id}`;
    const secondLabel = `${b.type}-${b.id}`;

    if (firstLabel < secondLabel) return -1;
    if (firstLabel > secondLabel) return 1;

    return 0;
  });

export const buildingLabel = (building: Pick<Building, 'id' | 'type'>) => {
  const structure = structureSpec[building.type];
  return `${structure.name}@${building.id.substring(0, 6)}`;
};

export const filterActiveStructures = (structures: Array<Building>) =>
  structures.filter((structure) => structure.status === BuildingStatus.Online);

export const filterOnlineOrNoPowerStructures = (structures: Array<Building>) =>
  structures.filter(
    (structure) =>
      structure.status === BuildingStatus.Online || structure.status === BuildingStatus.NoPower
  );
