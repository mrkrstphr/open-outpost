import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useOre() {
  return useSelector((state: RootState) => state.game.ore);
}
