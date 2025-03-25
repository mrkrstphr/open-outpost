import { v4 } from 'uuid';
import { StructureDetails, structureSpec } from './data/structures';
import { GameState } from './state/slices/game';
import { ResearchType, Structure, StructureStatus, type ResearchItem } from './types';

export function filterAvailableResearch(
  targetLab: ResearchType,
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
  structureStatus?: StructureStatus
): Structure {
  const status = structureStatus ?? StructureStatus.Building;

  return {
    id: v4(),
    type: structure.type,
    health: status === StructureStatus.Building ? 0 : structure.hp,
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

export const sortStructures = (structures: Array<Structure>) =>
  [...structures].sort((a, b) => {
    const firstLabel = `${a.type}-${a.id}`;
    const secondLabel = `${b.type}-${b.id}`;

    if (firstLabel < secondLabel) return -1;
    if (firstLabel > secondLabel) return 1;

    return 0;
  });

export const structureLabel = (structure: Pick<Structure, 'id' | 'type'>) => {
  const def = structureSpec[structure.type];
  return `${def.name}@${structure.id.substring(0, 6)}`;
};

export const filterActiveStructures = (structures: Array<Structure>) =>
  structures.filter((structure) => structure.status === StructureStatus.Online);

export const filterOnlineOrNoPowerStructures = (structures: Array<Structure>) =>
  structures.filter(
    (structure) =>
      structure.status === StructureStatus.Online || structure.status === StructureStatus.NoPower
  );

export const calculateAvailableScientists = ({ colonists, structures }: GameState) =>
  colonists.scientists -
  filterActiveStructures(structures).reduce((acc, structure) => {
    const def = structureSpec[structure.type];

    return acc + (def.scientists ?? 0) + (structure.researchTopic?.assignedScientists ?? 0);
  }, 0);

export const calculateAvailableWorkers = ({ colonists, structures }: GameState) =>
  colonists.workers -
  filterActiveStructures(structures).reduce((acc, structure) => {
    const def = structureSpec[structure.type];

    return acc + (def.workers ?? 0);
  }, 0);
