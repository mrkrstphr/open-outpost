import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isNotNil } from 'ramda';
import { structureSpec } from '../../data/structures';
import { BuildingStatus, BuildingType, GameState } from '../../types';
import { canBuildStructure, createNewStructure } from '../../utils';
import { initialState } from '../initialState';
import { buildStructure as buildStructureFunc } from '../reducers/buildStructure';
import { produceStructure as produceStructureFunc } from '../reducers/produceStructure';

function updateConstructionState(structure: BuildingType) {
  if (structure?.status === BuildingStatus.Building) {
    if (structure.health + 1 >= structure.maxHealth) {
      return { ...structure, status: BuildingStatus.Online, health: structure.maxHealth };
    } else {
      return { ...structure, health: structure.health + 1 };
    }
  }

  return structure;
}

function buildingManager(mark: number, building: BuildingType) {
  const newState = updateConstructionState(building);

  if (newState.current?.type) {
    newState.current.progress += 1;

    if (newState.current.progress >= structureSpec[newState.current.type].hp) {
      newState.storage = newState.storage
        ? [...newState.storage, newState.current.type]
        : [newState.current.type];
      newState.current = {};
    }
  }

  // if (factory.current?.type) {
  //   console.log('up');
  //   dispatch(
  //     updateManufactoringProgress({ id: factory.id, progress: factory.current.progress + 1 })
  //   );
  //   // const details = structureSpec[newState.current.type];
  //   // if (details) {
  //   // dispatch()
  //   // newState.current.progress += 1;
  //   // }
  // }

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
  const maxFood = state.buildings.reduce(
    (acc, building) => acc + (structureSpec[building.type].stores?.food ?? 0),
    0
  );

  state.buildings.forEach((building, index) => {
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
  buildings?: Array<BuildingType>;
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
      createNewStructure(0, 0, structureSpec.CommandCenter, BuildingStatus.Online),
      createNewStructure(10, 10, structureSpec.FactoryStructure, BuildingStatus.Online),
      createNewStructure(20, 20, structureSpec.SmelterCommon, BuildingStatus.Online),
      createNewStructure(30, 30, structureSpec.LabStandard),
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
        return buildingManager(state.mark, building);
      });

      runProducers(state);
    },

    buildStructure: buildStructureFunc,
    produceStructure: produceStructureFunc,

    createStructure: (state, action: PayloadAction<BuildingType>) => {
      const definition = structureSpec[action.payload.type];

      if (!canBuildStructure(state.ore, definition)) {
        console.info('Not enough ore to create structure');
        return;
      }

      state.ore.common -= definition.buildCost.common;
      state.ore.rare -= definition.buildCost.rare;
      state.buildings.push(action.payload);
    },

    updateManufactoringProgress: (state, action) => {
      const { id, progress } = action.payload;

      state.buildings = state.buildings.map((building) => {
        if (building.id === id && building.current?.type) {
          return {
            ...building,
            current: { ...building.current, progress: progress + 1 },
          };
        }
        return building;
      });
    },

    updateBuildingProgress: (state, action) => {
      state.buildings.map((building) => {
        if (building.id === action.payload.id) {
          return { ...building, health: action.payload.health, status: action.payload.status };
        }
        return building;
      });
    },
  },
});

export const {
  buildStructure,
  createStructure,
  produceStructure,
  tick,
  updateBuildingProgress,
  updateManufactoringProgress,
} = gameSlice.actions;

export default gameSlice.reducer;
