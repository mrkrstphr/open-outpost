import { createSlice } from '@reduxjs/toolkit';
import { mergeDeepRight } from 'ramda';
import type { PartialDeep } from 'type-fest';
import { structureSpec } from '../../data/structures';
import { Building, BuildingStatus } from '../../types';
import { createNewStructure } from '../../utils';
import { initialState } from '../initialState';
import { buildStructure as buildStructureFunc } from '../reducers/buildStructure';
import { cancelProduceStructure as cancelProduceStructureFunc } from '../reducers/cancelProduceStructure';
import { produceStructure as produceStructureFunc } from '../reducers/produceStructure';
import { startResearch as startResearchFunc } from '../reducers/startResearch';
import { tick as tickFunc } from '../reducers/tick';

export type GameState = {
  tick: number;
  mark: number;
  morale: number;
  buildings: Array<Building>;
  finishedResearch: string[];
  gameLog: string[];
  food: number;
  ore: { common: number; rare: number };
  notices: Array<{ message: string; mark: number }>;
  colonists: { children: number; scientists: number; workers: number };
};

const createGameState = (state?: PartialDeep<GameState>) =>
  mergeDeepRight(initialState, state ?? {});

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
    colonists: { children: 0, scientists: 10, workers: 30 },
  }),
  reducers: {
    buildStructure: buildStructureFunc,
    cancelProduceStructure: cancelProduceStructureFunc,
    produceStructure: produceStructureFunc,
    startResearch: startResearchFunc,
    tick: tickFunc,
  },
});

export const { buildStructure, cancelProduceStructure, produceStructure, startResearch, tick } =
  gameSlice.actions;

export default gameSlice.reducer;
