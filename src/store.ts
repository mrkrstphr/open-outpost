import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './state/slices/game';
import { Building, ResearchItem } from './types';

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

export const store = configureStore({
  reducer: { game: gameSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
