import { GameState } from './slices/game';

export const initialState: GameState = {
  tick: 0,
  mark: 0,
  morale: 75,
  buildings: [],
  finishedResearch: [],
  gameLog: [],
  notices: [],
  food: 0,
  ore: {
    rare: 0,
    common: 0,
  },
};
