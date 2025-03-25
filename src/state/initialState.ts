import type { GameState } from './slices/game';

export const initialState: GameState = {
  tick: 0,
  mark: 0,
  morale: 75,
  structures: [],
  finishedResearch: [],
  gameLog: [],
  notices: [],
  food: 0,
  ore: {
    rare: 0,
    common: 0,
  },
  colonists: {
    children: 0,
    scientists: 0,
    workers: 0,
  },
};
