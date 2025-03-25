import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function useMorale() {
  return useSelector((state: RootState) => state.game.morale);
}
