import { createSlice } from '@reduxjs/toolkit';
import { Colony, type Structure } from '../../types';
import { newGameState } from '../initialState';
import { buildStructure as buildStructureFunc } from '../reducers/buildStructure';
import { cancelProduceStructure as cancelProduceStructureFunc } from '../reducers/cancelProduceStructure';
import { newGame as newGameFunc } from '../reducers/newGame';
import { produceStructure as produceStructureFunc } from '../reducers/produceStructure';
import { startResearch as startResearchFunc } from '../reducers/startResearch';
import { tick as tickFunc } from '../reducers/tick';

export type GameState = {
  colony: Colony;
  tick: number;
  mark: number;
  morale: number;
  structures: Array<Structure>;
  finishedResearch: string[];
  gameLog: string[];
  food: number;
  ore: { common: number; rare: number };
  notices: Array<{ message: string; mark: number }>;
  colonists: { children: number; scientists: number; workers: number };
};

export const gameSlice = createSlice({
  name: 'game',
  // TODO: FIXME: how to setup initial game state??
  initialState: newGameState(),
  reducers: {
    buildStructure: buildStructureFunc,
    cancelProduceStructure: cancelProduceStructureFunc,
    produceStructure: produceStructureFunc,
    startResearch: startResearchFunc,
    tick: tickFunc,
    newGame: newGameFunc,
  },
});

export const { buildStructure, cancelProduceStructure, newGame, produceStructure, startResearch, tick } =
  gameSlice.actions;

export default gameSlice.reducer;
