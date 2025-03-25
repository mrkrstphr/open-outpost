import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { calculateAvailableScientists, calculateAvailableWorkers } from '../utils';

export const useColonists = () => {
  const state = useSelector((state: RootState) => state.game);
  const { colonists } = state;

  const availableScientists = calculateAvailableScientists(state);
  const availableWorkers = calculateAvailableWorkers(state);

  return {
    ...colonists,
    total: colonists.children + colonists.workers + colonists.scientists,
    availableScientists: Math.max(0, availableScientists),
    availableWorkers: Math.max(0, availableWorkers),
  };
};
