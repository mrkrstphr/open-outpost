import { structureSpec } from '../data/structures';
import type { GameState } from '../state/slices/game';
import type { Structure } from '../types';
import { calculateAvailableScientists, calculateAvailableWorkers } from '../utils';

export const hasEnoughStaffForStructure = (state: GameState, structure: Structure) => {
  const definition = structureSpec[structure.type];
  const availableScientists = calculateAvailableScientists(state);
  const availableWorkers = calculateAvailableWorkers(state);

  const neededWorkers = definition.workers ?? 0;
  const neededScientists = definition.scientists ?? 0;

  return (
    (neededWorkers === 0 || availableWorkers >= neededWorkers) &&
    (neededScientists === 0 || availableScientists >= neededScientists)
  );
};
