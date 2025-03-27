import { mergeDeepRight } from 'ramda';
import type { PartialDeep } from 'type-fest';
import { structureSpec } from '../data/structures';
import { Colony, StructureStatus } from '../types';
import { createNewStructure } from '../utils';
import type { GameState } from './slices/game';

export const initialState: GameState = {
  colony: Colony.Eden,
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

export const createGameState = (state?: PartialDeep<GameState>) => mergeDeepRight(initialState, state ?? {});

export const newGameState = () =>
  createGameState({
    structures: [
      createNewStructure(structureSpec.CommandCenter, StructureStatus.Online),
      createNewStructure(structureSpec.Tokamak, StructureStatus.Online),
      createNewStructure(structureSpec.FactoryStructure, StructureStatus.Online),
      createNewStructure(structureSpec.SmelterCommon, StructureStatus.Online),
      createNewStructure(structureSpec.LabStandard, StructureStatus.Online),
      createNewStructure(structureSpec.Agridome),
    ],
    ore: { common: 4000 },
    colonists: { children: 0, scientists: 10, workers: 30 },
  });
