import { structureSpec } from '../data/structures';
import { useStructures } from './useStructures';

export function usePower() {
  const structures = useStructures();

  const production = structures.reduce((total, structure) => {
    const def = structureSpec[structure.type];
    return total + (def.produces?.power ?? 0);
  }, 0);

  const utilization = structures.reduce((total, structure) => {
    const def = structureSpec[structure.type];
    return total + (def.powerUsage ?? 0);
  }, 0);

  return { production, utilization };
}
