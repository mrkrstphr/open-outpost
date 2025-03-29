import { structureSpec } from '../data/structures';
import type { GameState } from '../state/slices/game';
import type { Structure } from '../types';
import { filterActiveStructures, filterOnlineOrNoPowerStructures } from '../utils';

export const calculatePowerProduction = ({ structures }: Pick<GameState, 'structures'>) =>
  filterActiveStructures(structures).reduce((total, structure) => {
    const def = structureSpec[structure.type];
    return total + (def.produces?.power ?? 0);
  }, 0);

export const calculatePowerUtilization = ({ structures }: Pick<GameState, 'structures'>) =>
  filterOnlineOrNoPowerStructures(structures).reduce((total, structure) => {
    const def = structureSpec[structure.type];
    return total + (def.powerUsage ?? 0);
  }, 0);

export const hasEnoughPowerForStructure = (state: Pick<GameState, 'structures'>, structure: Structure) => {
  const powerUsage = structureSpec[structure.type].powerUsage ?? 0;

  return powerUsage === 0 || calculatePowerProduction(state) - calculatePowerUtilization(state) - powerUsage >= 0;
};
