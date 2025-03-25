import { isNil, isNotNil } from 'ramda';
import { structureSpec } from '../../data/structures';
import { Building, BuildingStatus } from '../../types';
import { filterActiveStructures } from '../../utils';
import { GameState } from '../slices/game';

function updateConstructionState(structure: Building) {
  if (structure?.status === BuildingStatus.Building) {
    if (structure.health + 1 >= structure.maxHealth) {
      return { ...structure, status: BuildingStatus.Online, health: structure.maxHealth };
    } else {
      return { ...structure, health: structure.health + 1 };
    }
  }

  return structure;
}

function buildingManager(building: Building) {
  const newState = updateConstructionState(building);

  if (newState.current?.type) {
    newState.current.progress += 1;

    if (newState.current.progress >= structureSpec[newState.current.type].kitBuildTime) {
      newState.storage = newState.storage
        ? [...newState.storage, newState.current.type]
        : [newState.current.type];
      newState.current = undefined;
    }
  }

  return newState;
}

function runProducers(state: GameState) {
  const maxCommon = state.buildings.reduce(
    (acc, building) => acc + (structureSpec[building.type].stores?.ore?.common ?? 0),
    0
  );
  const maxRare = state.buildings.reduce(
    (acc, building) => acc + (structureSpec[building.type].stores?.ore?.rare ?? 0),
    0
  );
  const maxFood = filterActiveStructures(state.buildings).reduce(
    (acc, building) => acc + (structureSpec[building.type].stores?.food ?? 0),
    0
  );

  filterActiveStructures(state.buildings).forEach((building, index) => {
    const definition = structureSpec[building.type];

    if (state.mark === building.lastMark) return;

    if (isNotNil(building.lastMark)) {
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
  const activeLabs = state.buildings.filter(
    (structure) => structure.status === BuildingStatus.Online && !!structure.researchTopic
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

  state.buildings = state.buildings.map((structure) => {
    return buildingManager(structure);
  });

  runProducers(state);
  performResearch(state);

  state.buildings = state.buildings.map((structure) => ({ ...structure, lastMark: state.mark }));
};
