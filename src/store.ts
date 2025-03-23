import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { structureSpec } from './data/structures';
import {
  BuildingStatus,
  BuildingType,
  CommandCenter,
  FactoryStructure,
  LabStandard,
  ResearchItem,
} from './types';
import { canBuildStructure, createNewStructure } from './utils';

export type GameState = {
  tick: number;
  mark: number;
  buildings: Array<BuildingType>;
  currentResearchTopic?: ResearchItem & { counter: number };
  finishedResearch: string[];
  gameLog: string[];
  ore: { common: number; rare: number };
};

const initialState: GameState = {
  tick: 0,
  mark: 0,
  buildings: [],
  currentResearchTopic: undefined,
  finishedResearch: [],
  gameLog: [],
  ore: {
    rare: 0,
    common: 0,
  },
};

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

function agridomeHandler(mark: number, agridome: BuildingType) {
  const newState = updateConstructionState(agridome);

  return newState;
}

function standardLabHandler(mark: number, lab: LabStandard) {
  const newState = updateConstructionState(lab);

  return newState;
}

function commandCenterHandler(mark: number, center: CommandCenter) {
  const newState = updateConstructionState(center);

  return newState;
}

function factoryStructureHandler(mark: number, factory: FactoryStructure) {
  const newState = updateConstructionState(factory);

  return newState;
}

function smelterCommonHandler(mark: number, smelter: BuildingType) {
  const newState = updateConstructionState(smelter);

  if (smelter.status === BuildingStatus.Online && smelter.lastMark !== mark) {
    // ?? how to update ore??
  }

  return produce(newState, (draft) => {
    draft.lastMark = mark;
  });
}

function getBuildingManager(type: BuildingType['type']) {
  switch (type) {
    case 'Agridome':
      return agridomeHandler;
    case 'CommandCenter':
      return commandCenterHandler;
    case 'LabStandard':
      return standardLabHandler;
    case 'FactoryStructure':
      return factoryStructureHandler;
    case 'SmelterCommon':
      return smelterCommonHandler;
  }
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
        const buildingManager = getBuildingManager(building.type);
        if (buildingManager) {
          // @ts-ignore TODO: FIXME: typing???
          return buildingManager(state.mark, building);
        }

        console.error(`No building manager found for type: ${building.type}`);
        return building;
      });
    },

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

export const { createStructure, tick, updateBuildingProgress } = gameSlice.actions;

export const store = configureStore({
  reducer: { game: gameSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
