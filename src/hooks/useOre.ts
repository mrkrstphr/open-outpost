import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function useOre() {
  return useSelector((state: RootState) => state.game.ore);
}
