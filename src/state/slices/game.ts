import { createSlice } from '@reduxjs/toolkit';
import { isNotNil } from 'ramda';
import { structureSpec } from '../../data/structures';
import { Building, BuildingStatus, ResearchItem } from '../../types';
import { createNewStructure, filterActiveStructures } from '../../utils';
import { initialState } from '../initialState';
import { buildStructure as buildStructureFunc } from '../reducers/buildStructure';
import { cancelProduceStructure as cancelProduceStructureFunc } from '../reducers/cancelProduceStructure';
import { produceStructure as produceStructureFunc } from '../reducers/produceStructure';

export type GameState = {
  tick: number;
  mark: number;
  morale: number;
  buildings: Array<Building>;
  currentResearchTopic?: ResearchItem & { counter: number };
  finishedResearch: string[];
  gameLog: string[];
  food: number;
  ore: { common: number; rare: number };
};

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

    state.buildings[index].lastMark = state.mark;
  });
}

function createGameState({
  buildings,
  ore,
}: {
  buildings?: Array<Building>;
  ore?: { common?: number; rare?: number };
}) {
  return {
    ...initialState,
    buildings: buildings ? buildings : [],
    ore: {
      ...initialState.ore,
      ...ore,
    },
  };
}

export const gameSlice = createSlice({
  name: 'game',
  // TODO: FIXME: how to setup initial game state??
  initialState: createGameState({
    buildings: [
      createNewStructure(structureSpec.CommandCenter, BuildingStatus.Online),
      createNewStructure(structureSpec.Tokamak, BuildingStatus.Online),
      createNewStructure(structureSpec.FactoryStructure, BuildingStatus.Online),
      createNewStructure(structureSpec.SmelterCommon, BuildingStatus.Online),
      createNewStructure(structureSpec.LabStandard, BuildingStatus.Online),
      createNewStructure(structureSpec.Agridome),
    ],
    ore: { common: 4000 },
  }),
  reducers: {
    tick: (state) => {
      if ((state.tick + 1) % 100 === 0) {
        state.tick = 0;
        state.mark = state.mark + 1;
      } else {
        state.tick += 1;
      }

      state.buildings = state.buildings.map((building) => {
        return buildingManager(building);
      });

      runProducers(state);
    },

    buildStructure: buildStructureFunc,
    cancelProduceStructure: cancelProduceStructureFunc,
    produceStructure: produceStructureFunc,
  },
});

export const { buildStructure, cancelProduceStructure, produceStructure, tick } = gameSlice.actions;

export default gameSlice.reducer;
