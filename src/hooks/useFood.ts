import { useSelector } from 'react-redux';
import { structureSpec } from '../data/structures';
import type { RootState } from '../store';
import { filterActiveStructures } from '../utils';

export function useFood() {
  const state = useSelector((state: RootState) => state.game);

  const production = filterActiveStructures(state.structures).reduce((total, structure) => {
    const def = structureSpec[structure.type];
    return total + (def.produces?.food ?? 0);
  }, 0);

  return { storage: state.food, production };
}
