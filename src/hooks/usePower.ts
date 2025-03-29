import { calculatePowerProduction, calculatePowerUtilization } from '../util/power';
import { useStructures } from './useStructures';

export function usePower() {
  const structures = useStructures();

  const production = calculatePowerProduction({ structures });
  const utilization = calculatePowerUtilization({ structures });

  return { production, utilization };
}
