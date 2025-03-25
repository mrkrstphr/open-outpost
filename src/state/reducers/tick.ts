import { isNil, isNotNil } from 'ramda';
import { structureSpec } from '../../data/structures';
import { Structure, StructureStatus } from '../../types';
import { filterActiveStructures } from '../../utils';
import { GameState } from '../slices/game';

function updateConstructionState(structure: Structure) {
  if (structure?.status === StructureStatus.Building) {
    if (structure.health + 1 >= structure.maxHealth) {
      return { ...structure, status: StructureStatus.Online, health: structure.maxHealth };
    } else {
      return { ...structure, health: structure.health + 1 };
    }
  }

  return structure;
}

function structureManager(structure: Structure, state: GameState) {
  const newState = updateConstructionState(structure);

  if (newState.current?.type) {
    newState.current.progress += 1;

    if (newState.current.progress >= structureSpec[newState.current.type].kitBuildTime) {
      newState.storage = newState.storage
        ? [...newState.storage, newState.current.type]
        : [newState.current.type];

      state.notices.push({
        message: `Structure kit manufactured: ${newState.current.type}`,
        mark: state.mark,
      });

      newState.current = undefined;
    }
  }

  return newState;
}

function runProducers(state: GameState) {
  const maxCommon = state.structures.reduce(
    (acc, structure) => acc + (structureSpec[structure.type].stores?.ore?.common ?? 0),
    0
  );
  const maxRare = state.structures.reduce(
    (acc, structure) => acc + (structureSpec[structure.type].stores?.ore?.rare ?? 0),
    0
  );
  const maxFood = filterActiveStructures(state.structures).reduce(
    (acc, structure) => acc + (structureSpec[structure.type].stores?.food ?? 0),
    0
  );

  filterActiveStructures(state.structures).forEach((structure) => {
    const definition = structureSpec[structure.type];

    if (state.mark === structure.lastMark) return;

    if (isNotNil(structure.lastMark)) {
      if (definition.produces?.ore?.common) {
        state.ore.common = Math.min(state.ore.common + definition.produces.ore.common, maxCommon);
      }
      if (definition.produces?.ore?.rare) {
        state.ore.rare = Math.min(state.ore.rare + definition.produces.ore.rare, maxRare);
      }
      if (definition.produces?.food) {
        state.food = Math.min(state.food + definition.produces.food, maxFood);
      }
    }
  });
}

function performResearch(state: GameState) {
  const activeLabs = state.structures.filter(
    (structure) => structure.status === StructureStatus.Online && !!structure.researchTopic
  );

  for (const lab of activeLabs) {
    if (isNil(lab.lastMark) || lab.lastMark === state.mark) continue;
    if (lab.lastMark - lab.researchTopic!.startMark === 0) continue;
    // We do research every 3 marks... arbitrary, really
    if ((lab.lastMark - lab.researchTopic!.startMark) % 3 !== 0) continue;

    lab.researchTopic!.progress += Math.min(
      lab.researchTopic!.cost,
      lab.researchTopic!.assignedScientists * 10
    );

    if (lab.researchTopic!.progress >= lab.researchTopic!.cost) {
      state.finishedResearch.push(lab.researchTopic!.id);

      state.notices.push({
        message: `Research completed: ${lab.researchTopic!.topic}`,
        mark: state.mark,
      });

      lab.researchTopic = undefined;
    }
  }
}

export const tick = (state: GameState) => {
  if ((state.tick + 1) % 100 === 0) {
    state.tick = 0;
    state.mark = state.mark + 1;
  } else {
    state.tick += 1;
  }

  state.structures = state.structures.map((structure) => {
    return structureManager(structure, state);
  });

  runProducers(state);
  performResearch(state);

  state.structures = state.structures.map((structure) => ({ ...structure, lastMark: state.mark }));
};
