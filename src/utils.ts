import { v4 } from 'uuid';
import { StructureDetails } from './data/structures';
import { BuildingStatus, BuildingType, GameState, type LabType, type ResearchItem } from './types';

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
  x: number,
  y: number,
  structure: StructureDetails,
  buildingStatus?: BuildingStatus
): BuildingType {
  const status = buildingStatus ?? BuildingStatus.Building;

  return {
    id: v4(),
    type: structure.type,
    health: status === BuildingStatus.Building ? 0 : structure.hp,
    status,
    maxHealth: structure.hp,
  };
}

export const canBuildStructure = (ore: GameState['ore'], structure: StructureDetails) => {
  return (
    ore.common >= (structure.buildCost.common ?? 0) && ore.rare >= (structure.buildCost.rare ?? 0)
  );
};
